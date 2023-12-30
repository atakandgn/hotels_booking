import React from 'react';
import {Badge, Button, Card, CardBody, CardFooter, CardHeader, Chip, Typography} from "@material-tailwind/react";
import {CustomButton} from "./CustomButton";
import {Link} from "react-router-dom";


export default function ProductCard() {

    return (
        <Badge color="teal" content="%9 İndirim">
            <Link to="/product/1">
                <Card className=" w-[325px]">
                    <CardHeader floated={false} shadow={false} color="transparent" className="h-48">
                        <img
                            className="object-cover h-full w-full"
                            src="https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
                            alt="card-image"
                        />
                    </CardHeader>
                    <CardBody className="px-6 py-3">
                        <Typography color="gray" className="text-[13px] text-start">
                            10.0 - Olağanüstü - 3 yorum
                        </Typography>
                        <Typography variant="h5" color="blue-gray" className="text-[18px] text-truncate-2">
                            Next Hotel Istanbul City Center
                        </Typography>
                        <Typography className="text-truncate-3 mb-1">
                            The place is close to Barceloneta Beach and bus stop just 2 min by
                            walk and near to &quot;Naviglio&quot; where you can enjoy the main
                            night life in Barcelona.
                        </Typography>
                        <div className="flex flex-col gap-2">
                            <div className="flex items-end gap-2">
                                <span className="text-sm line-through"> 1.200 TL</span>
                                <span className="text-lg font-bold"> 1.500 TL</span>
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
                        <CustomButton text="Üyelere özel fiyatı görmek için giriş yapın." color="indigo" variant="outlined" size="sm"
                                      className="w-full normal-case" optionalClass="w-full"/>
                    </CardFooter>
                </Card>

            </Link>
        </Badge>
    )
}