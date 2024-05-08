// StoneForm.js
import React, { useState, useEffect, useCallback, useMemo, Suspense } from 'react';
import LabeledTextInput from '@/Components/Forms/LabeledTextInput';
import MapLocationInput from '@/Components/Forms/MapLocationInput';
import useGeolocation from '@/hooks/useGeolocation';
import useMapCoordinates from '@/hooks/useMapCoordinates';
import TextAreaInput from '@/Components/Forms/TextAreaInput';
import StoneImageInput from '@/Components/Forms/StoneImageInput';
import ErrorBoundary from '@/ErrorBoundaries/ErrorBoundary';
import Loader from '@/Components/Loader';
import { useForm } from '@inertiajs/react';

export default function StoneForm() {
    const { locationData, fetchLocationData } = useGeolocation();
    const initialCenter = useMemo(() => [locationData?.latitude || 51.505, locationData?.longitude || -0.09], [locationData]);

    const { zoom, center, setCenter } = useMapCoordinates(initialCenter);


    const { data, errors, setData, post } = useForm({
        title: '',
        country: '',
        city: '',
        description: '',
        image: '',
        latitude: initialCenter[0],
        longitude: initialCenter[1]
    });

    useEffect(() => {
        console.log("Fetching geolocation data");
        fetchLocationData();
    }, [fetchLocationData]);

    useEffect(() => {

        if (locationData?.latitude && locationData?.longitude && locationData?.country && locationData?.city) {
            setCenter([locationData.latitude, locationData.longitude]);
            setData((prevData) => ({
                ...prevData,
                latitude: locationData.latitude,
                longitude: locationData.longitude,
                country: locationData.country || '',
                city: locationData.city || ''
            }));

            console.log("From useEffect StoneForm", data);
        }
    }, [locationData, setCenter, setData]);

    const handleTitleChange = useCallback((e) => setData('title', e.target.value), [setData]);









    const handleLocationChange = useCallback((newLocationData) => {
        const { latitude, longitude, countryCode, city } = newLocationData;
        console.log('Countricode desde handleLocationChange StoneForm', countryCode);
        console.log("From handleLocationChange StoneForm", latitude, longitude, countryCode, city);
        setCenter([latitude, longitude]);
        setData((prevData) => ({
            ...prevData,
            latitude,
            longitude,
            country: countryCode || prevData.country,
            city: city || prevData.city
        }));
    }, [setCenter, setData]);
















    const handleDescriptionChange = useCallback((e) => setData('description', e.target.value), [setData]);
    const handleImageUpload = useCallback((newImage) => setData('image', newImage), [setData]);

    const handleSubmit = useCallback((e) => {
        e.preventDefault();
        post(route('stone.store'));
    }, [post]);

    const labeledTextInputProps = useMemo(() => ({
        htmlFor: 'title',
        label: 'Title',
        subLabel: 'The name of the stone',
        id: 'title',
        name: 'title',
        value: data.title,
        onChange: handleTitleChange,
        placeholder: 'Enter title here',
        isFocused: true,
        className: 'mb-12'
    }), [data.title, handleTitleChange]);

    const textAreaInputProps = useMemo(() => ({
        id: 'description',
        name: 'description',
        value: data.description,
        onChange: handleDescriptionChange,
        label: 'Description',
        subLabel: 'A short description of the stone (Optional)',
        placeholder: 'Write a description here...',
        rows: 4,
        isFocused: false
    }), [data.description, handleDescriptionChange]);

    return (
        <form onSubmit={handleSubmit}>
            <LabeledTextInput {...labeledTextInputProps} />
            <ErrorBoundary>
                <Suspense fallback={<Loader />}>
                    <MapLocationInput
                        center={center}
                        zoom={zoom}
                        onLocationChange={handleLocationChange}
                        heightProportion="0.4"
                    />
                </Suspense>
            </ErrorBoundary>
            <TextAreaInput {...textAreaInputProps} />

            <StoneImageInput
                cloudName="lapisgame"
                uploadPreset="stones_preset"
                folderPath="stones"
                onUpload={handleImageUpload}
            />

            {Object.keys(errors).length > 0 && (
                <ul className="text-red-500 list-disc list-inside">
                    {Object.entries(errors).map(([field, message]) => (
                        <li key={field}>{`${field}: ${message}`}</li>
                    ))}
                </ul>
            )}

            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                Submit
            </button>
        </form>
    );
}
