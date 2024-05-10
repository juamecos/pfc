// resources/js/Components/Tabs/Tabs.jsx

export default function Tabs({ tabs = [], activeTab, onTabChange }) {
    if (!Array.isArray(tabs) || tabs.length === 0) {
        return null;
    }

    return (
        <div className="my-4">
            <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 rounded-lg shadow">
                {tabs.map((tab) => (
                    <li key={tab.value} className="mr-2 cursor-pointer">
                        <a
                            onClick={() => onTabChange(tab.value)}
                            className={`inline-block p-4 rounded-t-lg ${activeTab === tab.value
                                    ? 'text-gray-900 bg-gray-100 border-b-2 border-blue-600'
                                    : 'hover:bg-gray-50'
                                }`}
                        >
                            {tab.label}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
}