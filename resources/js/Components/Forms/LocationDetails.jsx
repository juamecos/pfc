import React from 'react';

/**
 * Component to display geolocation details.
 *
 * @param {Object} props - Component properties.
 * @param {string} [props.country=''] - Country name.
 * @param {string} [props.city=''] - City name.
 * @param {number} [props.latitude] - Latitude value.
 * @param {number} [props.longitude] - Longitude value.
 * @returns {JSX.Element} - The location details component.
 */
const LocationDetails = ({ country = '', city = '', latitude, longitude }) => {
    return (
        <div className="mb-8">
            <p className="font-medium text-sm mt-4 mb-2">Country: {country}</p>
            <p className="font-medium text-sm mb-4">City: {city}</p>
            <p className="font-medium text-sm mb-4">Latitude: {latitude}</p>
            <p className="font-medium text-sm mb-4">Longitude: {longitude}</p>
        </div>
    );
};

export default LocationDetails;
