// Components/UpButton.jsx
import React from 'react';

/**
 * A button that scrolls the page back to the top.
 */
export default function UpButton() {
    const handleScrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'

        });
    };

    return (
        <div className="fixed inset-x-0 bottom-[13vh] start-[85vw] sm:bottom-[5vh] sm:start-[92vw]" >
            <button className="bg-gray-800 text-white rounded-full w-12 h-12 flex items-center justify-center cursor-pointer z-50" onClick={handleScrollToTop} aria-label="Scroll back to top"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
                </svg>
                <span className="sr-only">Back to top</span>
            </button>
        </div>

    );
}
