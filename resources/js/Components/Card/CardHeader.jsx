// Components/Card/CardHeader.jsx
import UserHeader from '@/Components/UserHeader';
import { deleteEntity, reportEntity, editEntity } from '@/lib/interactionHandlers';
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
            onRemove={() => deleteEntity('stone', stone.id)}
            onEdit={() => editEntity('stone', stone)}
            onReport={() => reportEntity('stone', stone.id)}
        />
    );
}
