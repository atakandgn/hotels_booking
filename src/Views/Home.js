import React from 'react';
import MainLayout from "../MainLayout";
import ProductCard from "../Components/ProductCard";


export default function Home() {

    return (
        <MainLayout>
            <div className="my-4">
                <div className="flex flex-col gap-2 my-4">
                    <span>Şu tarih aralığı için fırsatlar gösteriliyor > <b> 22 Aralık - 24 Aralık</b> </span>
                </div>

                <div>
                    <ProductCard/>
                </div>


            </div>
        </MainLayout>
    )
}