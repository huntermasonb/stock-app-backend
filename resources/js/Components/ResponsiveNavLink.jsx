import { Link } from '@inertiajs/react';

export default function ResponsiveNavLink({ active = false, className = '', children, ...props }) {
    return (
        <Link
            {...props}
            className={`w-full flex items-start ps-3 pe-4 py-2 border-l-4 ${
                active
                    ? 'border-indigo-400 text-indigo-900 bg-indigo-50 focus:bg-indigo-100 focus:border-indigo-700'
                    : 'border-transparent text-indigo-100 hover:text-indigo-800 hover:bg-indigo-50 hover:border-indigo-200 focus:text-indigo-300 focus:bg-indigo-50 focus:border-indigo-200'
            } text-base font-medium focus:outline-none transition duration-150 ease-in-out ${className}`}
        >
            {children}
        </Link>
    );
}
