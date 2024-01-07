import React from 'react';
import MainLayout from "../MainLayout";
import ProductCard from "../Components/ProductCard";
import FilterHotelData from "../Components/FilterHotelData";


export default function Home() {

    return (
        <MainLayout>
            <div className="my-4">

                <FilterHotelData/>

            </div>
        </MainLayout>
    )
}