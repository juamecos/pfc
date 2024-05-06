import React, { useState, useEffect } from 'react';
import { usePage, Head } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';
import CustomMap from '@/Components/Map/CustomMap';
import useGeolocation from '@/hooks/useGeolocation';
import inertiaManualVisit from '@/lib/inertiaManualVisit';

export default function Discover() {
    const { stones } = usePage().props;
    const { locationData, fetchLocationData } = useGeolocation();

    console.log(stones);

    // Centro del mapa con valores predeterminados
    const initialCenter = [locationData?.latitude || 51.505, locationData?.longitude || -0.09];
    const [center, setCenter] = useState(initialCenter);
    const [zoom] = useState(13);

    // Coordenadas iniciales para los límites del área
    const initialNorthEast = { latitude: center[0] + 0.1, longitude: center[1] + 0.1 };
    const initialSouthWest = { latitude: center[0] - 0.1, longitude: center[1] - 0.1 };
    const [northEast, setNorthEast] = useState(initialNorthEast);
    const [southWest, setSouthWest] = useState(initialSouthWest);

    const handleAreaChange = (northEast, southWest) => {
        setNorthEast(northEast);
        setSouthWest(southWest);

        inertiaManualVisit('/discover', 'get', {
            northEast,
            southWest
        });
    };

    useEffect(() => {
        fetchLocationData();
    }, [fetchLocationData]);

    useEffect(() => {
        if (locationData?.latitude && locationData?.longitude) {
            setCenter([locationData.latitude, locationData.longitude]);
            setNorthEast({ latitude: locationData.latitude + 0.1, longitude: locationData.longitude + 0.1 });
            setSouthWest({ latitude: locationData.latitude - 0.1, longitude: locationData.longitude - 0.1 });
        }
    }, [locationData]);

    return (
        <GuestLayout>
            <Head title="Discover Stones" />
            <div className="container mx-auto mt-3 bg-white text-center">
                <h1 className="text-4xl font-bold mb-4">Discover Stones</h1>
                <div className="flex-grow">
                    <CustomMap
                        center={center}
                        zoom={zoom}
                        northEast={northEast}
                        southWest={southWest}
                        onAreaChange={handleAreaChange}
                        stones={stones}
                    />
                </div>
            </div>

        </GuestLayout>
    );
}
