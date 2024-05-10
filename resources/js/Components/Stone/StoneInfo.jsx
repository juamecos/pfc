// Components/Stone/StoneInfo.jsx
import CustomText from '@/Components/CustomText';

export default function StoneInfo({ stone, hasAdminAccess, isOwner }) {
    return (
        <div className="mt-4">
            <CustomText h2 bold title={stone.title} textColor="text-gray-900" margin="my-3" />
            <CustomText p bold title={stone.description} margin="my-4" />
            {isOwner && <CustomText p title={`Code: ${stone.code}`} textColor="text-sm text-gray-500" />}

            <CustomText p italic title={`Location: ${stone.city}, ${stone.country}`} textColor="text-sm text-gray-900" margin="my-3" />
            <CustomText p title={`Coordinates: ${stone.latitude.toFixed(3)}, ${stone.longitude.toFixed(3)}`} textColor="text-sm text-gray-500" />
            <CustomText p title={`Created at: ${new Date(stone.created_at).toLocaleDateString()}`} textColor="text-sm text-gray-500" />
            <CustomText p title={`Updated at: ${new Date(stone.updated_at).toLocaleDateString()}`} textColor="text-sm text-gray-500" />

            {hasAdminAccess && (
                <>
                    <CustomText p title={`Status: ${stone.active ? 'Active' : 'Inactive'}`} textColor={stone.active ? 'text-green-500' : 'text-red-500'} />
                    <CustomText p title={`Abuse: ${stone.abuse ? 'Reported' : 'No reports'}`} textColor={stone.abuse ? 'text-red-500' : 'text-gray-500'} />
                    <CustomText p title={`Moderation Status: ${stone.moderation_status}`} textColor="text-sm text-gray-500" />
                    <CustomText p title={`Report Count: ${stone.report_count}`} textColor="text-sm text-gray-500" />
                </>
            )}
        </div>
    );
}
