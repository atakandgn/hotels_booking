import React, {useEffect, useState} from 'react';
import flatpickr from 'flatpickr';
import axios from 'axios';
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
import {MinusIcon, PlusIcon, TrashIcon} from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';
import ProductCard from './ProductCard';
import {ProductCardHorizontal} from './ProductCardHorizontal';
import {CustomAlert} from "./Alert";

export default function FilterHotelData() {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [selectedCountry, setSelectedCountry] = useState('');
    const [travelersCount, setTravelersCount] = useState(1);
    const [roomsCount, setRoomsCount] = useState(1);
    const [appliedFilters, setAppliedFilters] = useState([]);
    const [filterData, setFilterData] = useState([]);
    const [isFilterRequestSent, setIsFilterRequestSent] = useState(false);
    const [prevFilterParams, setPrevFilterParams] = useState(null);

    const discardFilter = () => {
        // Reset all filters and state variables
        setSelectedCountry('');
        setStartDate(null);
        setEndDate(null);
        setTravelersCount(1);
        setRoomsCount(1);
        setAppliedFilters([]);
        setFilterData([]);
        setIsFilterRequestSent(false);

        // Reinitialize the date picker
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

        // Clear the input field manually
        datepicker.clear();
    };


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
        const currentFilterParams = {
            country: selectedCountry,
            startDate,
            endDate,
            travelersCount,
        };
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
        if (prevFilterParams && JSON.stringify(currentFilterParams) === JSON.stringify(prevFilterParams)) {
            toast.error('Please select different filter criteria.');
        } else {
            try {
                setFilterData([])
                const response = await axios.post(
                    'http://localhost:5000/getHotelsByFilter',
                    {
                        country: selectedCountry,
                        startDate: formattedStartDate,
                        endDate: formattedEndDate,
                        travelersCount: travelersCount,
                    }
                );
                setFilterData(response.data);
                setIsFilterRequestSent(true);
                setPrevFilterParams(currentFilterParams);
            } catch (error) {
                console.error('Error during Axios request:', error);
                toast.error('Please select Country and Date Range');
            }
        }
    };


    return (
        <div>
            <div className="container mx-auto my-6 ">
                <div className="grid xl:grid-cols-4 lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-2 gap-4">
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
                            <Button
                                variant="outlined"
                                color="blue-gray"
                                className="text-start h-10"
                            >
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
                    <div className="flex flex-row gap-2">
                        <Button
                            onClick={handleSearch}
                            color="gray"
                            ripple="light"
                            variant="gradient"
                            className="w-[85%] h-10"
                        >
                            Filter
                        </Button>
                        <div className="flex items-center justify-center w-[15%]">
                            <Button onClick={discardFilter} color="gray" ripple="light" variant="outlined"
                                    className="h-10 w-10 p-0 m-0 flex items-center justify-center">
                                <TrashIcon className="w-6 h-6 p-0 m-0"/>
                            </Button>
                        </div>

                    </div>

                </div>
                {filterData?.hotels && appliedFilters.length > 0 && (
                    <CustomAlert closeable={true} type="gray"
                                 message={`Showing Results: ${appliedFilters.join(', ')}`}/>
                )}

                {isFilterRequestSent ? (
                    <div>
                        {filterData?.hotels ? (
                            <ProductCardHorizontal data={filterData.hotels}/>
                        ) : (
                            <CustomAlert type="yellow" message="No available hotels for the specified criteria."/>
                        )}
                    </div>
                ) : (
                    <div>
                        <ProductCard/>
                    </div>
                )}
            </div>
        </div>
    );
}
