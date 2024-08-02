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
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import InputError from "@/Components/InputError.jsx";

// TODO: STOCKS ARE NOT CORRECTLY MANAGED BY STATE TO DETERMINE WHICH GROUP THEY'RE IN. THEY ARE BEHIND BEING UPDATED, BUT THATS CHATGPT CODE FOR YA

export default function Edit({groupName, groupId, initialGroupStocks ,initialUserStocks, isClicked, setIsClicked }) {
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
        name: groupName,
        selectedStocks: groupStocks,
        selectedStocksData: [],
    });

    const onDragStart = (event) => {
        console.log("drag start")
        console.log(event.active)
        setActiveId(event.active.id);
    }
    const onDragEnd = (event) => {
        const{ active, over } = event;
        console.log(over);
        console.log(active);

        if (!over) return

        /* These two variables contain the names of the active item and the sortable group it's over.
           They should be either user-stocks-area or group-stocks-area.
        */
        const activeId = active.data.current.sortable.containerId;
        const overId= over.data.current.sortable.containerId;


        if (activeId !== overId) {
            const isMovingToGroup = overId === 'group-stocks-area';
            const isMovingToUser = overId === 'user-stocks-area';

            // Move stock to area in which its over and remove it from its original/initial group.
            if (isMovingToGroup) {
                const draggedStock = userStocks.find(stock => stock.name === active.id)
                setGroupStocks(groupStocks => [...groupStocks, draggedStock]);
                setUserStocks(userStocks => userStocks.filter(stock => stock.name !== active.id))
                setData('selectedStocks', groupStocks.map(stock => stock.id))
                setData('selectedStocksData', groupStocks)
                console.log(data.selectedStocks)
                console.log(groupStocks)
            } else if (isMovingToUser) {
                const draggedStock = groupStocks.find(stock => stock.name === active.id);
                setUserStocks((prevUserStocks) => [...prevUserStocks, draggedStock]);
                setGroupStocks((prevGroupStocks) => prevGroupStocks.filter(stock => stock.name !== active.id));
            } else {
                window.alert("An error occurred, please refresh the page and try again.")
                return
            }
        }
        setActiveId(null)
        console.log("drag end");
    }
    const submit = (e) => {
        e.preventDefault();

        const stockIds = groupStocks.map(stock => stock.id);
        patch(route('group.update', groupId),{
            selectedStocks: data.selectedStocks,
            groupName: groupName,
            selectedStocksData: groupStocks,
        })
    };

    const closeModal = () => {
        setIsClicked(false);
        setModalShow(false);
        reset();
    }

    if (!groupName || !userStocks ){
        return(<div className="p-8 text-red-400 text-center">Error a group was not detected, or there were no stocks detected with your account.</div>)
    }else {
        return(
            <Modal id="groupCard" show={modalShow} closeable={true} className="mb-0 align-left dark:bg-indigo-50 bg-indigo-100 text-indigo-950">
                <div className="float-right max-w-fit text-red-500 scale-150 cursor-pointer px-1" onClick={closeModal}>
                    &times;
                </div>

                <h2 className="flex justify-center p-2 ml-6 text-4xl font-bold">{groupName}</h2>
                <form onSubmit={submit} name={"Update Group"}>
                    <div className="flex flex-row p-2 ">
                        <DndContext onDragEnd={onDragEnd} onDragStart={onDragStart} collisionDetection={closestCorners} sensors={sensors}>

                            {/*
                                Group Stocks which have already been added to the current group. Stands as the area in which stocks should be dragged to.
                                The component has more information within it.
                             */}
                            <DroppableArea name={`group-stock-area`} id={`group-stocks-area`} items={groupStocks} strategy={verticalListSortingStrategy} className="flex flex-col w-1/2 mr-8 shadow">
                                <h3 className="p-2 text-4xl font-bold drop-shadow">Grouped Stocks</h3>
                                {console.log(groupStocks)}
                                {/* Render draggable stocks based on groupStocks data. Stocks that have already been added to this group. */}
                                {groupStocks && groupStocks.map((stock, index) => (
                                    <DraggableItem name={stock.name} key={index} id={stock.id} className={'shadow shadow-indigo-900'} />
                                ))}
                            </DroppableArea>

                            {/* User bookmarked stocks which have not been added to the current group. Area for User Stocks to be stored */}
                            <DroppableArea name={'user-stocks-area'} id={'user-stocks-area'} items={userStocks} strategy={verticalListSortingStrategy} className="flex flex-col w-1/2 ml-8 shadow">
                                <h3 className="p-2 text-4xl font-bold drop-shadow text-end">Available Stocks</h3>
                                {/* Render draggable stocks based on the userStocks data. User Stocks that haven't been saved to the group */}
                                {console.log(userStocks)}
                                {userStocks && userStocks.map((stock, index) => (
                                    <DraggableItem name={stock.name} key={index} id={stock.id} className={'shadow shadow-indigo-900'} />
                                ))}
                            </DroppableArea>

                            {/*
                                Create portal to help adjust to the Modal components viewport and display a seperate component of the stock which is being dragged
                                Without the portal, the drag overlay will not render correctly when an item is being dragged.
                            */}
                            {createPortal(
                                <DragOverlay modifiers={[restrictToWindowEdges]} >
                                    {activeId ? <DraggableItem id={activeId} name={activeId} className={'bg-indigo-700 ring-4 ring-indigo-600 shadow-md shadow-indigo-900 transition-shadow ease-in-out'}/> : null}
                                </DragOverlay>,
                                document.body,
                            )}
                        </DndContext>
                    </div>

                    <InputError message={errors.selectedStocks} />
                    <PrimaryButton  className="flex flex-row justify-center items-center" children={"Update Group"} disabled={processing} />
                </form>
            </Modal>
        )
    }
}
