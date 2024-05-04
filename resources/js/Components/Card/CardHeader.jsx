import Avatar from "./../Avatar";
import CustomText from "./../CustomText";
import Icon from "./../Icon";
import { ellipsisHorizontalOutline } from 'ionicons/icons';

export default function CardHeader({ avatarUrl, username, date }) {
    return (
        <div className="flex flex-row justify-between absolute z-10 px-4 py-7 w-full h-10 sm:h-12 bg-white">
            <div className='flex flex-row items-center'>
                <Avatar rounded={true} src={avatarUrl} alt='Avatar user' className="rounded-full w-10 h-10 sm:w-12 sm:h-12 mr-2" />
                <div className='flex flex-col flex-grow'>
                    <CustomText title={username} />
                    <CustomText title={date} />
                </div>
            </div>
            <Icon iconName={ellipsisHorizontalOutline} iconColor='text-gray-500 dark:text-gray-400'
                textColor='text-gray-500 dark:text-gray-400' size={20} />
        </div>
    );
}
