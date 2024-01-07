import React, {useEffect, useState} from 'react';
import flatpickr from 'flatpickr';
import axios from 'axios'; // Import Axios
import {
    Button,
    Input,
    Option,
    Popover,
    PopoverContent,
    PopoverHandler,
    Select,
    Typography,
} from '@material-tailwind/react';
import countriesData from '../countries+states+cities.json';
import {MinusIcon, PlusIcon} from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';
import ProductCard from './ProductCard';
import {ProductCardHorizontal} from './ProductCardHorizontal';

export default function FilterHotelData() {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [selectedCountry, setSelectedCountry] = useState('');
    const [travelersCount, setTravelersCount] = useState(1);
    const [roomsCount, setRoomsCount] = useState(1);
    const [appliedFilters, setAppliedFilters] = useState([]);
    const [filterData, setFilterData] = useState([]);
    const [isFilterButtonClicked, setIsFilterButtonClicked] = useState(false);

    useEffect(() => {
        const currentDate = new Date();

        const datepicker = flatpickr('#datePicker', {
            mode: 'range',
            dateFormat: 'd/m/Y',
            minDate: currentDate,
            onClose: (selectedDates) => {
                if (selectedDates.length === 2) {
                    setStartDate(selectedDates[0]);
                    setEndDate(selectedDates[1]);
                }
            },
        });

        return () => {
            datepicker.destroy();
        };
    }, []);

    const handleCountryChange = (selectedValue) => {
        setSelectedCountry(selectedValue);
    };

    const handleTravelersIncrement = () => {
        if (travelersCount < 8) {
            setTravelersCount((prevCount) => prevCount + 1);
        } else {
            toast.error('Maximum travelers count reached!');
        }
    };

    const handleTravelersDecrement = () => {
        if (travelersCount > 1) {
            setTravelersCount((prevCount) => prevCount - 1);
        }
    };

    const handleRoomsIncrement = () => {
        if (roomsCount < 5) {
            setRoomsCount((prevCount) => prevCount + 1);
        } else {
            toast.error('Maximum rooms count reached!');
        }
    };

    const handleRoomsDecrement = () => {
        if (roomsCount > 1) {
            setRoomsCount((prevCount) => prevCount - 1);
        }
    };

    useEffect(() => {
        console.log('Filter Data:', filterData);
    }, [filterData]);

    const handleSearch = async () => {
        const filters = [];
        if (selectedCountry) filters.push(selectedCountry);
        let formattedStartDate = '';
        let formattedEndDate = '';
        if (startDate && endDate) {
            const options = {day: '2-digit', month: '2-digit', year: 'numeric'};
            formattedStartDate = startDate.toLocaleDateString('en-US', options);
            formattedEndDate = endDate.toLocaleDateString('en-US', options);
            filters.push(`${formattedStartDate} - ${formattedEndDate}`);
        }

        if (travelersCount) filters.push(`${travelersCount} Travelers`);
        if (roomsCount) filters.push(`${roomsCount} Rooms`);

        setAppliedFilters(filters);

        try {
            const response = await axios.post('http://localhost:5000/getHotelsByFilter', {
                country: selectedCountry,
                startDate: formattedStartDate,
                endDate: formattedEndDate,
                travelersCount: travelersCount,
            });

            setFilterData(response.data);
            setIsFilterButtonClicked(true);
        } catch (error) {
            console.error('Error during Axios request:', error);
            toast.error("Please select a country!");
        }
    };


    return (
        <div>
            <div className="container mx-auto my-6 ">
                <div className="grid grid-cols-4 gap-4">
                    <Select
                        className="w-full"
                        variant="outlined"
                        value={selectedCountry}
                        onChange={(e) => handleCountryChange(e)}
                        label="Choose a country"
                        placeholder="Choose a country"
                    >
                        {countriesData.map((country) => (
                            <Option key={country?.id} value={country?.name}>
                                {country?.name}
                            </Option>
                        ))}
                    </Select>
                    <Input
                        variant={'outlined'}
                        label="Select a Date"
                        id="datePicker"
                        className="w-full"
                        placeholder="Tarih Aralığı"
                        color="blue-gray"
                    />
                    <Popover placement="bottom">
                        <PopoverHandler>
                            <Button variant="outlined" color="blue-gray" className="text-start">
                                Travellers and Room Details
                            </Button>
                        </PopoverHandler>
                        <PopoverContent className="w-96">
                            <Typography variant="h5" color="blue-gray" className="mb-6">
                                Add Travellers and Room Details
                            </Typography>
                            <div className="flex flex-col gap-4">
                                <div className="flex justify-between items-center">
                                    <Typography variant="h5" color="blue-gray">
                                        Travellers:
                                    </Typography>
                                    <div className="flex items-center gap-2">
                                        <Button
                                            onClick={handleTravelersIncrement}
                                            color="blue-gray"
                                            variant="outlined"
                                            ripple="light"
                                            size="sm"
                                            className="rounded-full px-2 py-2"
                                        >
                                            <PlusIcon className="h-5 w-5 p-0 m-0"/>
                                        </Button>
                                        <Typography variant="h5" color="blue-gray">
                                            {travelersCount}
                                        </Typography>
                                        <Button
                                            onClick={handleTravelersDecrement}
                                            color="blue-gray"
                                            variant="outlined"
                                            ripple="light"
                                            size="sm"
                                            className="rounded-full px-2 py-2"
                                        >
                                            <MinusIcon className="h-5 w-5 p-0 m-0"/>
                                        </Button>
                                    </div>
                                </div>
                                <hr/>
                                <div className="flex justify-between items-center">
                                    <Typography variant="h5" color="blue-gray">
                                        Rooms:
                                    </Typography>
                                    <div className="flex items-center gap-2">
                                        <Button
                                            onClick={handleRoomsIncrement}
                                            color="blue-gray"
                                            variant="outlined"
                                            ripple="light"
                                            size="sm"
                                            className="rounded-full px-2 py-2"
                                        >
                                            <PlusIcon className="h-5 w-5 p-0 m-0"/>
                                        </Button>
                                        <Typography variant="h5" color="blue-gray">
                                            {roomsCount}
                                        </Typography>
                                        <Button
                                            onClick={handleRoomsDecrement}
                                            color="blue-gray"
                                            variant="outlined"
                                            ripple="light"
                                            size="sm"
                                            className="rounded-full px-2 py-2"
                                        >
                                            <MinusIcon className="h-5 w-5 p-0 m-0"/>
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </PopoverContent>
                    </Popover>
                    <Button onClick={handleSearch} color="teal" ripple="light" variant="gradient" className="w-full">
                        Filter
                    </Button>
                </div>
                {appliedFilters.length > 0 && (
                    <div className="flex items-center flex-row gap-1">
                        <Typography variant="h6" color="blue-gray">
                            Filters:
                        </Typography>
                        <div className="flex gap-1">
                            {appliedFilters.map((filter, index) => (
                                <Typography variant="paragraph" color="blue-gray" key={index}>
                                    {filter}
                                </Typography>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Display filterData values if filter button is clicked else show ProductCard */}
            {isFilterButtonClicked ? (
                filterData.hotels.length > 0 ? (
                    <ProductCardHorizontal data={filterData.hotels}/>
                ) : (
                    <div className="container mx-auto my-6">
                        <Typography variant="h6" color="blue-gray">
                            No hotels found for the selected filters.
                        </Typography>
                    </div>
                )
            ) : (
                <ProductCard/>
            )}
        </div>
    );
}
