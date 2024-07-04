import { useState } from "react";
import {Head, useForm} from "@inertiajs/react";
import {createPortal} from 'react-dom'
import Modal from "@/Components/Modal.jsx";
import DroppableArea from "@/Components/DroppableArea.jsx";
import DraggableItem  from "@/Components/DraggableItem.jsx";
import {sortableKeyboardCoordinates, verticalListSortingStrategy} from "@dnd-kit/sortable";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";
import {
    closestCenter,
    closestCorners,
    DndContext,
    DragOverlay,
    KeyboardSensor,
    PointerSensor,
    TouchSensor,
    useSensor,
    useSensors,
} from "@dnd-kit/core";

// NEED TO MOVE THE EDIT BUTTON INTO THIS COMPONENT TO MAKE IT EASIER TO MANAGE THE STATE OF THE MODAL COMPONENT

export default function Edit({groupName, initialGroupStocks ,initialUserStocks, isClicked, setIsClicked }) {
    //State variables for displaying the modal and items being dragged
    const [modalShow, setModalShow] = useState(isClicked);
    const [activeId, setActiveId] = useState(null);
    const [groupStocks, setGroupStocks] = useState(initialGroupStocks);
    const [userStocks, setUserStocks] = useState(initialUserStocks);

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

    const handleDragStart = (event) => {
        console.log("drag start")
        console.log(event.active)
        setActiveId(event.active.id);
    }
    const handleDragEnd = (event) => {
        const{ active, over } = event;

        console.log(over);
        console.log(active);

        if (!over) return

        const activeId = active.data.current.sortable.containerId;
        const overId= over.data.current.sortable.containerId;

        console.log(overId)
        console.log(activeId)

        if (activeId !== overId) {
            const isMovingToGroup = overId === 'group-stocks-area';
            const isMovingToUser = overId === 'user-stocks-area';
            if (isMovingToGroup) {
              /*  setGroupStocks((prevGroupStocks) => {
                    const newGroupStocks = [...prevGroupStocks, userStocks.find(stock => stock.name === active.id)];
                    setUserStocks((prevUserStocks) => prevUserStocks.filter(stock => stock.name !== active.id));
                    return newGroupStocks;
                });*/
                const draggedStock = userStocks.find(stock => stock.name === active.id)
                setGroupStocks((prevGroupStocks) => [...prevGroupStocks, draggedStock]);
                setUserStocks((prevUserStocks) => prevUserStocks.filter(stock => stock.name !== active.id))
            } else if (isMovingToUser) {
                /*setUserStocks((prevUserStocks) => {
                    const newUserStocks = [...prevUserStocks, groupStocks.find(stock => stock.name === active.id)];
                    setGroupStocks((prevGroupStocks) => prevGroupStocks.filter(stock => stock.name !== active.id));
                    return newUserStocks;
                });*/
                const draggedStock = groupStocks.find(stock => stock.name === active.id);
                setUserStocks((prevUserStocks) => [...prevUserStocks, draggedStock]);
                setGroupStocks((prevGroupStocks) => prevGroupStocks.filter(stock => stock.name !== active.id));
            }
        }
        setActiveId(null)
        console.log("drag end");
    }
    const submit = (e) => {
        e.preventDefault();

        patch(route('group.update'), {
            groupName,
        });
    };

    const closeModal = () => {
        setIsClicked(false);
        setModalShow(false);
        reset();
    }


    // PROBLEM: Items or Areas are being rendered in the correct spots, but when trying to move items between the two, the overlay shows that they are not correctly aligned with where they are on the screen.


    if (!groupName || !userStocks ){
        return(<div className="text-red-400 text-center">Error a group was not detected, or there were no stocks detected with your account.</div>)
    }else {
        return(
            <Modal id="groupCard" show={modalShow} closeable={true} className="align-left dark:bg-indigo-50 bg-indigo-100 text-indigo-950">
                <div className="float-right max-w-fit text-red-500 scale-150 cursor-pointer px-1" onClick={closeModal}>
                    &times;
                </div>
                <h2 className="flex justify-center p-2 ml-6 text-4xl font-bold">{groupName}</h2>
                <div className="flex flex-row p-2 ">
                    <DndContext onDragEnd={handleDragEnd} onDragStart={handleDragStart} collisionDetection={closestCorners} sensors={sensors}>
                        {/* Group Stocks which have already been added to the current group. should be Droppable */}
                        <DroppableArea name={`group-stock-area`} id={`group-stocks-area`} items={groupStocks} strategy={verticalListSortingStrategy} className="flex flex-col w-1/2 mr-8 shadow">
                            <h3 className="p-2 text-4xl font-bold drop-shadow">Grouped Stocks</h3>
                            {console.log(groupStocks)}
                            {/* Render draggable stocks based on groupStocks data */}
                            {groupStocks && groupStocks.map((stock, index) => (
                                <DraggableItem name={stock.name} key={index} id={stock.name} className={'shadow shadow-indigo-900'} />
                            ))}
                        </DroppableArea>
                        {/* User bookmarked stocks which have not been added to the current group. should be Droppable*/}
                        <DroppableArea name={'user-stocks-area'} id={'user-stocks-area'} items={userStocks} strategy={verticalListSortingStrategy} className="flex flex-col w-1/2 ml-8 shadow">
                            <h3 className="p-2 text-4xl font-bold drop-shadow text-end">Available Stocks</h3>
                            {/* Render draggable stock items based on the userStocks data*/}
                            {console.log(userStocks)}
                            {userStocks && userStocks.map((stock, index) => (
                                <DraggableItem name={stock.name} key={index} id={stock.name} className={'shadow shadow-indigo-900'} />
                            ))}
                        </DroppableArea>

                        {/* Create portal to help adjust to the Modal components viewport and display a seperate component of the stock which is being dragged*/}
                        {createPortal(
                            <DragOverlay modifiers={[restrictToWindowEdges]} >
                                {activeId ? <DraggableItem id={activeId} name={activeId} className={'bg-indigo-700 ring-4 ring-indigo-600 shadow-md shadow-indigo-900 transition-shadow ease-in-out'}/> : null}
                            </DragOverlay>,
                            document.body,
                        )}
                    </DndContext>
                </div>
            </Modal>
        )
    }
}
