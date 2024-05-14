import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';

export default function MapBase({ children, center, zoom = 1, minZoom = 2, maxZoom = 16, heightProportion = 0.8 }) {
    const [dynamicHeight, setDynamicHeight] = useState(calculateDynamicHeightInRem(heightProportion));

    useEffect(() => {
        const handleResize = () => {
            setDynamicHeight(calculateDynamicHeightInRem(heightProportion));
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [heightProportion]);

    const maxBounds = [
        [85, -175], // Top left corner (latitude, longitude)
        [-85, 175] // Bottom right corner (latitude, longitude)
    ];

    return (
        <MapContainer
            center={center}
            zoom={zoom}
            minZoom={minZoom}
            maxZoom={maxZoom}
            maxBounds={maxBounds}
            style={{ height: dynamicHeight, width: '100%', zIndex: '0' }}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {children}
        </MapContainer>
    );
}

function calculateDynamicHeightInRem(proportion = 0.8) {
    const pixelsPerRem = 16;
    const minHeightInPixels = window.innerHeight * proportion;
    return `${minHeightInPixels / pixelsPerRem}rem`;
}