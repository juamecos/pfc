import React from 'react';
import { Link } from '@inertiajs/react';

export default function Error({ message }) {
    return (
        <div className="container mx-auto mt-10 p-8 bg-white shadow-md rounded-md text-center">
            <h1 className="text-4xl font-bold mb-4">Error</h1>
            <p className="text-xl mb-6">{message || 'Something went wrong!'}</p>
            <Link href="/" className="text-blue-500 underline">
                Go back to Home
            </Link>
        </div>
    );
}
