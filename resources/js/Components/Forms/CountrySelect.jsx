import React, { useEffect, useState } from 'react';
import countries from 'i18n-iso-countries';





const CountrySelect = ({ data, setData, errors, value, onChange }) => {
    const countryList = countries.getAlpha2Codes(); // Solo obtenemos los códigos alpha-2
    const [selectedCountry, setSelectedCountry] = useState('');

    useEffect(() => {
        if (data.country) {
            setSelectedCountry(data.country);
        }
    }, [data.country]);

    return (
        <div>
            <select
                id="country"
                className="mt-1 block w-full"
                value={value}
                onChange={onChange}
                autoComplete="country-name"
            >

                {Object.entries(countryList).map(([code, name]) => (
                    <option key={code} value={code}>
                        {code}
                    </option>
                ))}
            </select>
            {errors.country && <InputError message={errors.country} />}
        </div>
    );
};

export default CountrySelect;
