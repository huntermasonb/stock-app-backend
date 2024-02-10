import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, Link} from '@inertiajs/react';

export default function Dashboard({ auth, stocks }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            // header={<h2 className="font-semibold text-center text-2xl text-indigo-900 leading-tight">Welcome to your Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-9">
                <div className="flex flex-col w-full sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg hover:shadow-md transition-shadow duration-200">
                        {/* Dashboard Header */}
                        <div className="py-4 text-center text-2xl font-semibold text-indigo-900">Welcome to your dashboard!</div>
                        {/* Stock Labels */}
                        <div className="p-2">
                            <div className="hidden mx-2 lg:grid lg:grid-cols-9 justify-items-center font-semibold">
                                <div className="justify-self-start">Name</div>
                                <div>Symbol</div>
                                <div>Price</div>
                                <div>Beta</div>
                                <div>EPS</div>
                                <div>P/E</div>
                                <div>Dividend/Yield</div>
                                <div>Dividend Date</div>
                                <div>Dividend/Share</div>
                            </div>
                            {/* Stock Information */}
                            {/*Below display should probably be re-done*/}
                            {stocks.map((stock) => (
                                <div className="grid grid-cols-2 lg:grid-cols-9 justify-items-center align-baseline bg-indigo-200 p-2 my-2" key={stock.id}>
                                    <div className="font-semibold lg:hidden">Name:</div><div id="name" className="lg:justify-self-start lg:font-bold">{stock.name}</div>
                                    <div className="font-semibold lg:hidden">Symbol:</div><div id="symbol">{stock.symbol}</div>
                                    <div className="font-semibold lg:hidden">Price:</div><div id="price">{stock.price}</div>
                                    {/* Had some issues with decimal points being displayed that aren't present in the database, so had to limit them here as well */}
                                    <div className="font-semibold lg:hidden">Beta:</div><div id="beta">{stock.beta.toFixed(2)}</div>
                                    <div className="font-semibold lg:hidden">EPS:</div><div id="EPS">{stock.EPS.toFixed(2)}</div>
                                    <div className="font-semibold lg:hidden">P/E</div><div id="PER">{stock.price_to_earnings}</div>
                                    <div className="font-semibold lg:hidden">Dividends/Yield:</div><div id="dividend_yield">{stock.dividend_yield}</div>
                                    <div className="font-semibold lg:hidden">Dividend Date:</div><div id="dividend_date">{stock.dividend_date}</div>
                                    <div className="font-semibold lg:hidden">Dividends/Share:</div><div id="dividend_per_share">{stock.dividend_per_share}</div>
                                    <Link as="button" method="delete" href={route('stock.destroy', { id: stock.id })} className="text-indigo-50 bg-red-400 rounded-md hover:shadow-md px-1 mt-2 max-h-6 col-span-2 lg:col-start-4 lg:col-span-3 transition duration-200">Delete</Link>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
