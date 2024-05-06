import { router } from '@inertiajs/react';

export default function inertiaManualVisit(url, method = 'get', data = {}, preserveState = true) {
    router.visit(url, {
        method,
        data,
        preserveState,
    });
}
