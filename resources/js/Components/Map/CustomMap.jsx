import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Rectangle, useMapEvents, Marker } from 'react-leaflet';
import AreaSelector from '@/Components/Map/AreaSelector';
import L from 'leaflet';

const userMarkerIcon = new L.Icon({
    iconUrl: 'https://cdn.jsdelivr.net/gh/pointhi/leaflet-color-markers@master/img/marker-icon-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

const stoneMarkerIcon = new L.Icon({
    iconUrl: 'https://cdn.jsdelivr.net/gh/pointhi/leaflet-color-markers@master/img/marker-icon-green.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});



function calculateDynamicHeightInRem() {
    const pixelsPerRem = 16;
    const minHeightInPixels = window.innerHeight * 0.8;
    return `${minHeightInPixels / pixelsPerRem}rem`;
}

export default function CustomMap({ center, zoom = 1, northEast, southWest, onAreaChange, stones }) {
    const [dynamicHeight, setDynamicHeight] = useState(calculateDynamicHeightInRem());

    useEffect(() => {
        const handleResize = () => {
            setDynamicHeight(calculateDynamicHeightInRem());
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const maxBounds = [
        [85, -179.99], // Top left corner (latitude, longitude)
        [-85, 179.99]  // Bottom right corner (latitude, longitude)
    ];
    return (
        <MapContainer center={center} zoom={zoom} minZoom={2}
            maxZoom={18}
            maxBounds={maxBounds} style={{ height: dynamicHeight, width: '100%', zIndex: '0' }} >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <AreaSelector onAreaChange={onAreaChange} initialNE={northEast} initialSW={southWest} />

            {stones.map((stone) => (
                <Marker
                    key={stone.id}
                    position={[stone.latitude, stone.longitude]}
                    icon={stoneMarkerIcon}
                />
            ))}

            <Marker position={center} icon={userMarkerIcon} />
        </MapContainer>
    );
}


