// Components/Map/AreaSelector.jsx
import React, { useRef, useEffect, useCallback } from 'react';
import { Rectangle, useMapEvents } from 'react-leaflet';

/**
 * A component to select an area on the map using draggable bounds.
 *
 * @param {Object} props - Component properties.
 * @param {Function} props.onAreaChange - Callback function when the area bounds change.
 * @param {Object} props.initialNE - Initial north-east boundary { latitude, longitude }.
 * @param {Object} props.initialSW - Initial south-west boundary { latitude, longitude }.
 * @returns {JSX.Element} The rectangle area selector.
 */
export default function AreaSelector({ onAreaChange, initialNE, initialSW }) {
    // Ref to store the bounds and avoid unnecessary re-renders
    const boundsRef = useRef([
        [initialNE.latitude, initialNE.longitude],
        [initialSW.latitude, initialSW.longitude]
    ]);

    // Function to update the bounds and call the callback
    const updateBounds = useCallback((map) => {
        const newBounds = map.getBounds();
        const northEast = newBounds.getNorthEast();
        const southWest = newBounds.getSouthWest();

        const updatedBounds = [
            [northEast.lat, northEast.lng],
            [southWest.lat, southWest.lng]
        ];

        // Avoid redundant updates
        if (JSON.stringify(updatedBounds) !== JSON.stringify(boundsRef.current)) {
            boundsRef.current = updatedBounds;
            onAreaChange(
                { latitude: northEast.lat, longitude: northEast.lng },
                { latitude: southWest.lat, longitude: southWest.lng }
            );
        }
    }, [onAreaChange]);

    // Update bounds on map events
    useMapEvents({
        dragend(e) {
            updateBounds(e.target);
        },
        zoomend(e) {
            updateBounds(e.target);
        }
    });

    // Update the ref with the initial bounds if they change
    useEffect(() => {
        boundsRef.current = [
            [initialNE.latitude, initialNE.longitude],
            [initialSW.latitude, initialSW.longitude]
        ];
    }, [initialNE, initialSW]);

    return (
        <Rectangle
            bounds={boundsRef.current}
            pathOptions={{
                color: 'transparent',
                weight: 0,
                opacity: 0,
                fillOpacity: 0
            }}
        />
    );
}
