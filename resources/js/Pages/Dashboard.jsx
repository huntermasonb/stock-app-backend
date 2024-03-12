import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, Link} from '@inertiajs/react';
import {useState} from "react";
import DeleteClosedIcon from "@/Components/DeleteClosedIcon.jsx";
import DeleteOpenIcon from "@/Components/DeleteOpenIcon.jsx";
import SymbolOverview from "@/Pages/TradeViewWidget/SymbolOverview.jsx";
import PrimaryButton from "@/Components/PrimaryButton.jsx";

export default function Dashboard({ auth, stocks }) {
    const [isHovering, setIsHovering] = useState(null);
    const [isSymbolGraphActive, setIsSymbolGraphActive] = useState(false);

    const handleClick = () => {
        setIsSymbolGraphActive(prevState => !prevState);
        document.activeElement.blur();
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            // header={<h2 className="font-semibold text-center text-2xl text-indigo-900 leading-tight">Welcome to your Dashboard</h2>}
        >
            <Head title="Dashboard">
                <meta name="description" content="Dashboard for users to monitor and manage stock information for any stock they have bookmarked." />
            </Head>
            <div className="py-9">
                <div className="flex flex-col w-full sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-500 overflow-hidden rounded-lg shadow-sm hover:shadow-lg shadow-gray-300 hover:shadow-gray-400 dark:shadow-gray-900 dark:hover:shadow-gray-900 transition-shadow duration-200">
                        {/* Dashboard Header */}
                        <div className="py-4 text-center text-2xl font-semibold text-indigo-900 dark:text-indigo-50">Welcome to your dashboard!</div>

                        {/*Below display is very messy and can be done pretty easily to reduce redundancy*/}
                        {/* Stock Labels for large screen size */}
                        <div className="p-2">
                            <div className="dark:text-indigo-50 hidden mx-2 lg:grid lg:grid-cols-10 justify-items-center font-semibold" id="LargeScreenLabels" >
                                <div className="justify-self-start pl-2">Name</div>
                                <div>Symbol</div>
                                <div>Price</div>
                                <div>Beta</div>
                                <div>EPS</div>
                                <div>P/E</div>
                                <div>Dividends Per Yield</div>
                                <div>Dividend Date</div>
                                <div>Dividends Per Share</div>
                            </div>

                            {/*Stock labels below are not present on desktop screens.*/}
                            {stocks.map((stock) => (
                                <div className="grid grid-cols-2 lg:grid-cols-10 justify-items-center bg-indigo-50 dark:bg-indigo-100 p-2 my-2 rounded" key={stock.id}>
                                    <div className="font-semibold lg:hidden">Name:</div><div id="name" className="lg:justify-self-start lg:font-bold m-auto">{stock.name}</div>
                                    <div className="font-semibold lg:hidden">Symbol:</div><div id="symbol" className="m-auto">{stock.symbol}</div>
                                    <div className="font-semibold lg:hidden">Price:</div><div id="price" className="m-auto">{stock.price}</div>
                                    {/* Had some issues with decimal points being displayed that aren't present in the database, so had to limit them here as well */}
                                    <div className="font-semibold lg:hidden">Beta:</div><div id="beta" className="m-auto">{stock.beta.toFixed(2)}</div>
                                    <div className="font-semibold lg:hidden">EPS:</div><div id="EPS" className="m-auto">{stock.EPS.toFixed(2)}</div>
                                    <div className="font-semibold lg:hidden">P/E</div><div id="PER" className="m-auto">{stock.price_to_earnings}</div>
                                    <div className="font-semibold lg:hidden">Dividends/Yield:</div><div id="dividend_yield" className="m-auto">{stock.dividend_yield}</div>
                                    <div className="font-semibold lg:hidden">Dividend Date:</div><div id="dividend_date" className="m-auto">{stock.dividend_date}</div>
                                    <div className="font-semibold lg:hidden">Dividends/Share:</div><div id="dividend_per_share" className="m-auto">{stock.dividend_per_share}</div>
                                    <div className="mt-1 col-span-2 lg:col-span-1 " onMouseEnter={() => setIsHovering(stock.id)} onMouseLeave={() =>setIsHovering(null)}>
                                        <Link as="button" method="delete" href={route('stock.destroy', { id: stock.id })}
                                               className="text-indigo-100 bg-red-700 rounded-md shadow-sm shadow-red-900 hover:shadow-md hover:shadow-red-950 ring-red-700 hover:ring-1 focus:ring-2 focus:ring-offset-1 focus:ring-red-900 px-1 max-h-10 transition duration-200"
                                        >
                                            {isHovering === stock.id ? <DeleteOpenIcon /> : <DeleteClosedIcon /> }
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="mt-10 flex flex-col justify-center items-center text-white">
                    <PrimaryButton onClick={handleClick} className="p-1 rounded-md text-center text-2xl font-semibold shadow-sm shadow-indigo-300 dark:shadow-indigo-800 hover:shadow-md hover:shadow-indigo-400 dark:hover:shadow-indigo-950 bg-indigo-500 hover:bg-indigo-700 ring-indigo-400 hover:ring-2 focus:ring-4 focus:ring-offset-1 hover:cursor-pointer transition duration-150 ease-in-out">
                        {isSymbolGraphActive ? "Close Graphs" : "View Graphs"}
                    </PrimaryButton>
                    { isSymbolGraphActive && stocks && (
                        <SymbolOverview stocks={stocks}/>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
