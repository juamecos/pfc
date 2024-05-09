// Components/Stone/StoneImage.jsx
import React from 'react';

/**
 * Renders the image of a stone with an appropriate alt text.
 *
 * @param {Object} stone - The stone object containing image and title.
 * @returns {JSX.Element} The image component.
 */
export default function StoneImage({ stone }) {
    const { title, image } = stone;
    const altText = title ? `Image of stone titled: ${title}` : 'Stone image';

    return (
        <div className="w-full rounded-md overflow-hidden bg-gray-200">
            <picture>
                <img
                    src={image}
                    alt={altText}
                    className="w-full h-auto object-cover"
                />
            </picture>
        </div>
    );
}
