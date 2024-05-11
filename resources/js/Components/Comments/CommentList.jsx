

import Comment from '@/Components/Comments/Comment';
import CustomText from '../CustomText';
export default function CommentList({ comments }) {
    if (!comments) {
        return null;
    }
    const commentData = comments.data || comments;

    return (
        (comments ? (

            <ul className="divide-y divide-gray-200">
                {commentData.map((comment) => (
                    <li key={comment.id} className="py-4">
                        <Comment comment={comment} />
                    </li>
                ))}
            </ul>

        ) : <CustomText p title="This stone has no comments yet. Write something beautiful about the stone." />


        )
    );
}

