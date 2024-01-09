// import React, {useState, useEffect} from 'react';
// import {Select, Option, Input, Button} from "@material-tailwind/react";
// import flatpickr from 'flatpickr';
// import 'flatpickr/dist/flatpickr.min.css';
// import CitySelect from "./CitySelect";
// import countriesData from "../countries+states+cities.json";
//
// export default function FilterSearch() {
//     const [startDate, setStartDate] = useState(null);
//     const [endDate, setEndDate] = useState(null);
//
//     useEffect(() => {
//         // Get the current date
//         const currentDate = new Date();
//
//         // Initialize flatpickr on component mount
//         const datepicker = flatpickr('#datePicker', {
//             mode: 'range',
//             dateFormat: 'd/m/Y',
//             minDate: currentDate,
//             onClose: selectedDates => {
//                 if (selectedDates.length === 2) {
//                     setStartDate(selectedDates[0]);
//                     setEndDate(selectedDates[1]);
//                 }
//             },
//         });
//
//         // Cleanup flatpickr on component unmount
//         return () => {
//             datepicker.destroy();
//         };
//     }, []);
//
//     return (
//         <div className="flex flex-col gap-2">
//             <div className="flex flex-col gap-4">
//                 <CitySelect data={countriesData} variant={"standard"} customClass={"flex flex-col gap-4"}/>
//                 <div className="flex flex-col gap-4">
//                     <Input variant={"standard"}
//                         label="Select a Date"
//                         id="datePicker"
//                         className="w-full"
//                         placeholder="Tarih Aralığı"
//                     />
//                     <Select variant={"standard"} label="Misafir Sayısı" className="">
//                         <Option value="1">1</Option>
//                         <Option value="2">2</Option>
//                         <Option value="3">3</Option>
//                         <Option value="4">4</Option>
//                         <Option value="5">5</Option>
//                         <Option value="6">6</Option>
//                         <Option value="7">7</Option>
//                         <Option value="8">8</Option>
//                     </Select>
//                     <Select variant={"standard"} label="Oda Sayısı" className="">
//                         <Option value="1">1</Option>
//                         <Option value="2">2</Option>
//                         <Option value="3">3</Option>
//                         <Option value="4">4</Option>
//                         <Option value="5">5</Option>
//                     </Select>
//                 </div>
//
//             </div>
//            <Button color="indigo" ripple="light" variant="filled" className="w-full" onClick={() => alert("Hello")}>
//                 Search
//             </Button>
//
//         </div>
//
//
//     );
// }
