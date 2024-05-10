// Components/Dropdown/SettingsDropdown.jsx
import React, { useState } from 'react';
import DropdownMenu from './DropdownMenu';
import DropdownMenuItem from './DropdownMenuItem';
import SettingsDropdownButton from '@/Components/IconButtons/SettingsDropdownButton';
import { usePage } from '@inertiajs/react';

/**
 * SettingsDropdown component that displays a dropdown menu for editing, removing, or reporting an item.
 *
 * @param {Object} props Component props
 * @param {Object} [props.stone=null] Stone object for the settings dropdown
 * @param {Object} [props.comment=null] Comment object for the settings dropdown
 * @param {Function} [props.onRemove] Function called when the "Remove" option is clicked
 * @param {Function} [props.onEdit] Function called when the "Edit" option is clicked
 * @param {Function} [props.onReport] Function called when the "Report" option is clicked
 * 
 * @example
 * // Usage for stone
 * <SettingsDropdown
 *     stone={stone}
 *     onRemove={() => console.log('Removing stone')}
 *     onEdit={() => console.log('Editing stone')}
 *     onReport={() => console.log('Reporting stone')}
 * />
 * 
 * @example
 * // Usage for comment
 * <SettingsDropdown
 *     comment={comment}
 *     onRemove={() => console.log('Removing comment')}
 *     onEdit={() => console.log('Editing comment')}
 *     onReport={() => console.log('Reporting comment')}
 * />
 * 
 * @returns {JSX.Element} The rendered SettingsDropdown component
 */
const SettingsDropdown = ({ stone = null, comment = null, onRemove, onEdit, onReport }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const { auth } = usePage().props;

    const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
    const closeDropdown = () => setDropdownOpen(false);

    const isOwner = auth.user && (auth.user.id === (stone?.user_id ?? comment?.user_id));
    const hasModeratorRole = auth.user && (auth.user.role === 'admin' || auth.user.role === 'moderator');
    const canEdit = isOwner;
    const canRemove = hasModeratorRole || isOwner;

    const handleEdit = () => {
        onEdit && onEdit();
        closeDropdown();
    };

    const handleRemove = () => {
        onRemove && onRemove();
        closeDropdown();
    };

    const handleReport = () => {
        onReport && onReport();
        closeDropdown();
    };

    return (
        <div className="relative">
            <SettingsDropdownButton onClick={toggleDropdown} />
            <DropdownMenu isOpen={dropdownOpen} onClose={closeDropdown}>
                {canEdit && (
                    <DropdownMenuItem onClick={handleEdit}>
                        Edit
                    </DropdownMenuItem>
                )}
                {canRemove && (
                    <DropdownMenuItem onClick={handleRemove}>
                        Remove
                    </DropdownMenuItem>
                )}
                <DropdownMenuItem onClick={handleReport}>
                    Report
                </DropdownMenuItem>
            </DropdownMenu>
        </div>
    );
};

export default SettingsDropdown;
