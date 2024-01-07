import {
    Card,
    CardHeader,
    CardBody,
    Typography, Tooltip, Chip, Button,
} from "@material-tailwind/react";
import {CustomButton} from "./CustomButton";
import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {getDecodedToken} from "./auth";

export function ProductCardHorizontal({data}) {
    const decodedToken = getDecodedToken();
    const [hotelFeatures, setHotelFeatures] = useState([]);

    useEffect(() => {
        if (data && data.length > 0) {
            setHotelFeatures(
                data.map((item) =>
                    item.hotel_features.map((feature) => renderFeature(feature))
                )
            );
        }
    }, [data]);

    const renderFeature = (feature) => {
        switch (feature) {
            case 0:
                return (
                    <div key={feature} className="flex items-center gap-2">
                        <Tooltip content="Denize Sıfır">
                            <i className="fa-solid fa-lg fa-water cursor-pointer"></i>
                        </Tooltip>
                    </div>
                );
            case 1:
                return (
                    <div key={feature} className="flex items-center gap-2">
                        <Tooltip content="Havuzlu Otel">
                            <i className="fa-solid fa-lg fa-water-ladder cursor-pointer"></i>
                        </Tooltip>
                    </div>
                );
            case 2:
                return (
                    <div key={feature} className="flex items-center gap-2">
                        <Tooltip content="Restorant">
                            <i className="fa-solid fa-lg fa-mug-saucer cursor-pointer"></i>
                        </Tooltip>
                    </div>
                );
            case 3:
                return (
                    <div key={feature} className="flex items-center gap-2">
                        <Tooltip content="Wifi">
                            <i className="fa-solid fa-lg fa-wifi cursor-pointer"></i>
                        </Tooltip>
                    </div>
                );
            case 4:
                return (
                    <div key={feature} className="flex items-center gap-2">
                        <Tooltip content="Spa">
                            <i className="fa-solid fa-lg fa-spa cursor-pointer"></i>
                        </Tooltip>
                    </div>
                );
            case 5:
                return (
                    <div key={feature} className="flex items-center gap-2">
                        <Tooltip content="Fitness">
                            <i className="fa-solid fa-lg fa-dumbbell cursor-pointer"></i>
                        </Tooltip>
                    </div>
                );
            case 6:
                return (
                    <div key={feature} className="flex items-center gap-2">
                        <Tooltip content="Otopark">
                            <i className="fa-solid fa-lg fa-parking cursor-pointer"></i>
                        </Tooltip>
                    </div>
                );
            case 7:
                return (
                    <div key={feature} className="flex items-center gap-2">
                        <Tooltip content="Klima">
                            <i className="fa-solid fa-lg fa-fan cursor-pointer"></i>
                        </Tooltip>
                    </div>
                );
            case 8:
                return (
                    <div key={feature} className="flex items-center gap-2">
                        <Tooltip content="Engelli Dostu">
                            <i className="fa-solid fa-lg fa-wheelchair cursor-pointer"></i>
                        </Tooltip>
                    </div>
                );
            case 9:
                return (
                    <div key={feature} className="flex items-center gap-2">
                        <Tooltip content="Çocuk Dostu">
                            <i className="fa-solid fa-lg fa-child cursor-pointer"></i>
                        </Tooltip>
                    </div>
                );
            case 10:
                return (
                    <div key={feature} className="flex items-center gap-2">
                        <Tooltip content="Kumarhane">
                            <i className="fa-solid fa-lg fa-dice-d20 cursor-pointer"></i>
                        </Tooltip>
                    </div>
                );
            case 11:
                return (
                    <div key={feature} className="flex items-center gap-2">
                        <Tooltip content="Jakuzi">
                            <i className="fa-solid fa-lg fa-hot-tub cursor-pointer"></i>
                        </Tooltip>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="flex flex-col gap-4 w-full">
            {
                data.map((item, index) => {
                    return (
                        <Card className="w-full h-60 flex-row" id={index}>
                            <CardHeader
                                shadow={false}
                                floated={false}
                                className="m-0 w-2/5 shrink-0 rounded-r-none"
                            >
                                <img
                                    src={item?.hotel_images}
                                    alt="card-image"
                                    className="h-full w-full object-cover"
                                />
                            </CardHeader>
                            <CardBody className="w-full flex justify-between items gap-3 py-4 px-2">
                                <div className="flex flex-col w-2/3">
                                    <div className="flex flex-col">
                                        <Typography variant="h6" color="gray" className="uppercase">
                                            {item?.hotel_name}
                                        </Typography>
                                        <Typography variant="h5" color="blue-gray">
                                            {item?.hotel_address}
                                        </Typography>

                                        <div className="flex items-center gap-2 flex-wrap mt-3">
                                            {
                                                hotelFeatures[index]
                                            }

                                        </div>
                                    </div>

                                    <Typography variant="paragraph" color="gray"
                                                className="text-sm bg-gray-50/10 p-2 h-full flex items-center">
                                        {item?.hotel_description}
                                    </Typography>
                                </div>

                                <div className="flex flex-col justify-between items-end">
                                    <div className="flex flex-col gap-2 items-end">
                                        <Chip value={item?.hotel_discount} color="teal"/>
                                        <div>
                                            <span className="text-sm line-through"> {item?.hotel_price} TL</span>
                                            <span className="text-2xl font-bold"> {item?.hotel_price - item?.hotel_price * item?.hotel_discount / 100} TL</span>
                                        </div>
                                        <Typography color="gray" variant="h6" className="text-right ">
                                            The price includes taxes and fees for one night.
                                        </Typography>
                                    </div>
                                    <Button color="indigo" variant="outlined" size="sm" rounded={false} ripple="light">
                                        <Link to={`/product/${item?.hotel_id}`}>
                                            View Details
                                        </Link>
                                    </Button>
                                </div>


                            </CardBody>
                        </Card>
                    );
                })
            }
        </div>
    );
}