import { Link } from "@inertiajs/react";
import Icon from "./Icon";
import { heartOutline, chatbubbleOutline, eyeOutline, ellipsisHorizontalOutline } from 'ionicons/icons';
import Avatar from "./Avatar";
import CustomText from "@/Components/CustomText";

export default function Card() {
    const imageUrl = "https://via.placeholder.com/640x480.png/00ffdd?text=nature+nobis";
    const username = "John Doe"; // Supongamos que estos datos provienen de props o context
    const avatarUrl = 'https://i.pravatar.cc/48?u=a042581f4e29026704d';
    const date = "Sep 12, 2023"; // Idem para la fecha

    const icons = [
        { icon: eyeOutline, size: 20, text: '2 found' },
        { icon: heartOutline, size: 20, text: '30 likes' },
        { icon: chatbubbleOutline, size: 20, text: '1 comment' }
    ];

    return (
        <div className="max-w-full relative md:max-w-lg lg:max-w-xl border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">

            {/* Card header */}
            <div className="flex flex-row justify-between absolute z-10 px-4 py-7  w-full h-10 sm:h-12 bg-white">
                <div className='flex flex-row items-center '>
                    <Avatar rounded={true} src={avatarUrl} alt='Avatar user' className="rounded-full w-10 h-10 sm:w-12 sm:h-12 mr-2" />
                    <div className='flex flex-col flex-grow'>
                        <CustomText title={username} />
                        <CustomText title={date} />
                    </div>
                </div>
                <Icon iconName={ellipsisHorizontalOutline} iconColor='text-gray-500 dark:text-gray-400'
                    textColor='text-gray-500 dark:text-gray-400' size={20} />
            </div>
            {/* Card Image */}
            <a href="#" className=" block">
                <img className="rounded-t-lg w-full" src={imageUrl} alt="" />
            </a>
            {/* Card footer */}
            <div className="px-5 py-2">
                <div className="flex items-center justify-between">
                    {icons.map(({ icon, size, text }) => (
                        <Link key={text} href="#">
                            <Icon
                                iconName={icon}
                                size={size}
                                sizeSM={size + 2}
                                sizeMD={size + 4}
                                iconColor='text-gray-500 dark:text-gray-400'
                                textColor='text-gray-500 dark:text-gray-400'
                                title={text}
                                bottom={true}
                            />
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
