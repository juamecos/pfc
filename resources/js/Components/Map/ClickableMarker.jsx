// Components/Map/ClickableMarker.jsx
import React from 'react';
import { Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';

/**
 * Custom icon for the user's marker.
 */
const userMarkerIcon = new L.Icon({
    iconUrl: 'https://cdn.jsdelivr.net/gh/pointhi/leaflet-color-markers@master/img/marker-icon-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

/**
 * Clickable marker component to set the position on double-click.
 *
 * @param {Object} props - Component properties.
 * @param {number[]} props.position - The current marker position [latitude, longitude].
 * @param {Function} props.onPositionChange - Callback function for when the position changes.
 * @returns {JSX.Element} The clickable marker component.
 */
export default function ClickableMarker({ position, onPositionChange }) {
    useMapEvents({
        dblclick(e) {
            const newPosition = [e.latlng.lat, e.latlng.lng];
            if (!isNaN(newPosition[0]) && !isNaN(newPosition[1])) {
                onPositionChange(newPosition);
            }
        }
    });

    return <Marker position={position} icon={userMarkerIcon} />;
}
