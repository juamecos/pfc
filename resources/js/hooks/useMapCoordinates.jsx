// useMapCoordinates.js
import { useState, useEffect } from 'react';

export default function useMapCoordinates(initialCenter = [51.505, -0.09], initialZoom = 13, initialOffset = 0.1) {
    const [center, setCenter] = useState(initialCenter);
    const [zoom] = useState(initialZoom);

    const initialNorthEast = { latitude: initialCenter[0] + initialOffset, longitude: initialCenter[1] + initialOffset };
    const initialSouthWest = { latitude: initialCenter[0] - initialOffset, longitude: initialCenter[1] - initialOffset };

    const [northEast, setNorthEast] = useState(initialNorthEast);
    const [southWest, setSouthWest] = useState(initialSouthWest);

    const setNewArea = (newCenter) => {
        setCenter(newCenter);
        setNorthEast({ latitude: newCenter[0] + initialOffset, longitude: newCenter[1] + initialOffset });
        setSouthWest({ latitude: newCenter[0] - initialOffset, longitude: newCenter[1] - initialOffset });
    };

    const handleAreaChange = (newNE, newSW) => {
        setNorthEast(newNE);
        setSouthWest(newSW);
    };

    return {
        center,
        setCenter: setNewArea,
        zoom,
        northEast,
        southWest,
        handleAreaChange
    };
}
