import React, { Suspense } from 'react';
import { Head } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';
import FoundForm from '@/Components/Forms/FoundForm'; // Ensure you have this component
import BackButton from '@/Components/BackButton';
import CustomText from '@/Components/CustomText';
import ErrorBoundary from '@/ErrorBoundaries/ErrorBoundary';
import Loader from '@/Components/Loader';
import MapLocationInput from '@/Components/Forms/MapLocationInput';

export default function FoundCreate({ code, stone }) {
    return (
        <GuestLayout>
            <Head title="Found Stone" />
            <div className="min-h-screen pb-12">
                <ErrorBoundary>
                    <section className="max-w-4xl mx-auto px-6 py-8 md:py-16 w-full">
                        <div className="flex items-center mb-3">
                            <CustomText h1 title={`Found Stone ${code}`} margin='ml-6 mb-6' />
                        </div>

                        <CustomText p title="Below you can add location details about the found stone." margin='mb-8' />

                        <FoundForm />

                    </section>
                </ErrorBoundary>
            </div>
        </GuestLayout>
    );
}
