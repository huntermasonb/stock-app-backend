import { Link, Head } from '@inertiajs/react';
import StockPrice from "@/Pages/StockPrice.jsx";
import ApplicationLogo from "@/Components/ApplicationLogo.jsx";

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    return (
        <>
            <Head title="Welcome" />
            <div id={"header"} className="flex flex-row justify-between bg-indigo-900 shadow-md shadow-indigo-700/25">
                <div className="pt-1 pl-6 md:pl-28">
                    <Link href={route('home')}>
                        <ApplicationLogo className={"h-20"} />
                        <p className={"ml-[-1.5rem] text-indigo-100"}>Stock Tracker</p>
                    </Link>
                </div>
                <div className="flex p-6 items-center text-center">
                    {auth.user ? (
                        <Link
                            href={route('dashboard')}
                            className="font-semibold text-indigo-50 hover:text-indigo-200 dark:text-indigo-200 dark:hover:text-indigo-50 focus:outline focus:outline-2 focus:rounded-sm focus:outline-violet-500"
                        >
                            Dashboard
                        </Link>
                    ) : (
                        <>
                            <Link
                                href={route('login')}
                                className="font-semibold text-indigo-50 hover:text-indigo-200 dark:text-indigo-200 dark:hover:text-indigo-50 focus:outline focus:outline-2 focus:rounded-sm focus:outline-violet-500"
                            >
                                Log in
                            </Link>

                            <Link
                                href={route('register')}
                                className="ms-4 font-semibold text-indigo-50 hover:text-indigo-200 dark:text-indigo-200 dark:hover:text-indigo-50 focus:outline focus:outline-2 focus:rounded-sm focus:outline-violet-500"
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
