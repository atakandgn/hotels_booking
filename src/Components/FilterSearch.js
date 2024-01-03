import React, {useState,useEffect} from 'react';
import {Select, Option, Input} from "@material-tailwind/react";
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import CitySelect from "./CitySelect";
import countriesData from "../countries+states+cities.json";
import {CustomButton} from "./CustomButton";

export default function FilterSearch() {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    useEffect(() => {
        // Get the current date
        const currentDate = new Date();

        // Initialize flatpickr on component mount
        const datepicker = flatpickr('#datePicker', {
            mode: 'range',
            dateFormat: 'd/m/Y',
            minDate: currentDate,
            onClose: selectedDates => {
                if (selectedDates.length === 2) {
                    setStartDate(selectedDates[0]);
                    setEndDate(selectedDates[1]);
                }
            },
        });

        // Cleanup flatpickr on component unmount
        return () => {
            datepicker.destroy();
        };
    }, []);
    const handleSearch = () => {
        console.log("Başlangıç Tarihi:", startDate);
        console.log("Bitiş Tarihi:", endDate);
    };
    return (
        <div className="flex lg:flex-row flex-col gap-2">
            <div className="w-full grid grid-cols-2 gap-2">
                <CitySelect data={countriesData} variant={"outlined"}/>
                <Input
                    label="Select a Date"
                    id="datePicker"
                    className="w-full border h-full"
                    placeholder="Tarih Aralığı"
                />
            </div>
            <div className="flex flex-row gap-2 w-full">
                <Select label="Misafir Sayısı" className="w-full">
                    <Option value="1">1</Option>
                    <Option value="2">2</Option>
                    <Option value="3">3</Option>
                    <Option value="4">4</Option>
                    <Option value="5">5</Option>
                    <Option value="6">6</Option>
                    <Option value="7">7</Option>
                    <Option value="8">8</Option>
                </Select>
                <Select label="Oda Sayısı" className="w-full">
                    <Option value="1">1</Option>
                    <Option value="2">2</Option>
                    <Option value="3">3</Option>
                    <Option value="4">4</Option>
                    <Option value="5">5</Option>
                </Select>
            </div>
            <div>

            </div>
            <CustomButton text="Search" color="" variant="filled" size="md" onClick={handleSearch}/>
        </div>
    );
}
