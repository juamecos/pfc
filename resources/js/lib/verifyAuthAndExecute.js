import Swal from 'sweetalert2';
import { router } from '@inertiajs/react';
// Generic function to verify authentication before executing an action
export default function verifyAuthAndExecute(action, isAuthenticated) {
    if (isAuthenticated) {
        action();
    } else {
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
    }
};



