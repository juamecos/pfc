import React from 'react';
import { ProfileHeader } from '@/Components/User/ProfileHeader';

import CustomText from '@/Components/CustomText';
import formatDate from '@/lib/formateDate';
import UserStats from '@/Components/User/UserStats';
import UserStones from './UserStones';

const UserDetails = ({ user }) => {
    const registeredAt = formatDate(user.created_at);
    const bio = user.bio || 'No bio available';
    const country = user.country || 'Country not specified';
    const stones = user.stones && user.stones.length > 0 ? user.stones : 'No stones available';

    return (
        <section className="max-w-4xl mx-auto px-6 py-8 md:py-16 w-full">
            <ProfileHeader user={user} />
            <UserStats user={user} />
            <div className="p-4">
                <CustomText h3 title='Bio' margin='mb-3' />
                <CustomText title={bio} />
            </div>
            <div className="p-4">
                <CustomText h3 title='Country' margin='mb-3' />
                <CustomText title={country} />
            </div>
            <div className="p-4">
                <CustomText h3 title='Registered at' margin='mb-3' />
                <CustomText title={registeredAt} />
            </div>
            <div className="p-4">
                <CustomText h3 title='Stones' margin='mb-3' />
                {Array.isArray(stones) ? (
                    <>
                        <CustomText title='Click in the picture of the stone to see the details' />
                        <UserStones stones={stones} />
                    </>
                ) : (
                    <CustomText title={stones} />
                )}
            </div>
        </section>
    );
};

export default UserDetails;
