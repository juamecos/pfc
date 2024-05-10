// resources/js/Components/Comments/CommentList.jsx

// resources/js/Components/Comments/CommentList.jsx

import Comment from '@/Components/Comments/Comment';

export default function CommentList({ comments }) {
    const commentData = comments.data || comments;

    return (
        <ul className="divide-y divide-gray-200">
            {commentData.map((comment) => (
                <li key={comment.id} className="py-4">
                    <Comment comment={comment} />
                </li>
            ))}
        </ul>
    );
}

