// Components/Forms/MapLocationInput.jsx
import React, { useState, useEffect, useCallback } from 'react';
import ClickableMarker from '@/Components/Map/ClickableMarker';
import MapBase from '@/Components/Map/MapBase';
import InputLabel from '@/Components/Forms/InputLabel';
import InputError from '@/Components/Forms/InputError';
import useGeolocation from '@/hooks/useGeolocation';


const MapLocationInput = ({
    center,
    zoom = 1,
    heightProportion = '0.4',
    onLocationChange,
    errors
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
        onLocationChange(locationData);
    }, [locationData]);

    const { latitude, longitude, countryCode, city } = locationData;

    return (
        <div className="my-8">
            <InputLabel
                htmlFor="map-location-input"
                label="Map Location"
                subLabel="Double-click or tap to set a new location."
                className="mb-12"
            />
            <input
                id="map-location-input"
                type="hidden"
                aria-labelledby="map-location-input"
                value={position.join(', ')}
                readOnly
            />
            <InputError message={errors.latitude} className="mt-2" />
            <InputError message={errors.longitude} className="mt-2" />
            <p className="font-medium text-sm mt-4 mb-2">Country: {countryCode}</p>
            <p className="font-medium text-sm mb-4">City: {city}</p>
            <p className="font-medium text-sm mb-4">Latitude: {latitude}</p>
            <p className="font-medium text-sm mb-4">Longitude: {longitude}</p>
            <MapBase center={position} zoom={zoom} heightProportion={heightProportion}>
                <ClickableMarker position={position} onPositionChange={updatePosition} />
            </MapBase>
        </div>
    );
};

export default MapLocationInput;
