import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import {Head, Link, router} from "@inertiajs/react";

const openGroup = (groupId) => {
    return route('group.show', ['groupId', groupId])
}
export default function index({auth, groups}) {
    return(
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-center text-2xl text-indigo-900 dark:text-indigo-300 leading-tight">Groups</h2>}
        >
            <Head title="Groups"/>
            <div className="m-8 p-16 flex flex-col bg-indigo-700 dark:bg-indigo-300 text-lavender-100 dark:text-indigo-950 rounded-lg">
                {groups && groups.map((group, index) => (
                    <Link key={index} href={route('group.show', group.id)}>
                        {group.name}
                    </Link>
                ))}
                <Link href={route('group.create')} >
                    Create new group
                </Link>
            </div>
        </AuthenticatedLayout>
    )
}
