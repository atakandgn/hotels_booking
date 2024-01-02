import React from 'react';
import MainLayout from "../MainLayout";
import FilterSearch from "../Components/FilterSearch";
import ProductCard from "../Components/ProductCard";
import {Typography} from "@material-tailwind/react";


export default function Home() {

    return (
        <MainLayout>
            <FilterSearch/>
            <div className="my-4">
                <div className="flex flex-col gap-2">
                    <Typography variant="h2" color="blue-gray"
                                className="text-lg">Bu hafta sonu tatil yapın!</Typography>
                    <span>Şu tarih aralığı için fırsatlar gösteriliyor > <b> 22 Aralık - 24 Aralık</b> </span>
                </div>

                <div>
                    <ProductCard/>
                </div>


            </div>
        </MainLayout>
    )
}