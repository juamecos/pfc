// Components/UpButton.jsx
import React from 'react';
import Icon from './Icon';
import { arrowUpOutline } from 'ionicons/icons';

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
        <Icon
            iconName={arrowUpOutline}
            onClick={handleScrollToTop}
            style={{
                position: "fixed",
                right: "3vh",
                bottom: "15vh",
                height: "3rem",
                width: "3rem",
                cursor: "pointer",
                zIndex: "50"
            }}
        />
    );
}
