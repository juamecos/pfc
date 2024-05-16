// UserDetails.jsx
import React from 'react';
import { ProfileHeader } from '@/Components/User/ProfileHeader';

import CustomText from '@/Components/CustomText';
import formatDate from '@/lib/formateDate';
import UserStats from '@/Components/User/UserStats';
import UserStones from './UserStones';


const UserDetails = ({ user }) => {
    const registeredAt = formatDate(user.created_at);
    return (

        <section className="max-w-4xl mx-auto px-6 py-8 md:py-16 w-full">
            <ProfileHeader user={user} />
            <UserStats user={user} />
            <div className="p-4">
                <CustomText h3 title='Bio' margin='mb-3' />
                <CustomText title={user.bio} />
            </div>
            <div className="p-4">
                <CustomText h3 title='Country' margin='mb-3' />
                <CustomText title={user.country} />
            </div>
            <div className="p-4">
                <CustomText h3 title='Registered at' margin='mb-3' />
                <CustomText title={registeredAt} />
            </div>
            <UserStones stones={user.stones} />

        </section>
    );
};

export default UserDetails;
