import React from 'react';
import {Badge, Card, CardBody, CardFooter, CardHeader, Chip, Typography} from "@material-tailwind/react";
import {CustomButton} from "./CustomButton";
import {Link} from "react-router-dom";


export default function ProductCard() {
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


    return (
        <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 gap-8">
            {
                productArray.map((product) => {
                        return (
                            <Badge color="teal" content="%9 İndirim" className="sm:mr-4 mr-6">
                                <Card className="sm:w-[325px]">
                                    <Link to={`/product/${product.id}`}>
                                        <CardHeader floated={false} shadow={false} color="transparent" className="h-48">
                                            <img
                                                className="object-cover h-full w-full"
                                                src={product.image}
                                                alt=""
                                            />
                                        </CardHeader>
                                    </Link>
                                    <CardBody className="px-6 py-3">
                                        <Typography color="gray" className="text-[13px] text-start">
                                            10.0 - Olağanüstü - 3 yorum
                                        </Typography>
                                        <Link to={`/product/${product.id}`}>
                                            <Typography variant="h5" color="blue-gray"
                                                        className="text-[18px] text-truncate-2">
                                                {product.name}
                                            </Typography>
                                            <Typography className="text-truncate-3 mb-1">
                                                {product.description}
                                            </Typography>
                                        </Link>
                                        <div className="flex flex-col gap-2">
                                            <div className="flex items-end gap-2">
                                                <span className="text-sm line-through">
                                                    {product.discount} TL
                                                </span>
                                                <span className="text-lg font-bold">
                                                    {product.price} TL
                                                </span>
                                            </div>

                                            <Typography color="gray" variant="h6" className="text-start text-[12px]">
                                                1 gece için vergiler ve ücretler dahildir.
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
                                                    Üye fiyatlarından yararlanın!
                                                </Typography>
                                            }
                                            className="rounded-full py-1.5 w-max my-1"
                                        />
                                    </CardBody>
                                    <CardFooter className="pt-0 flex gap-2 justify-between">
                                        <CustomButton text="Üyelere özel fiyatı görmek için giriş yapın." color="indigo"
                                                      variant="outlined"
                                                      size="sm"
                                                      className="w-full normal-case" optionalClass="w-full"/>
                                    </CardFooter>
                                </Card>
                            </Badge>
                        )
                    }
                )
            }


        </div>
    )
}