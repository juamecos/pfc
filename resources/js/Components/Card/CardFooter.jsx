import { useCallback, useMemo } from 'react';

import { usePage, router } from "@inertiajs/react";
import Icon from "./../Icon";
import { heart, heartOutline, chatbubbleOutline, eyeOutline } from 'ionicons/icons';
import useCardActions from '@/hooks/useCardActions';
export default function CardFooter({ stone }) {
    const { founds, likes, comments, id } = stone;
    const { auth } = usePage().props;
    const isAuthenticated = !!auth.user;
    const actions = useCardActions(stone, isAuthenticated);
    const userHasLiked = likes && isAuthenticated ? likes.some(like => like.user_id === auth.user.id) : false;



    const icons = {
        found: {
            icon: eyeOutline,
            size: 20,
            text: `${founds.length} founds`
        },
        like: {
            icon: userHasLiked ? heart : heartOutline,
            size: 20,
            text: `${likes.length} likes`,
            iconColor: userHasLiked ? 'text-red-500' : 'text-gray-500'
        },
        comment: {
            icon: chatbubbleOutline,
            size: 20,
            text: `${comments.length} comments`
        }
    };

    return (
        <div className="px-5 py-2">
            <div className="flex items-center justify-between">
                {Object.keys(icons).map((key) => (
                    <button key={key} onClick={actions[key]}>
                        <Icon
                            iconName={icons[key].icon}
                            size={icons[key].size}
                            sizeSM={icons[key].size + 2}
                            sizeMD={icons[key].size + 4}
                            iconColor={icons[key].iconColor && icons[key].iconColor}
                            textColor='text-gray-500 dark:text-gray-400'
                            title={icons[key].text}
                            bottom={true}
                        />
                    </button>
                ))}
            </div>
        </div>
    );
}
