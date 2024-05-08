// hooks/useAreaSelector.js
import { useRef, useEffect, useCallback } from 'react';
import { useMapEvents } from 'react-leaflet';

export default function useAreaSelector(onAreaChange, initialNE, initialSW) {
    const boundsRef = useRef([
        [initialNE.latitude, initialNE.longitude],
        [initialSW.latitude, initialSW.longitude]
    ]);

    const updateBounds = useCallback((map) => {
        const newBounds = map.getBounds();
        const northEast = newBounds.getNorthEast();
        const southWest = newBounds.getSouthWest();

        const updatedBounds = [
            [northEast.lat, northEast.lng],
            [southWest.lat, southWest.lng]
        ];

        if (updatedBounds.every(coord => !isNaN(coord[0]) && !isNaN(coord[1])) &&
            JSON.stringify(updatedBounds) !== JSON.stringify(boundsRef.current)) {
            boundsRef.current = updatedBounds;
            onAreaChange(
                { latitude: northEast.lat, longitude: northEast.lng },
                { latitude: southWest.lat, longitude: southWest.lng }
            );
        }
    }, [onAreaChange]);

    useMapEvents({
        dragend(e) {
            updateBounds(e.target);
        },
        zoomend(e) {
            updateBounds(e.target);
        }
    });

    useEffect(() => {
        boundsRef.current = [
            [initialNE.latitude, initialNE.longitude],
            [initialSW.latitude, initialSW.longitude]
        ];
    }, [initialNE, initialSW]);

    return boundsRef.current;
}
