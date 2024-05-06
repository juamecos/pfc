import React from 'react';
import CustomText from '@/Components/CustomText';
import StoneImage from '@/Components/Stone/StoneImage';
import Avatar from '@/Components/Avatar';

function StoneDetails({ stone }) {
    const likesCount = stone.likes.length;
    const commentsCount = stone.comments.length;
    const foundsCount = stone.founds.length;

    return (
        <main className="mx-auto max-w-[910px] p-4 bg-white">
            <StoneImage stone={stone} />
            <div className="flex items-center space-x-4 mt-4">
                <Avatar src={stone.user.avatar} alt={`${stone.user.name}'s avatar`} />
                <div>
                    <CustomText h2 title={stone.user.name} textColor="text-gray-900" />
                    <CustomText p title={`From ${stone.user.country}`} textColor="text-gray-500" />
                </div>
            </div>
            <div className="mt-4">
                <CustomText h1 bold title={stone.title} textColor="text-gray-900" />
                <CustomText p title={stone.description} textColor="text-gray-600" margin="my-2" />
                <CustomText p title={`Created at: ${new Date(stone.created_at).toLocaleDateString()}`} textColor="text-sm text-gray-500" />
                <CustomText p title={`Updated at: ${new Date(stone.updated_at).toLocaleDateString()}`} textColor="text-sm text-gray-500" />
                <CustomText p title={`Location: ${stone.city}, ${stone.country}`} textColor="text-sm text-gray-500" />
                <CustomText p title={`Coordinates: ${stone.latitude.toFixed(3)}, ${stone.longitude.toFixed(3)}`} textColor="text-sm text-gray-500" />
                <CustomText p title={`Code: ${stone.code}`} textColor="text-sm text-gray-500" />
                <CustomText p title={`Status: ${stone.active ? 'Active' : 'Inactive'}`} textColor={stone.active ? 'text-green-500' : 'text-red-500'} />
                <CustomText p title={`Abuse: ${stone.abuse ? 'Reported' : 'No reports'}`} textColor={stone.abuse ? 'text-red-500' : 'text-gray-500'} />
                <CustomText p title={`Moderation Status: ${stone.moderation_status}`} textColor="text-sm text-gray-500" />
                <CustomText p title={`Report Count: ${stone.report_count}`} textColor="text-sm text-gray-500" />
                <CustomText p title={`Likes: ${likesCount}`} textColor="text-blue-500" />
                <CustomText p title={`Comments: ${commentsCount}`} textColor="text-blue-500" />
                <CustomText p title={`Founds: ${foundsCount}`} textColor="text-blue-500" />
            </div>
        </main>
    );
}

export default StoneDetails;
