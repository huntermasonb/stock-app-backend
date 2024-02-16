import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, Link} from '@inertiajs/react';
import {useState} from "react";
import DeleteClosedIcon from "@/Components/DeleteClosedIcon.jsx";
import DeleteOpenIcon from "@/Components/DeleteOpenIcon.jsx";
import {handleMouseEnter, handleMouseLeave} from "@/Functions.js";

export default function Dashboard({ auth, stocks }) {
    const [isHovering, setIsHovering] = useState(false);
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
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg hover:shadow-md transition-shadow duration-200">
                        {/* Dashboard Header */}
                        <div className="py-4 text-center text-2xl font-semibold text-indigo-900">Welcome to your dashboard!</div>
                        {/*Below display should probably be re-done*/}
                        {/* Stock Labels for large screen size */}
                        <div className="p-2">
                            <div className="hidden mx-2 lg:grid lg:grid-cols-10 justify-items-center font-semibold" id="LargeScreenLabels" >
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
                            {/*
                                Stock Data & labels are not present on desktop screens.
                                This is very messy and can be done pretty easily to reduce redundancy
                            */}
                            {stocks.map((stock) => (
                                <div className="grid grid-cols-2 lg:grid-cols-10 justify-items-center bg-indigo-50 p-2 my-2" key={stock.id}>
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
                                    <div className="mt-1 col-span-2 lg:col-span-1 " onMouseEnter={() => handleMouseEnter(setIsHovering)} onMouseLeave={() => handleMouseLeave(setIsHovering)}>
                                        <Link as="button" method="delete" href={route('stock.destroy', { id: stock.id })}
                                               className="text-indigo-100 bg-red-600 rounded-md hover:shadow-md px-1 max-h-10 transition duration-200"
                                        >
                                            {isHovering ? <DeleteOpenIcon /> : <DeleteClosedIcon /> }
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
