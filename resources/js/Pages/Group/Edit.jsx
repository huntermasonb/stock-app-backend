import { useState } from "react";
import {Head, useForm} from "@inertiajs/react";
import Modal from "@/Components/Modal.jsx";
import DroppableArea from "@/Components/DroppableArea.jsx";
import DraggableItem from "@/Components/DraggableItem.jsx";
import {closestCorners, DndContext} from "@dnd-kit/core";

// NEED TO MOVE THE EDIT BUTTON INTO THIS COMPONENT TO MAKE IT EASIER TO MANAGE THE STATE OF THE MODAL COMPONENT

export default function Edit({group, userStocks, isClicked, setIsClicked }) {
    //State variable for displaying the modal
    const [modalShow, setModalShow] = useState(isClicked);

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

    if (!group || !userStocks ){
        return(<div className="text-red-400">Error a group was not detected, or there were no stocks detected with your account.</div>)
    }else {
        return(
            <Modal id="groupCard" show={modalShow} closeable={true} className="align-center justify-center dark:bg-indigo-50 bg-indigo-100 text-indigo-950">
                <div className="float-right max-w-fit text-red-500 scale-150 cursor-pointer px-1" onClick={closeModal}>
                    &times;
                </div>
                <h2 className="flex flex-row justify-center p-2 ml-6 text-4xl font-bold">{group.name}</h2>
                <div className="flex flex-row p-2">
                    <DndContext collisionDetection={closestCorners}>
                        {/* Group Stocks which have already been added to the current group. should be Droppable */}
                        <DroppableArea name={`${group.name}-area`} className="flex flex-col w-[45%]">
                            <h3 className="py-2 text-3xl font-medium">Current Stocks</h3>
                            {console.log(userStocks)}
                            {/* Should be draggable */}
                            {group.stocks.map((stock, index) => (
                                <DraggableItem name={stock.name} key={index} id={stock.id}>{stock.name}</DraggableItem>
                            ))}
                        </DroppableArea>
                        <div className="flex flex-col w-[10%] justify-center align-middle">
                            <button className="scale-150 ">&larr;</button>
                            <button className="scale-150">&rarr;</button>
                        </div>
                        {/* User bookmarked stocks which have not been added to the current group. should be Droppable*/}
                        <div className="flex flex-col w-[45%] text-end">
                            <h3 className="py-2 text-3xl font-medium ">Available Stocks</h3>
                            {/* Should be draggable */}
                            {userStocks.map((stock, index) => (
                                <div key={index}>{stock.name}</div>
                            ))}
                        </div>
                    </DndContext>
                </div>
            </Modal>
        )
    }
}
