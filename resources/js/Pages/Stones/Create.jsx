import React, { Suspense } from 'react';
import { Head } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';
import StoneForm from '@/Components/Stone/StoneForm';
import Button from '@/Components/Button';
import CustomText from '@/Components/CustomText';
import ErrorBoundary from '@/ErrorBoundaries/ErrorBoundary';
import Loader from '@/Components/Loader';

export default function StoneCreate() {
    return (
        <GuestLayout>
            <Head title="New Stone" />
            <div className="min-h-screen pb-12">
                <ErrorBoundary>
                    <section className="max-w-4xl mx-auto px-6 py-8 md:py-16 w-full">
                        <Button
                            href="/"
                            buttonType="red"
                            className="mb-3 inline-block font-semibold"
                        >
                            ← Stones
                        </Button>
                        <CustomText h1 title="New Stone" margin='mb-3' />
                        <CustomText p title="Below you can add details about the stone." margin='mb-8' />
                        <Suspense fallback={Loader}>
                            <StoneForm />
                        </Suspense>
                    </section>
                </ErrorBoundary>
            </div>
        </GuestLayout>
    );
}
