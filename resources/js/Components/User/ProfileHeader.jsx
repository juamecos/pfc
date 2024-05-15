import Avatar from '@/Components/Avatar';
import CustomText from '@/Components/CustomText';

export const ProfileHeader = ({ user }) => {
    return (
        <div className="p-4 flex flex-col items-center">
            <Avatar src={user.avatar} size='xxl' alt="User profile" />
            <CustomText h2 title={user.name} margin='mt-6 mb-8' />
        </div>
    );
};