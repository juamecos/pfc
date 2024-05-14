import React, { useState, useEffect, useCallback, useMemo, Suspense } from 'react';

import MapLocationInput from '@/Components/Forms/MapLocationInput';
import useGeolocation from '@/hooks/useGeolocation';
import useMapCoordinates from '@/hooks/useMapCoordinates';
import ErrorBoundary from '@/ErrorBoundaries/ErrorBoundary';
import Loader from '@/Components/Loader';
import Button from '@/Components/Button';
import { useForm, usePage } from '@inertiajs/react';
import Swal from 'sweetalert2';


export default function FoundForm({ initialData = {} }) {
    const { auth, stone } = usePage().props;
    const { locationData, fetchLocationData } = useGeolocation();
    const initialCenter = useMemo(() => [locationData?.latitude || 51.505, locationData?.longitude || -0.09], [locationData]);
    const { zoom, center, setCenter } = useMapCoordinates(initialCenter);
    const { isDisabled, setIsDisabled } = useState(true)


    const {
        user_id = auth.user.id,
        stone_id = stone.id,
        latitude = '',
        longitude = '',
        country = '',
        city = '',
    } = initialData;

    // Validación de datos con especificaciones
    const validateField = useCallback((value, test, message) => {
        if (!test(value)) {
            Swal.fire({
                title: 'Validation Error',
                text: message,
                icon: 'error',
            });
            return false;
        }
        return true;
    }, []);

    // Función que integra todas las validaciones
    const validateFormData = useCallback((data) => {
        const { latitude, longitude, country, city } = data;

        const validations = [
            { value: latitude, test: val => val >= -85 && val <= 85, message: "Invalid latitude. Latitude must be between -85 and 85." },
            { value: longitude, test: val => val >= -175 && val <= 175, message: "Invalid longitud. Longitude must be between -175 and 175." },
            { value: country, test: val => /^[A-Z]{2}$/.test(val), message: "Invalid country. Country must be a valid two-letter ISO Alpha-2 code." },
            { value: city, test: val => typeof val === 'string' && val.trim() !== '', message: "Invalid city name." },
        ];

        for (let validation of validations) {
            if (!validateField(validation.value, validation.test, validation.message)) {
                return false;
            }
        }

        return true;
    }, [validateField]);



    const { data, errors, setData, post } = useForm({
        user_id: auth.user.id,
        stone_id: stone.id,
        stone_id,
        country,
        city,
        latitude,
        longitude
    });

    useEffect(() => {
        fetchLocationData();
    }, [fetchLocationData]);
    console.log('useForm', data);

    useEffect(() => {
        const validateAndSetData = () => {
            const { latitude, longitude, country, city } = locationData;

            // Check that all necessary data is present
            if (!latitude || !longitude || !country || !city) {
                console.log("Invalid data received, cannot update map location.");
                return; // Exit if any data is missing
            }

            // Define your validation logic here
            const validations = [
                { value: latitude, test: val => val >= -85 && val <= 85, message: "Latitude must be between -85 and 85." },
                { value: longitude, test: val => val >= -175 && val <= 175, message: "Longitude must be between -175 and 175." },
                { value: country, test: val => /^[A-Z]{2}$/.test(val), message: "Country code must be a valid two-letter ISO Alpha-2 code." },
                { value: city, test: val => typeof val === 'string' && val.trim() !== '', message: "Please provide a valid city name." },
            ];

            // Perform validations
            for (let validation of validations) {
                if (!validateField(validation.value, validation.test, validation.message)) {
                    return; // Stop updating state if validation fails
                }
            }

            // If all data is valid, update the state
            setCenter([latitude, longitude]);
            setData(prevData => ({
                ...prevData,
                latitude,
                longitude,
                country,
                city
            }));
        };

        if (locationData) {
            validateAndSetData();
        }
    }, [locationData]);



    const handleLocationChange = useCallback((newLocationData) => {
        if (isDisabled) return;

        // Destructura los valores directamente desde newLocationData
        const { latitude, longitude, countryCode: country, city } = newLocationData;

        // Crea un objeto temporal de datos para validar
        const dataToValidate = { latitude, longitude, country, city };

        // Valida los datos antes de proceder a actualizar el estado
        if (!validateFormData(dataToValidate)) {
            return; // Detiene la actualización si la validación falla
        }

        // Procede con la actualización del estado solo si la validación es exitosa
        setCenter([latitude, longitude]);
        setData(prevData => ({
            ...prevData,
            latitude,
            longitude,
            country,
            city
        }));
    }, [isDisabled, setCenter, setData, validateFormData]);



    const handleSubmit = useCallback((e) => {
        e.preventDefault();
        if (isDisabled) return;
        // Check if all necessary fields are filled
        const { latitude, longitude, country, city } = data;
        if (!latitude || !longitude || !country || !city) {
            // Display error Swal if fields are missing
            Swal.fire({
                title: 'Error',
                text: 'Please fill all required fields.',
                icon: 'error',
            });
        } else {
            // Submit the data
            post(route('found.store'), data);
        }
    }, [post, isDisabled]);



    return (
        <form onSubmit={handleSubmit}>


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





            <Button
                type="submit"
                buttonType="green"
                size="md"
                disabled={isDisabled}
                className={`mt-4 ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
                Send Location
            </Button>
        </form>
    );
}