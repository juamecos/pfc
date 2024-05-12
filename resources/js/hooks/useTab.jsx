import { useState, useCallback } from 'react';

// Hook to manage tab state
const useTab = (initialTab) => {
    const [activeTab, setActiveTab] = useState(initialTab);

    const switchTab = useCallback((tab) => {
        setActiveTab(tab);
    }, []);

    return { activeTab, switchTab };
};

export default useTab;