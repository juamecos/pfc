// Components/Comments/Comment.jsx
import CommentHeader from '@/Components/Comments/CommentHeader';

export default function Comment({ comment }) {
    const { content } = comment;

    return (
        <article className="p-3 mb-2 text-base bg-white border-t border-gray-200">
            <CommentHeader comment={comment} />

            {/* content */}
            <p className="text-gray-500">{content}</p>

        </article>
    );
}
