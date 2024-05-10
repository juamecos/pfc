// resources/js/Utils/inertiaManualVisit.js
import { router } from '@inertiajs/react';

export default function inertiaManualVisit(url, method = 'get', data = {}, preserveState = true, onSuccess = () => { }, onError = () => { }) {
    router.visit(url, {
        method,
        data,
        preserveState,
        onSuccess,
        onError
    });
}
