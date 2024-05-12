// interactionHandlers.js
import { router } from '@inertiajs/react';
import Swal from 'sweetalert2';

export const handleSuccess = (message, title = 'Success') => {
    Swal.fire(title, message, 'success').then(() => {
        router.visit(window.location.href, { preserveScroll: true, preserveState: false });
    });
};

export const handleError = (message, title = 'Failed!') => {
    Swal.fire(title, message, 'error');
};

export const deleteEntity = (entityType, id) => {
    const routeName = entityType === 'comment' ? 'comments.destroy' : 'stone.destroy';
    const successMessage = entityType === 'comment' ? 'Your comment has been deleted.' : 'Your stone has been deleted.';
    const errorMessage = entityType === 'comment' ? 'There was an error deleting your comment.' : 'There was an error deleting your stone.';

    Swal.fire({
        title: `Are you sure you want to delete this ${entityType}?`,
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            router.delete(route(routeName, { id }), {
                onSuccess: () => handleSuccess(successMessage),
                onError: () => handleError(errorMessage)
            });
        }
    });
};

export const reportEntity = (entityType, id) => {
    const routeName = entityType === 'comment' ? 'comments.report' : 'stone.report';
    const successMessage = entityType === 'comment' ? 'Comment reported.' : 'Stone reported.';
    const errorMessage = entityType === 'comment' ? 'Failed to report comment.' : 'Failed to report stone.';

    Swal.fire({
        title: `Report this ${entityType}?`,
        text: `Are you sure you want to report this ${entityType}?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, report it!'
    }).then((result) => {
        if (result.isConfirmed) {
            router.put(route(routeName, { id }), {
                onSuccess: () => handleSuccess(successMessage),
                onError: () => handleError(errorMessage)
            });
        }
    });
};

export const editEntity = (entityType, entity) => {
    if (entityType === 'stone') {
        // For stones, navigate directly to the edit page
        router.visit(route('stone.edit', { id: entity.id }));
    } else {
        // For comments, use a dialog to edit inline
        const dialogTitle = 'Edit Comment';
        Swal.fire({
            title: dialogTitle,
            html: `<textarea id="content" class="swal2-textarea" placeholder="Content">${entity.content}</textarea>`,
            confirmButtonText: 'Update',
            focusConfirm: false,
            preConfirm: () => {
                const content = document.getElementById('content').value;
                if (!content) {
                    Swal.showValidationMessage('Please enter some content');
                    return false;
                }
                return { content };
            }
        }).then((result) => {
            if (result.isConfirmed && result.value) {
                router.patch(route('comments.update', { id: entity.id }), result.value, {
                    onSuccess: () => handleSuccess('Comment updated successfully'),
                    onError: () => handleError('Failed to update comment')
                });
            }
        });
    }
};
