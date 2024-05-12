import React, { createContext, useContext } from 'react';
import useTab from '@/hooks/useTab';  // Adjust the path as necessary

const TabContext = createContext(null);

export const TabProvider = ({ initialTab = 'comments', children }) => {
    const { activeTab, switchTab } = useTab(initialTab);

    return (
        <TabContext.Provider value={{ activeTab, switchTab }}>
            {children}
        </TabContext.Provider>
    );
};

export const useTabContext = () => {
    const context = useContext(TabContext);
    if (!context) {
        throw new Error('useTabContext must be used within a TabProvider');
    }
    return context;
};
