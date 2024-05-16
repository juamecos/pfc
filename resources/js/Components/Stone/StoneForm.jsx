// Components/Stone/StoneForm.jsx
import React, { useState, useEffect, useCallback, useMemo, Suspense } from 'react';
import LabeledTextInput from '@/Components/Forms/LabeledTextInput';
import InputError from '@/Components/Forms/InputError';
import MapLocationInput from '@/Components/Forms/MapLocationInput';
import useGeolocation from '@/hooks/useGeolocation';
import useMapCoordinates from '@/hooks/useMapCoordinates';
import TextAreaInput from '@/Components/Forms/TextAreaInput';
import StoneImageInput from '@/Components/Forms/StoneImageInput';
import ErrorBoundary from '@/ErrorBoundaries/ErrorBoundary';
import Loader from '@/Components/Loader';
import Button from '@/Components/Button';
import { useForm, usePage } from '@inertiajs/react';

export default function StoneForm({ initialData = {} }) {
    const { auth } = usePage().props;
    const { locationData, fetchLocationData } = useGeolocation();
    const initialCenter = useMemo(() => [locationData?.latitude || 51.505, locationData?.longitude || -0.09], [locationData]);
    const { zoom, center, setCenter } = useMapCoordinates(initialCenter);

    // Extract initial data with default values
    const {
        title = '',
        country = '',
        city = '',
        description = '',
        image = '',
        latitude = initialCenter[0],
        longitude = initialCenter[1],
        id,
        user = { id: null }
    } = initialData;

    // If `id` is present (edit mode), check ownership
    const isEdit = Boolean(id);
    const isOwner = auth.user && auth.user.id === user.id;
    const isDisabled = isEdit && !isOwner;


    const { data, errors, setData, post, put } = useForm({
        title,
        country,
        city,
        description,
        image,
        latitude,
        longitude
    });

    useEffect(() => {
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
        }
    }, [locationData, setCenter, setData]);

    const handleTitleChange = useCallback((e) => {
        if (!isDisabled) setData('title', e.target.value);
    }, [isDisabled, setData]);

    const handleLocationChange = useCallback((newLocationData) => {
        if (isDisabled) return;

        const { latitude, longitude, countryCode, city } = newLocationData;
        setCenter([latitude, longitude]);
        setData((prevData) => ({
            ...prevData,
            latitude,
            longitude,
            country: countryCode || prevData.country,
            city: city || prevData.city
        }));
    }, [isDisabled, setCenter, setData]);

    const handleDescriptionChange = useCallback((e) => {
        if (!isDisabled) setData('description', e.target.value);
    }, [isDisabled, setData]);

    const handleImageUpload = useCallback((newImage) => {
        if (!isDisabled) setData('image', newImage);
    }, [isDisabled, setData]);

    const handleSubmit = useCallback((e) => {
        e.preventDefault();
        if (isDisabled) return;

        if (id) {
            put(route('stone.update', id));
        } else {
            post(route('stone.store'));
        }
    }, [post, put, id, isDisabled]);

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
        className: 'mb-12',
        disabled: isDisabled,
        error: errors && errors.title
    }), [data.title, handleTitleChange, isDisabled]);

    const textAreaInputProps = useMemo(() => ({
        id: 'description',
        name: 'description',
        value: data.description,
        onChange: handleDescriptionChange,
        label: 'Description',
        subLabel: 'A short description of the stone (Optional)',
        placeholder: 'Write a description here...',
        rows: 4,
        isFocused: false,
        disabled: isDisabled,
        error: errors && errors.description
    }), [data.description, handleDescriptionChange, isDisabled]);

    return (
        <form onSubmit={handleSubmit}>
            <StoneImageInput
                cloudName="lapisgame"
                uploadPreset="stones_preset"
                folderPath="stones"
                initialImage={image ? image : ''}
                onUpload={handleImageUpload}
                disabled={isDisabled}
                error={errors && errors.image}
            />
            <LabeledTextInput {...labeledTextInputProps} />
            <ErrorBoundary>
                <Suspense fallback={<Loader />}>
                    <MapLocationInput
                        center={center}
                        zoom={zoom}
                        onLocationChange={handleLocationChange}
                        heightProportion="0.4"
                        disabled={isDisabled}
                        errors={errors && errors}
                    />

                </Suspense>
            </ErrorBoundary>
            <TextAreaInput {...textAreaInputProps} />



            {Object.keys(errors).length > 0 && (

                Object.entries(errors).map(([field, message]) => (
                    console.error(errors)
                ))

            )}

            <Button
                type="submit"
                buttonType="green"
                size="md"
                disabled={isDisabled}
                className={`mt-4 ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
                {id ? 'Update Stone' : 'Submit'}
            </Button>
        </form>
    );
}
