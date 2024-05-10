// Components/Card/CardHeader.jsx
import UserHeader from '@/Components/UserHeader';

/**
 * CardHeader component to display the header of a stone card.
 * @param {Object} props - Component props.
 * @param {Object} props.stone - The stone object.
 * @returns {JSX.Element}
 */
export default function CardHeader({ stone }) {
    const { user } = stone;

    return (
        <UserHeader
            user={user}
            data={stone}
            onRemove={() => console.log('Removing stone')}
            onEdit={() => console.log('Editing stone')}
            onReport={() => console.log('Reporting stone')}
        />
    );
}
