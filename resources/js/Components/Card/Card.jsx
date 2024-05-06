import CardHeader from "./CardHeader";
import CardImage from "./CardImage";
import CardFooter from "./CardFooter";

import { heartOutline, chatbubbleOutline, eyeOutline } from 'ionicons/icons';


export default function Card({ stone }) {
    const { founds, likes, comments } = stone;

    const icons = [
        { icon: eyeOutline, size: 20, text: `${founds.length} founds` },
        { icon: heartOutline, size: 20, text: `${likes.length} likes` },
        { icon: chatbubbleOutline, size: 20, text: `${comments.length} comments` }
    ];

    return (
        <div className="max-w-full relative md:max-w-lg lg:max-w-xl border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <CardHeader stone={stone} />
            <CardImage stone={stone} />
            <CardFooter icons={icons} stone={stone} />
        </div>
    );
}

