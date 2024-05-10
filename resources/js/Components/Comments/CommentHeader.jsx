// Components/Comments/CommentHeader.jsx
import UserHeader from '@/Components/UserHeader';

/**
 * CommentHeader component to display the header of a comment.
 * @param {Object} props - Component props.
 * @param {Object} props.comment - The comment object.
 * @returns {JSX.Element}
 */
export default function CommentHeader({ comment }) {
    const { user } = comment;

    return (
        <UserHeader
            user={user}
            data={comment}
            onRemove={() => console.log('Removing comment')}
            onEdit={() => console.log('Editing comment')}
            onReport={() => console.log('Reporting comment')}
        />
    );
}
