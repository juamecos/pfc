import { useCallback } from 'react';
import { usePage, router } from "@inertiajs/react";
import verifyAuthAndExecute from "@/lib/verifyAuthAndExecute";
import inertiaManualVisit from "@/lib/inertiaManualVisit";
import { useTabContext } from '@/context/TabContext';
import scrollToSection from '@/lib/scrollToSection';

// Hook to manage card actions
const useCardActions = (stone, isAuthenticated) => {
    const { auth } = usePage().props;
    const { id } = stone;
    const { switchTab } = useTabContext();

    const navigateAndSwitchTab = useCallback((tab, elementId) => {
        inertiaManualVisit(
            route('stones.show', { id }),
            'get',
            {},
            true,
            () => console.log(`Navigated to ${tab} details successfully`),
            () => console.log(`Error navigating to ${tab} details`),
            () => {
                switchTab(tab);
                scrollToSection(elementId);
            }
        );
    }, [id, switchTab]);

    const actions = {
        found: () => navigateAndSwitchTab('map', 'map-section'),
        like: () => verifyAuthAndExecute(
            () => router.post(route('likes.toggle', { stone_id: id, user_id: auth.user.id })),
            isAuthenticated
        ),
        comment: () => navigateAndSwitchTab('comments', 'comments-section'),
    };

    return actions;
};

export default useCardActions;
