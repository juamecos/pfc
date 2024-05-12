// Components/Comments/CommentHeader.jsx
import UserHeader from '@/Components/UserHeader';
import { router } from '@inertiajs/react';
import Swal from 'sweetalert2'
import { deleteEntity, reportEntity, editEntity } from '@/lib/interactionHandlers';

/**
 * CommentHeader component to display the header of a comment.
 * @param {Object} props - Component props.
 * @param {Object} props.comment - The comment object.
 * @returns {JSX.Element}
 */
export default function CommentHeader({ comment }) {
    const { user, id, content } = comment;



    const handleSuccess = (message, title = 'Success') => {
        Swal.fire(title, message, 'success').then(() => {
            router.visit(window.location.href, { preserveScroll: true, preserveState: false });
        });
    };

    const handleError = (message, title = 'Failed!') => {
        Swal.fire(title, message, 'error');
    };

    const deleteComment = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(route('comments.destroy', { id }), {
                    preserveScroll: true,
                    preserveState: false,
                    onSuccess: () => handleSuccess('Your comment has been deleted.'),
                    onError: () => handleError('There was an error deleting your comment.')
                });
            }
        });
    };

    const reportComment = () => {
        Swal.fire({
            title: 'Report this comment?',
            text: "Are you sure you want to report this comment?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, report it!'
        }).then((result) => {
            if (result.isConfirmed) {
                router.put(route('comments.report', { id }), {
                    preserveScroll: true,
                    onSuccess: () => handleSuccess('Your comment has been deleted.'),
                    onError: () => handleError('There was an error deleting your comment.')
                });
            }
        });
    };

    const onEditComment = (comment) => {
        Swal.fire({
            title: 'Edit Comment',
            html: `<textarea id="content" class="swal2-textarea" placeholder="Comment">${comment.content}</textarea>`,
            confirmButtonText: 'Update Comment',
            focusConfirm: false,
            preConfirm: () => {
                const newContent = document.getElementById('content').value;
                if (!newContent) {
                    Swal.showValidationMessage('Please enter some content');
                    return false;
                }
                return { content: newContent };
            }
        }).then((result) => {
            if (result.isConfirmed && result.value) {
                router.patch(route('comments.update', comment.id), result.value, {
                    onSuccess: () => handleSuccess('Comment updated successfully'),
                    onError: () => handleError('Failed to update comment'),
                    preserveScroll: true,
                    preserveState: false,

                });
            }
        });
    };

    return (
        <UserHeader
            user={user}
            data={comment}
            onRemove={() => deleteComment(id)}
            onEdit={() => onEditComment(comment)}
            onReport={() => reportComment(id)}
        />
    );
}

