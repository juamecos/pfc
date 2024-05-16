import GuestLayout from '@/Layouts/GuestLayout';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import { Head } from '@inertiajs/react';

export default function Edit({ auth, mustVerifyEmail, status }) {
    return (
        <GuestLayout>
            <Head title="Profile" />

            <section className="max-w-4xl mx-auto px-6 py-8 md:py-16 w-full mb-20">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-white border-b border-gray-300">
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            className="max-w-xl"
                        />
                    </div>

                    <div className="p-4 sm:p-8 bg-white border-b border-gray-200">
                        <UpdatePasswordForm className="max-w-xl" />
                    </div>

                    <div className="p-4 sm:p-8 bg-white border-b">
                        <DeleteUserForm className="max-w-xl" />
                    </div>
                </div>
            </section>
        </GuestLayout>
    );
}
