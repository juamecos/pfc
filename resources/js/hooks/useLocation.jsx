import { useState, useEffect, useCallback, useMemo } from 'react';
import useGeolocation from './useGeolocation';

/**
 * Custom hook to manage location and area selection with country and city info.
 *
 * @param {Function} onLocationChange - Callback when the location changes.
 * @param {Function} onAreaChange - Callback when the area bounds change.
 * @param {number[]} initialCenter - Initial center [latitude, longitude] of the map.
 * @param {Object} initialNorthEast - Initial north-east boundary { latitude, longitude }.
 * @param {Object} initialSouthWest - Initial south-west boundary { latitude, longitude }.
 * @returns {{
 *   position: number[],
 *   updatePosition: (newPosition: number[]) => void,
 *   country: string,
 *   city: string
 * }} The current position, update function, country and city.
 */
export default function useLocation(onLocationChange, onAreaChange, initialCenter, initialNorthEast, initialSouthWest) {
    // Memoize the initial bounds to avoid recomputing on each render
    const initialBounds = useMemo(() => ({
        center: initialCenter,
        northEast: initialNorthEast,
        southWest: initialSouthWest
    }), [initialCenter, initialNorthEast, initialSouthWest]);

    // Initialize states for the position, country, and city
    const [position, setPosition] = useState(initialBounds.center);
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');

    // Retrieve geolocation data and reverse geocoding function
    const { locationData, reverseGeocode } = useGeolocation();

    /**
     * Updates the current position and triggers location/area change callbacks.
     *
     * @param {number[]} newPosition - New position [latitude, longitude].
     */
    const updatePosition = useCallback((newPosition) => {
        setPosition(newPosition);

        const [lat, lng] = newPosition;
        const newNorthEast = { latitude: lat + 0.1, longitude: lng + 0.1 };
        const newSouthWest = { latitude: lat - 0.1, longitude: lng - 0.1 };

        onAreaChange(newNorthEast, newSouthWest);
        onLocationChange(newPosition);
        reverseGeocode({ latitude: lat, longitude: lng });
    }, [onAreaChange, onLocationChange, reverseGeocode]);

    // Update position and location info based on new geolocation data
    useEffect(() => {
        if (locationData?.latitude && locationData?.longitude) {
            const { latitude, longitude, countryCode, city } = locationData;
            const newPosition = [latitude, longitude];

            setPosition(newPosition);
            setCountry(countryCode || '');
            setCity(city || '');
            onLocationChange(newPosition);
        }
    }, [locationData, onLocationChange]);

    return { position, updatePosition, country, city };
}


