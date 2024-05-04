import { Link } from "@inertiajs/react";
import Icon from "./../Icon";

export default function CardFooter({ icons }) {
    return (
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
    );
}
