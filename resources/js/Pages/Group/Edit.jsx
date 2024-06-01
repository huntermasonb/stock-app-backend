import Modal from "@/Components/Modal.jsx";
import { useState } from "react";
import {Head, useForm} from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel.jsx";
import InputError from "@/Components/InputError.jsx";
import TextInput from "@/Components/TextInput.jsx";
import PrimaryButton from "@/Components/PrimaryButton.jsx";

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
                <h2 className="flex flex-row justify-center p-2 ml-6 text-4xl">{group.name}</h2>
                <div className="flex flex-row p-2">
                    {/* Group Stocks which have already been added to the current group. User should not see these to be added */}
                    <div className="flex flex-col w-[45%]">
                        <h4 className="py-2 text-2xl">Current Stocks</h4>
                        {console.log(userStocks)}
                        {group.stocks.map((stock, index) => (
                            <div key={index}>{stock.name}</div>
                        ))}
                    </div>
                    <div className="flex flex-col w-[10%] justify-center align-middle">
                        <button className="scale-150">&larr;</button>
                        <button className="scale-150">&rarr;</button>
                    </div>
                    {/* User bookmarked stocks which have not been added to the current group. */}
                    <div className="flex flex-col w-[45%] p-2 text-end">
                        <h4 className="py-2 text-2xl">Non-Bookmarked Stocks</h4>
                        {userStocks.map((stock, index) => (
                            <div key={index}>{stock.name}</div>
                        ))}
                    </div>
                </div>
            </Modal>
        )
    }
}
