import React, { useState } from 'react';
import Swal from 'sweetalert2';
import DropdownMenu from './DropdownMenu';
import DropdownMenuItem from './DropdownMenuItem';
import SettingsDropdownButton from '@/Components/IconButtons/SettingsDropdownButton';
import { usePage, router } from '@inertiajs/react';

const SettingsDropdown = ({ stone = null, comment = null, onRemove, onEdit, onReport }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const { auth } = usePage().props;

    const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
    const closeDropdown = () => setDropdownOpen(false);

    const isOwner = auth.user && (auth.user.id === (stone?.user_id ?? comment?.user_id));
    const hasModeratorRole = auth.user && (auth.user.role === 'admin' || auth.user.role === 'moderator');
    const canEdit = isOwner;
    const canRemove = hasModeratorRole || isOwner;

    const handleAction = (action) => {
        if (!auth.user) {
            Swal.fire({
                title: 'Need to Login',
                text: 'You need to be logged in to perform this action.',
                icon: 'info',
                showCancelButton: true,
                confirmButtonText: 'Login',
                cancelButtonText: 'Cancel',
            }).then((result) => {
                if (result.isConfirmed) {
                    router.visit('/login');
                }
            });
        } else if (action === 'edit' && !canEdit) {
            Swal.fire('Permission Denied', 'You need to be the owner to edit this item.', 'error');
        } else if (action === 'remove' && !canRemove) {
            Swal.fire('Permission Denied', 'You need to be the owner or a moderator/admin to delete this item.', 'error');
        } else {
            switch (action) {
                case 'edit':
                    onEdit && onEdit();
                    break;
                case 'remove':
                    onRemove && onRemove();
                    break;
                case 'report':
                    onReport && onReport();
                    break;
                default:
                    console.log('Action not supported');
            }
            closeDropdown();
        }
    };

    return (
        <div className="relative">
            <SettingsDropdownButton onClick={toggleDropdown} />
            <DropdownMenu isOpen={dropdownOpen} onClose={closeDropdown}>
                {canEdit && (
                    <DropdownMenuItem onClick={() => handleAction('edit')}>
                        Edit
                    </DropdownMenuItem>
                )}
                {canRemove && (
                    <DropdownMenuItem onClick={() => handleAction('remove')}>
                        Remove
                    </DropdownMenuItem>
                )}
                <DropdownMenuItem onClick={() => handleAction('report')}>
                    Report
                </DropdownMenuItem>
            </DropdownMenu>
        </div>
    );
};

export default SettingsDropdown;
