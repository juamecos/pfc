import { useState, useCallback } from 'react';

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

            const apiKey = import.meta.env.VITE_REACT_APP_BIG_DATA_CLOUD_API_KEY; // Your API key here
            const url = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en&key=${apiKey}`;

            try {
                const response = await fetch(url);
                const data = await response.json();

                const newLocationDetails = {
                    latitude,
                    longitude,
                    countryCode: data.countryCode,
                    city: data.locality
                };

                setLocationData(newLocationDetails);
                localStorage.setItem('geolocationData', JSON.stringify(newLocationDetails));
            } catch (fetchError) {
                setError('Error obtaining location: ' + fetchError.message);
                localStorage.setItem('geolocationError', fetchError.message);
            }
        }, (geoError) => {
            setError('Location permission denied. Please enable location services to use this feature.');
            localStorage.setItem('geolocationError', geoError.message);
        });
    }, []);

    // Return the hook data
    return { locationData, error, fetchLocationData };
};

