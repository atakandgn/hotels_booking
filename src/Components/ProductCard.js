import React, {useEffect, useState} from 'react';
import {Badge, Button, Card, CardBody, CardFooter, CardHeader, Chip, Typography} from "@material-tailwind/react";
import {Link} from "react-router-dom";
import {getDecodedToken} from './auth';
import axios from "axios";
import {StarIcon} from "@heroicons/react/20/solid";

export default function ProductCard() {
    const decodedToken = getDecodedToken();

    const [hotelData, setHotelData] = useState({hotels: []});
    const getHotels = async () => {
        try {
            const response = await axios.get('http://localhost:5000/getHotels');
            setHotelData(response.data);


        } catch (error) {
            console.log(error.message);

        }
    }

    useEffect(() => {
        getHotels();
    }, []);


    return (
        <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 gap-8 my-6">
            {
                hotelData ? (
                    hotelData.hotels.map((product, index) => {
                            return (
                                <Badge color="teal" content={"%" + product.hotel_discount + " DISCOUNT"}
                                       className="sm:mr-4 mr-6">
                                    <Card className="sm:w-[325px]">
                                        <Link to={`/product/${product?.hotel_id}`}>
                                            <CardHeader floated={false} shadow={false} color="transparent" className="h-48">
                                                <img
                                                    className="object-cover h-full w-full"
                                                    src={product?.hotel_images}
                                                    alt=""
                                                />
                                            </CardHeader>

                                        </Link>
                                        <CardBody className="px-6 py-3">
                                            <Typography color="gray" className="text-[13px] text-start">
                                                <div className="flex items-center gap-1">
                                                    {[1, 2, 3, 4, 5].map((star) => (
                                                        <StarIcon
                                                            key={star}
                                                            className={`h-5 w-5 cursor-pointer ${star <= product?.hotel_rating ? 'text-yellow-500' : 'text-gray-300'}`}
                                                        />
                                                    ))}
                                                    {
                                                        (() => {
                                                            switch (product?.hotel_rating) {
                                                                case 5:
                                                                    return <span
                                                                        className="text-purple-500">Excellent ({product?.hotel_comments + " "}Review)</span>;
                                                                case 4:
                                                                    return <span
                                                                        className="text-blue-500">Amazing ({product?.hotel_comments + " "} Review)</span>;
                                                                case 3:
                                                                    return <span
                                                                        className="text-green-500">Very Good ({product?.hotel_comments + " "} Review)</span>;
                                                                case 2:
                                                                    return <span
                                                                        className="text-yellow-500">Good ({product?.hotel_comments + " "} Review)</span>;
                                                                case 1:
                                                                    return <span
                                                                        className="text-red-500">Fair ({product?.hotel_comments + " "} Review)</span>;
                                                                default:
                                                                    return <span
                                                                        className="text-gray-500">Good ({product?.hotel_comments + " "} Review)</span>;
                                                            }
                                                        })()
                                                    }


                                                </div>

                                            </Typography>
                                            <Link to={`/product/${product?.hotel_id}`}>
                                                <Typography variant="h5" color="blue-gray"
                                                            className="text-[18px] text-truncate-2">
                                                    {product?.hotel_name}
                                                </Typography>
                                                <Typography className="text-truncate-3 mb-1">
                                                    {product?.hotel_description}
                                                </Typography>
                                            </Link>
                                            <div className="flex flex-col gap-2">
                                                <div className="flex items-end gap-2">
                                                <span className="text-sm line-through">
                                                 {parseFloat(product?.hotel_price).toLocaleString('en-US', {
                                                     minimumFractionDigits: 2,
                                                     maximumFractionDigits: 2,
                                                 })} ₺
                                                </span>
                                                    <span className="text-lg font-bold">
                                                    {parseFloat(product?.hotel_price - product?.hotel_price * product?.hotel_discount / 100).toLocaleString('en-US', {
                                                        minimumFractionDigits: 2,
                                                        maximumFractionDigits: 2,
                                                    })} ₺
                                                </span>
                                                </div>

                                                <Typography color="gray" variant="h6" className="text-start text-[12px]">
                                                    The price includes taxes and fees for one night.
                                                </Typography>
                                            </div>

                                            <Chip
                                                color="orange"
                                                icon={
                                                    <i className="fa-solid fa-user-friends text-white"></i>
                                                }
                                                value={
                                                    <Typography
                                                        variant="small"
                                                        color="white"
                                                        className="font-medium capitalize leading-none w-full"
                                                    >
                                                        Discounts For MEMBERS ONLY
                                                    </Typography>
                                                }
                                                className="rounded-full py-1.5 w-full my-1 text-center"
                                            />


                                        </CardBody>
                                        <CardFooter className="pt-0 flex items-center">
                                            {
                                                decodedToken ? (
                                                    <Button
                                                        color="deep-purple"
                                                        variant="outlined"
                                                        className="w-full py-1"
                                                    >
                                                        <Typography variant="button" color="deep-purple" className="normal-case flex items-center justify-center gap-1">
                                                            {/*<BanknotesIcon className="w-6 h-6"/>*/}
                                                            For You:{" "} <b>{
                                                                parseFloat(
                                                                    (product?.hotel_price-(product?.hotel_price * product?.hotel_discount / 100)) - (product?.hotel_price-(product?.hotel_price * product?.hotel_discount / 100)) * (decodedToken?.coupon_rate / 100) ).toLocaleString('en-US', {
                                                                    minimumFractionDigits: 2,
                                                                    maximumFractionDigits: 2,
                                                                })} ₺</b>
                                                        </Typography>
                                                    </Button>
                                                ) : (
                                                    <Button
                                                        color="indigo"
                                                        variant="outlined"
                                                        size="sm"
                                                        className="w-full normal-case ">
                                                        Login to see the member special price
                                                    </Button>
                                                )
                                            }
                                        </CardFooter>
                                    </Card>
                                </Badge>
                            )
                        }
                    )) : (
                    <h1>Yükleniyor...</h1>

                )
            }


        </div>
    )
}