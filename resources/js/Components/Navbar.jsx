import React, { useState } from 'react';

export default function Navbar() {
    // State to track the active link
    const [activeLink, setActiveLink] = useState('Home');

    // Function to update the active link
    const handleSetActiveLink = (linkName) => {
        setActiveLink(linkName);
    };

    // Helper function to generate link classes based on activity
    const getLinkClass = (linkName) => {
        const baseClass = "block py-2 px-3 md:p-0 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700";
        if (activeLink === linkName) {
            return `${baseClass} text-blue-700 md:text-blue-700`;
        }
        return `${baseClass} text-gray-900`;
    };

    return (
        <nav>
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto px-4 py-6">
                <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse" onClick={() => handleSetActiveLink('Home')}>
                    <img src="images/logo.png" className="h-8" alt="Lapisgame Logo" />
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">LapisGame</span>
                </a>

                <div className="w-full md:block md:w-auto" id="navbar-solid-bg">
                    <ul className="flex hidden text-lg font-medium mt-4 rounded-lg bg-gray-50 md:flex md:flex-row md:mt-0 md:space-x-8 rtl:md:space-x-reverse md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-transparent dark:border-gray-700">
                        <li>
                            <a href="#" className={getLinkClass('Home')} onClick={() => handleSetActiveLink('Home')}>Home</a>
                        </li>
                        <li>
                            <a href="#" className={getLinkClass('Services')} onClick={() => handleSetActiveLink('Services')}>Discover</a>
                        </li>
                        <li>
                            <a href="#" className={getLinkClass('Pricing')} onClick={() => handleSetActiveLink('Pricing')}>Add</a>
                        </li>
                        <li>
                            <a href="#" className={getLinkClass('Contact')} onClick={() => handleSetActiveLink('Contact')}>Settings</a>
                        </li>
                        <li>
                            <a href="#" className={getLinkClass('Contact')} onClick={() => handleSetActiveLink('Contact')}>Profile</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};



