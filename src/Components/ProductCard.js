import React, {useEffect, useState} from 'react';
import {Badge, Button, Card, CardBody, CardFooter, CardHeader, Chip, Typography} from "@material-tailwind/react";
import {Link} from "react-router-dom";
import {getDecodedToken} from './auth';
import {BanknotesIcon} from "@heroicons/react/24/outline";
import axios from "axios";
import {StarIcon} from "@heroicons/react/20/solid";

export default function ProductCard() {
    const decodedToken = getDecodedToken();
    const productArray = [
        {
            id: 1,
            name: "Next Hotel Istanbul City Center",
            description: "The place is close to Barceloneta Beach and bus stop just 2 min by walk and near to &quot;Naviglio&quot; where you can enjoy the main night life in Barcelona.",
            price: 1500,
            discount: 1200,
            rating: 10,
            ratingCount: 3,
            image: "https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            isMember: true,
            isFeatured: true,
            isLastMinute: true,
            isMostPopular: true,
        },
        {
            id: 2,
            name: "Next Hotel Istanbul City Center",
            description: "The place is close to Barceloneta Beach and bus stop just 2 min by walk and near to &quot;Naviglio&quot; where you can enjoy the main night life in Barcelona.",
            price: 1500,
            discount: 1200,
            rating: 10,
            ratingCount: 3,
            image: "https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            isMember: true,
            isFeatured: true,
            isLastMinute: true,
            isMostPopular: true,
        },
        {
            id: 3,
            name: "Next Hotel Istanbul City Center",
            description: "The place is close to Barceloneta Beach and bus stop just 2 min by walk and near to &quot;Naviglio&quot; where you can enjoy the main night life in Barcelona.",
            price: 1500,
            discount: 1200,
            rating: 10,
            ratingCount: 3,
            image: "https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            isMember: true,
            isFeatured: true,
            isLastMinute: true,
            isMostPopular: true,
        }
    ]

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
        <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 gap-8">
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
                                                                    return <span className="text-purple-500">Excellent ({product?.hotel_comments + " "}Review)</span>;
                                                                case 4:
                                                                    return <span className="text-blue-500">Amazing ({product?.hotel_comments + " "} Review)</span>;
                                                                case 3:
                                                                    return <span className="text-green-500">Very Good ({product?.hotel_comments + " "} Review)</span>;
                                                                case 2:
                                                                    return <span className="text-yellow-500">Good ({product?.hotel_comments + " "} Review)</span>;
                                                                case 1:
                                                                    return <span className="text-red-500">Fair ({product?.hotel_comments + " "} Review)</span>;
                                                                default:
                                                                    return <span className="text-gray-500">Good ({product?.hotel_comments + " "} Review)</span>;
                                                            }
                                                        })()
                                                    }



                                                </div>

                                            </Typography>
                                            <Link to={`/product/${product?.id}`}>
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
                                                 {product?.hotel_price} TL
                                                </span>
                                                    <span className="text-lg font-bold">
                                                    {product?.hotel_price - (product?.hotel_price * product?.hotel_discount / 100)} TL
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
                                                        className="font-medium capitalize leading-none"
                                                    >
                                                        Discounts For MEMBERS ONLY
                                                    </Typography>
                                                }
                                                className="rounded-full py-1.5 w-max my-1"
                                            />


                                        </CardBody>
                                        <CardFooter className="pt-0 flex items-center">
                                            {
                                                decodedToken ? (
                                                    //   Special price for members  {
                                                    //    product.price - (product.price * decodedToken?.discount / 100)
                                                    // }
                                                    <div className="w-full flex items-center justify-center">
                                                        <Chip
                                                            color=""
                                                            icon={
                                                                <BanknotesIcon className="text-white w-6 h-6"/>
                                                            }
                                                            value={
                                                                <Typography
                                                                    variant="h3"
                                                                    color="white"
                                                                    className="font-medium capitalize leading-none member-price"
                                                                >
                                                                    {product?.hotel_price - (product?.hotel_price * decodedToken?.discount / 100)} TL
                                                                </Typography>
                                                            }
                                                            className="rounded-full px-4"
                                                        />
                                                    </div>
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