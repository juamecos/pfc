import React from 'react';
import Icon from "@/Components/Icon";
import { heartOutline, chatbubbleOutline, eyeOutline } from 'ionicons/icons';

export default function UserStats({ user }) {
    const { founds, comments, likes } = user;

    const stats = {
        founds: {
            icon: eyeOutline,
            size: 20,
            text: `${founds.length} founds`
        },
        likes: {
            icon: heartOutline,
            size: 20,
            text: `${likes.length} likes`
        },
        comments: {
            icon: chatbubbleOutline,
            size: 20,
            text: `${comments.length} comments`
        }
    };

    return (
        <div className="px-5 py-2">
            <div className="flex items-center justify-between">
                {Object.keys(stats).map((key) => (
                    <div key={key} className="flex items-center space-x-1">
                        <Icon
                            iconName={stats[key].icon}
                            size={stats[key].size}
                            iconColor="text-gray-500"
                            title={stats[key].text}
                            bottom={true}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
