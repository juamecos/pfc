// Discover.js
import React, { useCallback, useEffect, useRef } from 'react';
import { usePage, Head } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';
import CustomMap from '@/Components/Map/CustomMap';
import useGeolocation from '@/hooks/useGeolocation';
import inertiaManualVisit from '@/lib/inertiaManualVisit';
import useMapCoordinates from '@/hooks/useMapCoordinates';
import Icon from '@/Components/Icon';
import { eyeOutline } from 'ionicons/icons';
import FoundButton from '@/Components/FoundButton';


export default function Discover() {
    const { stones } = usePage().props;
    const { locationData, fetchLocationData } = useGeolocation();
    const initialCenter = [locationData?.latitude || 51.505, locationData?.longitude || -0.09];

    const { center, setCenter, zoom, northEast, southWest, handleAreaChange } = useMapCoordinates(initialCenter);

    useEffect(() => {
        fetchLocationData();
    }, []);

    useEffect(() => {
        if (locationData?.latitude && locationData?.longitude) {
            setCenter([locationData.latitude, locationData.longitude]);
        }
    }, [locationData]);

    const debounceRef = useRef(null);

    const handleAreaUpdate = useCallback((newNE, newSW) => {
        if (debounceRef.current) {
            clearTimeout(debounceRef.current);
        }
        debounceRef.current = setTimeout(() => {
            handleAreaChange(newNE, newSW);
            inertiaManualVisit('/discover', 'get', {
                northEast: newNE,
                southWest: newSW
            });
        }, 1000); // Debounce time is set to 1 second
    }, [handleAreaChange]);

    return (
        <GuestLayout>
            <Head title="Discover Stones" />
            <div className="container mx-auto mt-3 bg-white text-center">
                <h1 className="text-4xl font-bold mb-4">Discover Stones</h1>
                <div className="relative flex-grow overflow-hidden">
                    <CustomMap
                        center={center}
                        zoom={zoom}
                        northEast={northEast}
                        southWest={southWest}
                        onAreaChange={handleAreaUpdate}
                        stones={stones}
                    />
                    <FoundButton />
                </div>
            </div>
        </GuestLayout>
    );
}
