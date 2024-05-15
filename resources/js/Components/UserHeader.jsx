// Components/User/UserHeader.jsx
import Avatar from '@/Components/Avatar';
import CustomText from '@/Components/CustomText';
import FormattedTime from '@/Components/FormatedTime';
import SettingsDropdown from '@/Components/DropDown/SettingsDropdown';
import { Link } from '@inertiajs/react';

/**
 * UserHeader component to display a user's avatar, name, and creation date with a settings dropdown.
 * @param {Object} props - Component props.
 * @param {Object} props.user - User object containing the avatar, name, and creation date.
 * @param {Object} props.data - The `stone` or `comment` object to be passed to the SettingsDropdown.
 * @param {Function} [props.onRemove] - Callback function to handle the removal action.
 * @param {Function} [props.onEdit] - Callback function to handle the edit action.
 * @param {Function} [props.onReport] - Callback function to handle the report action.
 * @param {boolean} [props.showDropdown=true] - Whether to show the SettingsDropdown or not.
 * @param {string} [props.size='md'] - Size of the avatar (xs, sm, md, lg).
 * @returns {JSX.Element}
 * @example
 * <UserHeader
 *   user={{ avatar: 'https://via.placeholder.com/100', name: 'Jane Doe', created_at: '2024-05-10T15:30:00Z' }}
 *   data={{ stone_id: 1 }}
 *   onRemove={() => console.log('Removing stone')}
 *   onEdit={() => console.log('Editing stone')}
 *   onReport={() => console.log('Reporting stone')}
 * />
 */
const UserHeader = ({
    data,
    onRemove,
    onEdit,
    onReport,
    showDropdown = true,
    size = 'md'
}) => {
    const { id, avatar, name, created_at } = data.user;


    return (
        <header className="flex justify-between items-center mb-2">
            <Link href={route('users.show', id)} className="flex items-center space-x-2">
                <Avatar src={avatar} alt={`Avatar from ${name}`} rounded size={size} />
                <div className="flex flex-col flex-grow">
                    <CustomText p title={name} />
                    <FormattedTime dateTime={created_at} />
                </div>
            </Link>
            {showDropdown && (
                <SettingsDropdown
                    stone={data ? data : null}
                    comment={data ? data : null}
                    onRemove={onRemove}
                    onEdit={onEdit}
                    onReport={onReport}
                />
            )}
        </header>
    );
};

export default UserHeader;
