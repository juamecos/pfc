import UserDetails from "@/Components/User/UserDetails";
import GuestLayout from "@/Layouts/GuestLayout";
import CustomText from '@/Components/CustomText';
import { Head } from "@inertiajs/react";

const UsersShow = ({ user }) => {

    return (
        <GuestLayout>
            <Head title={user.name} />
            <main className="mx-auto mb-[30rem] max-w-[910px] p-4  bg-white">
                <CustomText h1 title='User Profile' />
                <UserDetails user={user} />

            </main>
        </GuestLayout>
    );
};

export default UsersShow;