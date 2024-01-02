import React, {useState,useEffect} from 'react';
import {Select, Option, IconButton, Input} from "@material-tailwind/react";
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

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
        <div className="grid xl:grid-cols-5 lg:grid-cols-4 gap-4 md:grid-cols-3 sm:grid-cols-2">
            <Select label="Varış Noktası" className="w-full">
                <Option value="1">İstanbul</Option>
                <Option value="2">Ankara</Option>
                <Option value="3">İzmir</Option>
                <Option value="4">Antalya</Option>
            </Select>
            <div>
                <Input
                    label="Select a Date"
                    id="datePicker"
                    className="w-full border h-full"
                    placeholder="Tarih Aralığı"
                />
            </div>
            <Select label="Misafir Sayısı" className="w-full">
                <Option value="1">1</Option>
                <Option value="2">2</Option>
                <Option value="3">3</Option>
                <Option value="4">4</Option>
            </Select>
            <Select label="Oda Sayısı" className="w-full">
                <Option value="1">1</Option>
                <Option value="2">2</Option>
                <Option value="3">3</Option>
                <Option value="4">4</Option>
            </Select>
            <IconButton variant="text" className="flex items-center justify-center w-full" onClick={handleSearch}>
                <i className="fas fa-search mr-2" />
                <span>Ara</span>
            </IconButton>
        </div>
    );
}
