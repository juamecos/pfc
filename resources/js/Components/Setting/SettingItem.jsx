import React from 'react';
import { Link } from '@inertiajs/react';
import Icon from '@/Components/Icon';

const SettingItem = ({ iconName, title, description, method = 'get', as = 'a', className = '', ...props }) => {
    return (
        <div className="flex items-center justify-between p-4 border-b cursor-pointer hover:bg-gray-100">
            <Link
                method={method}
                as={as}
                className={`flex items-center w-full ${className}`}
                {...props}
            >
                <div className="mr-4">
                    <Icon iconName={iconName} size={24} iconColor="text-gray-700" />
                </div>
                <div>
                    <h2 className="text-lg font-medium">{title}</h2>
                    <p className="text-gray-500">{description}</p>
                </div>
            </Link>
        </div>
    );
};

export default SettingItem;
