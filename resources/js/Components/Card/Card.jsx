import CardHeader from "./CardHeader";
import CardImage from "./CardImage";
import CardFooter from "./CardFooter";

import { heartOutline, chatbubbleOutline, eyeOutline } from 'ionicons/icons';
import formatDate from "@/lib/formateDate";


export default function Card({ stone }) {
    const imageUrl = "https://via.placeholder.com/640x480.png/00ffdd?text=nature+nobis";
    const username = "John Doe";
    const avatarUrl = 'https://i.pravatar.cc/48?u=a042581f4e29026704d';
    const date = formatDate(stone.created_at);

    const icons = [
        { icon: eyeOutline, size: 20, text: '2 found' },
        { icon: heartOutline, size: 20, text: '30 likes' },
        { icon: chatbubbleOutline, size: 20, text: '1 comment' }
    ];

    return (
        <div className="max-w-full relative md:max-w-lg lg:max-w-xl border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <CardHeader avatarUrl={avatarUrl} username={username} date={date} />
            <CardImage imageUrl={imageUrl} />
            <CardFooter icons={icons} />
        </div>
    );
}

