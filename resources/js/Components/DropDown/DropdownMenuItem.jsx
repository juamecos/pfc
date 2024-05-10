// Components/Dropdown/DropdownMenuItem.jsx
import { Link } from '@inertiajs/react';
import React from 'react';

const DropdownMenuItem = ({ href, children, onClick }) => {
    const handleClick = (event) => {
        event.preventDefault(); // Esto detiene el comportamiento predeterminado del enlace.
        if (onClick) {
            onClick(event); // Llama a la función onClick pasada como prop.
        }
    };

    return (
        <li>
            {href ? (
                <Link href={href} className="block py-2 px-4 hover:bg-gray-100">
                    {children}
                </Link>
            ) : (
                <a href="#" onClick={handleClick} className="block py-2 px-4 hover:bg-gray-100">
                    {children}
                </a>
            )}
        </li>
    );
};

export default DropdownMenuItem;
