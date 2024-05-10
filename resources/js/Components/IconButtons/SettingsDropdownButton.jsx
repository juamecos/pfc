// Components/Dropdown/SettingsDropdownButton.jsx
import Icon from '@/Components/Icon';
import React from 'react';

import { ellipsisHorizontalOutline } from 'ionicons/icons';

const SettingsDropdownButton = ({ onClick }) => {
    return (
        <button
            onClick={onClick}
            className="inline-flex items-center p-2 text-sm font-medium text-center bg-transparent cursor:pointer"
            type="button"
        >
            <Icon iconName={ellipsisHorizontalOutline} size={16} />
            <span className="sr-only">Comment settings</span>
        </button>
    );
};

export default SettingsDropdownButton;
