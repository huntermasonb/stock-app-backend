import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import {Children} from "react";

export default function Dashboard({ auth, stocks }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            // header={<h2 className="font-semibold text-center text-2xl text-indigo-900 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="flex flex-col w-full sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg hover:shadow-md transition-shadow duration-200">
                        <div className="p-6 text-center text-indigo-900">Welcome to your dashboard!</div>
                            <div>
                                {stocks.map((stock) => (
                                    <div key={stock.id}>
                                        <h2>{stock.name}</h2>
                                    </div>
                                ))}
                                {/*<h1>{stock[0].name}</h1>*/}
                            </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
