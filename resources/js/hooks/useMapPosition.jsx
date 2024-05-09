import { useState, useEffect, useRef, useCallback } from 'react';
import useGeolocation from './useGeolocation';

/**
 * Hook to manage the map position and location details.
 *
 * @param {number[]} initialPosition - Initial position [latitude, longitude].
 * @param {Function} onLocationChange - Callback function to handle location changes.
 * @returns {Object} Position state, update function, and location details.
 */
const useMapPosition = (initialPosition, onLocationChange) => {
    const [position, setPosition] = useState(initialPosition);
    const [locationDetails, setLocationDetails] = useState({ country: '', city: '', latitude: null, longitude: null });
    const prevPosition = useRef(initialPosition);
    const { locationData, reverseGeocode } = useGeolocation();

    /**
     * Update the position and trigger the reverse geocoding.
     *
     * @param {number[]} newPosition - New position [latitude, longitude].
     */
    const updatePosition = useCallback((newPosition) => {
        if (newPosition[0] !== prevPosition.current[0] || newPosition[1] !== prevPosition.current[1]) {
            setPosition(newPosition);
            const [lat, lng] = newPosition;
            reverseGeocode({ latitude: lat, longitude: lng });
            onLocationChange({ latitude: lat, longitude: lng });
            prevPosition.current = newPosition;
        }
    }, [onLocationChange, reverseGeocode]);

    useEffect(() => {
        if (locationData?.latitude && locationData?.longitude) {
            const { latitude, longitude, countryCode, city } = locationData;
            const newPosition = [latitude, longitude];

            if (newPosition[0] !== prevPosition.current[0] || newPosition[1] !== prevPosition.current[1]) {
                setPosition(newPosition);
                setLocationDetails({ country: countryCode || '', city: city || '', latitude, longitude });
                onLocationChange({ latitude, longitude });
                prevPosition.current = newPosition;
            }
        }
    }, [locationData, onLocationChange]);

    return { position, updatePosition, locationDetails };
};

export default useMapPosition;
