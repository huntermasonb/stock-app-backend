import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import {Head, Link} from "@inertiajs/react";
import {useState} from "react";
import Modal from "@/Components/Modal.jsx";
import DeleteClosedIcon from "@/Components/DeleteClosedIcon.jsx";
import DeleteOpenIcon from "@/Components/DeleteOpenIcon.jsx";

/*It might be a better idea to remove this file and the route for it. Then re-create this in a modal to be displayed on the index page to reduce amount of redirects*/

export default function show({auth, group, stocks}) {
    const [isHovering, setIsHovering] = useState(null);
    const [isClicked, setIsClicked] = useState(false);
    return (
        <AuthenticatedLayout user={auth.user} >
            <Head title={group.name} />

            <div className="p-4 md:p-8">
                <div className="flex flex-col bg-indigo-600 dark:bg-indigo-400 rounded-md">
                    <div className="flex flex-row pt-2 justify-center">
                        <h3 className="text-3xl text-indigo-50 font-semibold transform translate-x-1.5 ease-in-out">{group.name}</h3>
                    </div>
                    {/*Should consider creating a new component used to display stock data in multiple places throughout the application*/}
                    <div className="p-4 flex flex-col md:flex-row items-center justify-evenly max-w-full">
                        {stocks.map((stock, index) =>(
                            <div key={index} className="flex flex-col justify-start items-start text-nowrap overflow-clip rounded-md bg-lavender-200 w-40 p-6 m-2">
                                <p>{stock.name}</p>
                                <p>{stock.symbol}</p>
                                <p>{stock.price}</p>
                                <p>{stock.updated_at}</p>
                            </div>
                        ))}
                    </div>
                    {/*Delete and Edit Buttons*/}
                    <div className="flex flex-col lg:flex-row">
                        <div className="mx-4 p-2 flex justify-around">
                            <Link as="button" type="button" method="delete" href={route('group.destroy', group.id)}
                                  onMouseLeave={() => setIsHovering(null)}
                                  onMouseEnter={() => setIsHovering(true)}
                            >
                                {!isHovering ? <DeleteClosedIcon fill={"#B31E1E"} className="scale-150" /> : <DeleteOpenIcon fill={"#B31E1E"} className="scale-150" />}
                            </Link>
                            <button onClick={() => setIsClicked(true)}>
                                Edit
                            </button>
                        </div>
                    </div>
                    {/* Edit group form if the edit button was clicked. */}
                    {isClicked }
                </div>
            </div>
        </AuthenticatedLayout>
    )
}
