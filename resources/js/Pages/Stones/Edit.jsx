// Pages/Stones/StoneEdit.jsx
import React, { Suspense, useEffect } from 'react';
import { Head, usePage, router } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';
import StoneForm from '@/Components/Stone/StoneForm';
import BackButton from '@/Components/BackButton';
import CustomText from '@/Components/CustomText';
import ErrorBoundary from '@/ErrorBoundaries/ErrorBoundary';
import Loader from '@/Components/Loader';

export default function StoneEdit() {
    const { stone, auth } = usePage().props;

    useEffect(() => {
        if (stone.user_id !== auth.user.id) {
            router.visit('/', {
                method: 'get',
                data: {},
                preserveScroll: true,
                preserveState: false,
                only: ['flash', 'auth', 'errors'],
                onSuccess: () => {
                    alert('You are not authorized to edit this stone.');
                }
            });
        }
    }, [stone, auth]);

    return (
        <GuestLayout>
            <Head title="Edit Stone" />
            <div className="min-h-screen pb-12">

                <ErrorBoundary>
                    <section className="max-w-4xl mx-auto px-6 py-8 md:py-16 w-full">
                        <div className="flex items-center mb-3">
                            <BackButton />
                            <CustomText h1 title="Edit Stone" margin='ml-6 mb-6' />
                        </div>
                        <CustomText p title="Update the stone details below." margin='mb-8' />
                        <Suspense fallback={<Loader />}>
                            <StoneForm initialData={stone} />
                        </Suspense>
                    </section>
                </ErrorBoundary>
            </div>
        </GuestLayout>
    );
}
