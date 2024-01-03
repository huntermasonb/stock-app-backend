import { Link, Head } from '@inertiajs/react';
import StockPrice from "@/Pages/StockPrice.jsx";

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    return (
        <>
            <Head title={"Welcome"} />
            <div id={"header"} className="flex flex-row justify-between bg-indigo-900 shadow-md shadow-indigo-700/25">
                <div className="p-6 text-indigo-100 text-5xl focus:ring-indigo-800">
                    <Link href={route('home')}>Stock App</Link>
                </div>
                <div className="p-6 mt-3 text-center">
                    {auth.user ? (
                        <Link
                            href={route('dashboard')}
                            className="font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                        >
                            Dashboard
                        </Link>
                    ) : (
                        <>
                            <Link
                                href={route('login')}
                                className="font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                            >
                                Log in
                            </Link>

                            <Link
                                href={route('register')}
                                className="ms-4 font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                            >
                                Register
                            </Link>
                        </>
                    )}
                </div>
                {/*<div className="max-w-7xl mx-auto p-6 lg:p-8">
                    <div className="flex justify-center mt-16 px-6 sm:items-center sm:justify-between">
                        <div className="ms-4 text-center text-sm text-gray-500 dark:text-gray-400 sm:text-end sm:ms-0">
                            Laravel v{laravelVersion} (PHP v{phpVersion})
                        </div>
                    </div>
                </div>*/}
            </div>
            <StockPrice />
        </>
    );
}
