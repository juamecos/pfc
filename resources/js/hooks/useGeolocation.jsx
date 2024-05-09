// useGeolocation.js
import { useState, useEffect, useCallback } from 'react';

export default function useGeolocation() {
    const [locationData, setLocationData] = useState(() => {
        const savedData = localStorage.getItem('geolocationData');
        return savedData ? JSON.parse(savedData) : null;
    });
    const [error, setError] = useState(null);

    const fetchLocationData = useCallback(() => {
        if (!navigator.geolocation) {
            const errorMessage = 'Geolocation is not supported by this browser.';
            setError(errorMessage);
            localStorage.setItem('geolocationError', errorMessage);
            return;
        }

        navigator.geolocation.getCurrentPosition(async (position) => {
            const { latitude, longitude } = position.coords;
            await reverseGeocode({ latitude, longitude });
        }, (geoError) => {
            const errorMessage = 'Location permission denied. Please enable location services to use this feature.';
            setError(errorMessage);
            localStorage.setItem('geolocationError', geoError.message);
        });
    }, []);

    const reverseGeocode = useCallback(async ({ latitude, longitude }) => {
        const url = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`;

        try {
            const response = await fetch(url);
            const data = await response.json();

            const newLocationDetails = {
                latitude,
                longitude,
                countryCode: data.countryCode || '',
                city: data.locality || ''
            };

            setLocationData(newLocationDetails);
            localStorage.setItem('geolocationData', JSON.stringify(newLocationDetails));
        } catch (fetchError) {
            const errorMessage = 'Error obtaining location: ' + fetchError.message;
            setError(errorMessage);
            localStorage.setItem('geolocationError', fetchError.message);
        }
    }, []);

    return { locationData, error, fetchLocationData, reverseGeocode };
}
