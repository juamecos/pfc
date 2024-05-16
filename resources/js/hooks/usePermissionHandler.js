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

    const requestGeoPermission = (callback) => {
        if (navigator.permissions) {
            navigator.permissions.query({ name: 'geolocation' }).then(function (permissionStatus) {
                if (permissionStatus.state === 'granted') {
                    // The user has already granted permission, execute the callback
                    callback();
                } else if (permissionStatus.state === 'prompt') {
                    // The user has not yet given permission, request it
                    navigator.geolocation.getCurrentPosition(
                        function () {
                            // The user granted permission, execute the callback
                            callback();
                        },
                        function () {
                            // The user denied the permission
                            Swal.fire({
                                icon: 'error',
                                title: 'Permission Denied',
                                text: 'Could not access location. Please allow location access in your browser to use this function.',
                            });
                        },
                        { timeout: 10000 }
                    );
                } else if (permissionStatus.state === 'denied') {
                    // The user denied the permission
                    Swal.fire({
                        icon: 'error',
                        title: 'Permission Denied',
                        text: 'Could not access location. Please allow location access in your browser to use this function.',
                    });
                }
            });
        } else {
            // The browser does not support the Permissions API
            Swal.fire({
                icon: 'error',
                title: 'Browser Not Supported',
                text: 'Your browser does not support the Permissions API, so the location permission cannot be checked. This function needs location permission',
            });
        }
    };



    return { isOwner, hasModeratorRole, isLoggedIn, requestGeoPermission };
}
