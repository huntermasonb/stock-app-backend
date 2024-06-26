import { useState } from "react";
import {Head, useForm} from "@inertiajs/react";
import Modal from "@/Components/Modal.jsx";
import { DroppableArea } from "@/Components/DroppableArea.jsx";
import { DraggableItem, Item} from "@/Components/DraggableItem.jsx";
import {
    closestCorners,
    DndContext,
    DragOverlay,
    KeyboardSensor,
    PointerSensor,
    TouchSensor,
    useSensor,
    useSensors
} from "@dnd-kit/core";
import {sortableKeyboardCoordinates, verticalListSortingStrategy} from "@dnd-kit/sortable";

// NEED TO MOVE THE EDIT BUTTON INTO THIS COMPONENT TO MAKE IT EASIER TO MANAGE THE STATE OF THE MODAL COMPONENT

export default function Edit({groupName, groupStocks , userStocks, isClicked, setIsClicked }) {
    //State variables for displaying the modal and items being dragged
    const [modalShow, setModalShow] = useState(isClicked);
    const [activeId, setActiveId] = useState(null);

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(TouchSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    )

    // Inertia variables for form processing
    const {
        data,
        setData,
        patch,
        processing,
        errors,
        reset
    } = useForm({

    });

    function handleDragStart(e){
        console.log("drag start")
        setActiveId(e.active.id);
    }
    function handleDragEnd(){
        console.log("drag end")
        setActiveId(null);
    }

    const submit = (e) => {
        e.preventDefault();

        patch(route('group.update'), {
            ...data
        });
    };

    const closeModal = () => {
        setIsClicked(false);
        setModalShow(false);
        reset();
    }

    if (!groupName || !userStocks ){
        return(<div className="text-red-400 text-center">Error a group was not detected, or there were no stocks detected with your account.</div>)
    }else {
        return(
            <Modal id="groupCard" show={modalShow} closeable={true} className="align-center justify-center dark:bg-indigo-50 bg-indigo-100 text-indigo-950">
                <div className="float-right max-w-fit text-red-500 scale-150 cursor-pointer px-1" onClick={closeModal}>
                    &times;
                </div>
                <h2 className="flex flex-row justify-center p-2 ml-6 text-4xl font-bold">{groupName}</h2>
                <div className="flex flex-row p-2">
                    <DndContext onDragEnd={handleDragEnd} onDragStart={handleDragStart} collisionDetection={closestCorners} sensors={sensors}>
                        {/* Group Stocks which have already been added to the current group. should be Droppable */}
                        <DroppableArea name={`${groupName}-area`} id={`${groupName}-area`} items={groupStocks} className="flex flex-col w-[45%]">
                            <h3 className="py-2 text-3xl font-medium">Current Stocks</h3>
                            {console.log(groupStocks)}
                            {/* Should be draggable */}
                            {groupStocks.map((stock, index) => (
                                <DraggableItem name={stock.name} key={index}  id={stock.name}>{stock.name}</DraggableItem>
                            ))}
                        </DroppableArea>
                        <div className="flex flex-col w-[10%] justify-center align-middle">
                            <button className="scale-150 ">&larr;</button>
                            <button className="scale-150">&rarr;</button>
                        </div>
                        {/* User bookmarked stocks which have not been added to the current group. should be Droppable*/}
                        <DroppableArea name={'user-stocks'} id={'user stocks-area'} items={userStocks} className="flex flex-col w-[45%]">
                            <h3 className="py-2 text-3xl font-medium text-end">Available Stocks</h3>
                            {/* Should be draggable */}
                            {console.log(userStocks)}
                            {userStocks.map((stock, index) => (
                                <DraggableItem name={stock.name} key={index} id={stock.name} />
                            ))}
                        </DroppableArea>

                        <DragOverlay>
                            {activeId ? <Item id={activeId} /> : null}
                        </DragOverlay>
                    </DndContext>
                </div>
            </Modal>
        )
    }
}
