import React from 'react';
import MainLayout from "../MainLayout";
import FilterHotelData from "../Components/FilterHotelData";
import {Popup} from "../Components/Popup";


export default function Home() {

    return (
        <MainLayout>
            <div className="my-4">
                <FilterHotelData/>
            </div>
        </MainLayout>
    )
}