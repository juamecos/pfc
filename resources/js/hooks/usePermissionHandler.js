import { usePage, router } from '@inertiajs/react';
import Swal from 'sweetalert2';

export function usePermissionHandler() {
    const { auth } = usePage().props;
    /**
     * Checks if the authenticated user is the owner of the specified entity.
     * @param {Object} user - The current authenticated user.
     * @param {Object} entity - The entity to check ownership against.
     * @returns {boolean} - Returns true if the user is the owner of the entity, otherwise false.
     */
    const isOwner = (user, entity) => {
        return user && entity && user.id === entity.user_id;
    };
    const hasModeratorRole = auth.user && (auth.user.role === 'admin' || auth.user.role === 'moderator');

    const isLoggedIn = () => {
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
            return false;
        }
        return true;
    };

    const requestGeoPermission = async () => {
        try {
            await new Promise((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(resolve, reject, { timeout: 10000 });
            });
            return true;
        } catch (error) {
            Swal.fire('Geolocation Permission Needed', 'This action requires geolocation permissions, which were not granted.', 'error');
            return false;
        }
    };


    return { isOwner, hasModeratorRole, isLoggedIn, requestGeoPermission };
}
