import {useState, useEffect} from 'react'

export default function useGeolocation() {
    const [locationData, setLocationData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const savedData = localStorage.getItem('geolocationData');

        const getGeoLocationDetails = async () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(async (position) => {
                    const { latitude, longitude } = position.coords;
                    const apiKey = import.meta.env.VITE_REACT_APP_BIG_DATA_CLOUD_API_KEY; // Modificado aquí
                    const url = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en&key=${apiKey}`;
                    
                    try {
                        const response = await fetch(url);
                        const data = await response.json();
                        
                        const newLocationDetails = {
                            latitude,
                            longitude,
                            country: data.countryName,
                            city: data.city
                        };
                        
                        // Compare with existing data
                        if (savedData) {
                            const existingData = JSON.parse(savedData);
                            if (existingData.country === newLocationDetails.country && existingData.city === newLocationDetails.city) {
                                // If country and city are the same, do not update
                                return;
                            }
                        }
                        
                        // Update local state and localStorage if different
                        setLocationData(newLocationDetails);
                        localStorage.setItem('geolocationData', JSON.stringify(newLocationDetails));
                    } catch (fetchError) {
                        const errorMessage = 'Error obtaining location: ' + fetchError.message;
                        setError(errorMessage);
                        localStorage.setItem('geolocationError', errorMessage);
                    }
                }, (geoError) => {
                    const errorMessage = 'Error obtaining location: ' + geoError.message;
                    setError(errorMessage);
                    localStorage.setItem('geolocationError', errorMessage);
                });
            } else {
                const errorMessage = 'Geolocation is not supported by this browser.';
                setError(errorMessage);
                localStorage.setItem('geolocationError', errorMessage);
            }
        };

        getGeoLocationDetails();
    }, []);

    return { locationData, error };
}
