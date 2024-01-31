import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard({ auth, stocks }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            // header={<h2 className="font-semibold text-center text-2xl text-indigo-900 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-9">
                <div className="flex flex-col w-full sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg hover:shadow-md transition-shadow duration-200">
                        {/* Dashboard Header */}
                        <div className="py-4 text-center text-2xl font-semibold text-indigo-900">Welcome to your dashboard!</div>
                        {/* Stock Information */}
                        <div className="p-2">
                            {stocks.map((stock) => (
                                <div className="grid grid-cols-9" key={stock.id}>
                                    <div id="name">{stock.name}</div>
                                    <div id="symbol">{stock.symbol}</div>
                                    <div id="price">{stock.price}</div>
                                    <div id="beta">{stock.beta}</div>
                                    {/* Had some issues with decimal points being displayed that aren't present in the database, so had to limit them here as well */}
                                    <div id="EPS">{stock.EPS.toFixed(2)}</div>
                                    <div id="PER">{stock.price_to_earnings}</div>
                                    <div id="dividend_yield">{stock.dividend_yield}</div>
                                    <div id="dividend_date">{stock.dividend_date}</div>
                                    <div id="dividend_per_share">{stock.dividend_per_share}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
