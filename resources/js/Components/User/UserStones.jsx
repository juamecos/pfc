import React from 'react';
import { Link } from '@inertiajs/react';
import CustomText from '@/Components/CustomText'; // Ensure you import CustomText correctly based on its directory

export default function UserStones({ stones = [] }) {
    if (stones.length === 0) {
        return (
            <CustomText p title="No stones available." />
        );
    }

    return (
        <div className="grid grid-cols-3 gap-4 p-4">
            {stones.map((stone) => (
                <Link key={stone.id} href={route('stones.show', { id: stone.id })} className="relative">
                    <img
                        src={stone.image}
                        alt={stone.title ? `Image of stone titled: ${stone.title}` : 'Decorative stone image'}
                        className="w-full h-full object-cover"
                    />
                </Link>
            ))}
        </div>
    );
}
