import React, { useState } from 'react';
import { Select, Option } from '@material-tailwind/react';

export default function CitySelect({ data, variant = 'standard', customClass }) {
    const [selectedCountry, setSelectedCountry] = useState('');
    const [selectedCity, setSelectedCity] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');

    const handleCountryChange = (selectedValue) => {
        setSelectedCountry(selectedValue);
        setSelectedCity('');
        setSelectedDistrict('');
    };

    const handleCityChange = (selectedValue) => {
        setSelectedCity(selectedValue);
        setSelectedDistrict(''); // Reset district when city changes
    };

    const handleDistrictChange = (selectedValue) => {
        setSelectedDistrict(selectedValue);
    };

    return (
        <div className={customClass ? customClass : 'flex flex-col gap-2'}>
            {/* name of country */}
            <Select
                className="w-full"
                variant={variant}
                value={selectedCountry}
                onChange={(e) => handleCountryChange(e)}
                label="Choose a country"
            >
                {data.map((country) => (
                    <Option key={country?.id} value={country?.name}>
                        {country?.name}
                    </Option>
                ))}
            </Select>

            {/* city name */}
            <Select
                className="w-full"
                variant={variant}
                value={selectedCity}
                onChange={(e) => handleCityChange(e)}
                label="Choose a state"
                disabled={!selectedCountry}
            >
                {selectedCountry &&
                    data
                        .find((country) => country?.name === selectedCountry)
                        ?.states.map((state) => (
                        <Option key={state?.id} value={state?.name}>
                            {state?.name}
                        </Option>
                    ))}
            </Select>

            {/* district name */}
            <Select
                className="w-full"
                variant={variant}
                value={selectedDistrict}
                onChange={(e) => handleDistrictChange(e)}
                label="Choose a city"
                disabled={!selectedCity}
            >
                {selectedCity &&
                    data
                        .find((country) => country?.name === selectedCountry)
                        ?.states.find((state) => state?.name === selectedCity)
                        ?.cities.map((city) => (
                        <Option key={city?.id} value={city?.name}>
                            {city?.name}
                        </Option>
                    ))}
            </Select>
        </div>
    );
}
