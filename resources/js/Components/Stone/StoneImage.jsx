import React from 'react';

export default function StoneImage({ stone }) {
    const { title, image } = stone;
    return (
        <div className="w-full rounded-md overflow-hidden bg-gray-200">
            <picture>
                <img src={image} alt={`Image of stone titled: ${title}`} className="w-full h-auto object-cover" />
            </picture>
        </div>
    );
}


