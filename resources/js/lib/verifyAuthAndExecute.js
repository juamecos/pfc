import Swal from 'sweetalert2';

// Generic function to verify authentication before executing an action
export default function verifyAuthAndExecute(action, isAuthenticated) {
    if (isAuthenticated) {
        action();
    } else {
        Swal.fire({
            title: 'Access Denied',
            text: 'You must log in to perform this action.',
            icon: 'warning',
            confirmButtonText: 'OK'
        });
    }
};


