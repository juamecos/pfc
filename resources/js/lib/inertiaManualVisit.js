import { router } from '@inertiajs/react';

export default function inertiaManualVisit(url, method = 'get', data = {}, preserveState = true, onSuccess = () => { }, onError = () => { }, onFinished = () => { }) {
    router.visit(url, {
        method,
        data,
        preserveState,
        onSuccess,
        onError,
        onFinish: onFinished  // Execute after navigation is complete
    });
}
