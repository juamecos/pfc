// Components/Dropdown/DropdownMenu.jsx
import React from 'react';

const DropdownMenu = ({ isOpen, children, onClose }) => {
    return isOpen ? (
        <div
            className="z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow absolute mt-2 right-0"
            onClick={onClose}
        >
            <ul className="py-1 text-sm text-gray-700">
                {children}
            </ul>
        </div>
    ) : null;
};

export default DropdownMenu;
