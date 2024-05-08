// Components/Forms/MapLocationInput.jsx
import React, { useState, useEffect, useCallback } from 'react';
import ClickableMarker from '@/Components/Map/ClickableMarker';
import MapBase from '@/Components/Map/MapBase';
import InputLabel from '@/Components/Forms/InputLabel';
import useGeolocation from '@/hooks/useGeolocation';

const MapLocationInput = ({
    center,
    zoom = 1,
    heightProportion = '0.4',
    onLocationChange
}) => {
    const [position, setPosition] = useState(center);


    const { locationData, error, fetchLocationData, reverseGeocode } = useGeolocation();


    const updatePosition = useCallback((newPosition) => {
        setPosition(newPosition);

        const [lat, lng] = newPosition;

        reverseGeocode({ latitude: lat, longitude: lng });
    }, [reverseGeocode]);



    useEffect(() => {
        fetchLocationData();

    }, []);

    useEffect(() => {
        console.log(locationData);
        onLocationChange(locationData);
    }, [locationData]);

    return (
        <div className="mb-8">
            <InputLabel
                htmlFor="map-location-input"
                label="Map Location"
                subLabel="Double-click or tap to set a new location."
                className="mb-12"
            />
            <p className="font-medium text-sm mt-4 mb-2">Country: {locationData.countryCode}</p>
            <p className="font-medium text-sm mb-4">City: {locationData.city}</p>
            <p className="font-medium text-sm mb-4">Latitude: {locationData.latitude}</p>
            <p className="font-medium text-sm mb-4">Longitude: {locationData.longitude}</p>
            <MapBase center={position} zoom={zoom} heightProportion={heightProportion}>
                <ClickableMarker position={position} onPositionChange={updatePosition} />
            </MapBase>
        </div>
    );
};

export default MapLocationInput;
