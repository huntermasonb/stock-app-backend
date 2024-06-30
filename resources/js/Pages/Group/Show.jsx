import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import {Head, Link} from "@inertiajs/react";
import {useState, useEffect} from "react";
import DeleteClosedIcon from "@/Components/DeleteClosedIcon.jsx";
import DeleteOpenIcon from "@/Components/DeleteOpenIcon.jsx";
import Edit from "@/Pages/Group/Edit.jsx";

/*It might be a better idea to remove this file and the route for it. Then re-create this in a modal to be displayed on the index page to reduce amount of redirects*/

export default function show({auth, groupName, groupStocks, groupId, userStocks}) {
    const [isHovering, setIsHovering] = useState(false);
    const [isClicked, setIsClicked] = useState(false);

    const formatDate = (dateTime) => {
        return new Date(dateTime).toLocaleString('en-US')
    }

    return (
        <AuthenticatedLayout user={auth.user} >
            <Head title={groupName} />

            <div className="p-4 md:p-8">
                <div className="flex flex-col bg-indigo-600 dark:bg-indigo-400 rounded-md">
                    <div className="flex flex-row pt-2 justify-center">
                        <h3 className="text-3xl text-indigo-50 font-semibold transform translate-x-1.5 ease-in-out">{groupName}</h3>
                    </div>
                    {/*Should consider creating a new component used to display stock data in multiple places throughout the application*/}
                    <div className="p-4 flex flex-col md:flex-row items-center justify-evenly max-w-full flex-wrap">
                        {groupStocks.map((stock, index) =>(
                            <div key={index} className="flex flex-col justify-start items-start text-wrap overflow-clip rounded-md bg-lavender-200 p-6 m-2 max-w-52">
                                <p>{stock.name}</p>
                                <p>{stock.symbol}</p>
                                <p>{stock.price}</p>
                                <p>{formatDate(stock.updated_at)}</p>
                            </div>
                        ))}
                    </div>
                    {/*Delete and Edit Buttons*/}
                    <div className="flex flex-col">
                        <div className="mx-4 p-2 flex justify-around">
                            <Link as="button" type="button" method="delete" href={route('group.destroy', groupId)}
                                  onMouseLeave={() => setIsHovering(false)}
                                  onMouseEnter={() => setIsHovering(true)}
                            >
                                {!isHovering ? <DeleteClosedIcon fill={"#B31E1E"} className="scale-150" /> : <DeleteOpenIcon fill={"#B31E1E"} className="scale-150" />}
                            </Link>
                            <button onClick={() => setIsClicked(true)} >
                                Edit
                            </button>
                        </div>
                    </div>
                    {/* Edit group form if the edit button was clicked. TO DO: Make edit component to display if isClicked is true which will take the groupId as a parameter to display a modal to make changes to the group with*/}
                    {isClicked && <Edit groupName={groupName} initialGroupStocks={groupStocks} initialUserStocks={userStocks} isClicked={isClicked} setIsClicked={setIsClicked} /> }
                </div>
            </div>
        </AuthenticatedLayout>
    )
}
