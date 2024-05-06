import formatDate from "@/lib/formateDate";
import Avatar from "@/Components/Avatar";
import CustomText from "@/Components/CustomText";
import Icon from "@/Components/Icon";
import { ellipsisHorizontalOutline } from 'ionicons/icons';

export default function CardHeader({ stone }) {
    const { user } = stone;
    const { name, avatar, created_at } = user;

    const date = formatDate(created_at);
    return (
        <div className="flex flex-row justify-between absolute z-10 px-4 py-7 w-full h-10 sm:h-12 bg-white">
            <div className='flex flex-row items-center'>
                <Avatar rounded={true} src={avatar} alt='Avatar user' className="rounded-full w-10 h-10 sm:w-12 sm:h-12 mr-2" />
                <div className='flex flex-col flex-grow'>
                    <CustomText title={name} />
                    <CustomText title={date} />
                </div>
            </div>
            <Icon iconName={ellipsisHorizontalOutline} iconColor='text-gray-500 dark:text-gray-400'
                textColor='text-gray-500 dark:text-gray-400' size={20} />
        </div>
    );
}
