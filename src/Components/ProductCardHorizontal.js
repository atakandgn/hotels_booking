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
import {StarIcon} from "@heroicons/react/20/solid";

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
                        <Card className="w-full lg:h-64 md:flex-row flex-col" id={index}>
                            <CardHeader
                                shadow={false}
                                floated={false}
                                className="m-0 md:w-2/5 w-full md:h-full h-40 shrink-0 md:rounded-r-none"
                            >
                                <img
                                    src={item?.hotel_images}
                                    alt="card-image"
                                    className="h-full w-full object-cover"
                                />
                            </CardHeader>
                            <CardBody className="w-full flex justify-between items sm:gap-3 gap-1 py-4 px-2">
                                <div className="flex flex-col sm:w-2/3 w-1/2">
                                    <div className="flex flex-col">
                                        <Typography variant="h6" color="gray" className="uppercase">
                                            {item?.hotel_name}
                                        </Typography>
                                        <Typography variant="h5" color="blue-gray">
                                            {item?.hotel_address}
                                        </Typography>

                                        <div className="flex gap-3 flex-col py-2">
                                            <Typography variant="h5" color="gray">
                                                Hotel Features:
                                            </Typography>
                                            <div className="flex flex-row gap-2">
                                                {
                                                    hotelFeatures[index]
                                                }
                                            </div>
                                        </div>
                                    </div>

                                    <Typography variant="paragraph" color="gray"
                                                className="text-sm bg-gray-50/10 p-2 h-full flex items-center">
                                        <Tooltip
                                            placement="bottom"
                                            className="border border-blue-gray-50 bg-white px-4 py-3 shadow-xl shadow-black/10"
                                            content={
                                                <div className="w-80">
                                                    <Typography color="blue-gray" className="font-medium">
                                                        {item?.hotel_name} Hotel Description
                                                    </Typography>
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal opacity-80"
                                                    >
                                                        {item?.hotel_description}
                                                    </Typography>
                                                </div>
                                            }
                                        >
                                        <span className=" text-truncate-3">
                                             {item?.hotel_description}
                                        </span>
                                        </Tooltip>
                                    </Typography>
                                </div>

                                <div className="flex flex-col justify-between items-end sm:w-1/3 w-1/2">
                                    <div className="flex flex-col gap-2 items-end">
                                        <Chip value={"%"+item?.hotel_discount+ " Discount"} color="teal" className="normal-case"/>
                                        <div>
                                            <span className="text-sm line-through "> {item?.hotel_price}₺</span>
                                            <span
                                                className="lg:text-2xl text-lg font-bold"> {parseFloat(item?.hotel_price - item?.hotel_price * item?.hotel_discount / 100).toLocaleString()} ₺</span>
                                        </div>
                                        <Typography color="gray" variant="h6" className="text-right sm:text-[14px] text-[13px]">
                                            The price includes taxes and fees for one night.
                                        </Typography>

                                        <Typography color="gray" className="text-[13px] text-start">
                                            <div className="flex sm:flex-row flex-col  items-center gap-1">
                                                <div className="flex flex-row items-center gap-1">
                                                    {[1, 2, 3, 4, 5].map((star) => (
                                                        <StarIcon
                                                            key={star}
                                                            className={`h-5 w-5 cursor-pointer ${star <= item?.hotel_rating ? 'text-yellow-500' : 'text-gray-300'}`}
                                                        />
                                                    ))}
                                                </div>

                                                {
                                                    (() => {
                                                        switch (item?.hotel_rating) {
                                                            case 5:
                                                                return <span
                                                                    className="text-purple-500">Excellent ({item?.hotel_comments + " "}Review)</span>;
                                                            case 4:
                                                                return <span
                                                                    className="text-blue-500">Amazing ({item?.hotel_comments + " "} Review)</span>;
                                                            case 3:
                                                                return <span
                                                                    className="text-green-500">Very Good ({item?.hotel_comments + " "} Review)</span>;
                                                            case 2:
                                                                return <span
                                                                    className="text-yellow-500">Good ({item?.hotel_comments + " "} Review)</span>;
                                                            case 1:
                                                                return <span
                                                                    className="text-red-500">Fair ({item?.hotel_comments + " "} Review)</span>;
                                                            default:
                                                                return <span
                                                                    className="text-gray-500">Good ({item?.hotel_comments + " "} Review)</span>;
                                                        }
                                                    })()
                                                }


                                            </div>

                                        </Typography>
                                    </div>
                                    <div className="my-1">
                                        <Button color="indigo" variant="outlined" size="sm" rounded={false}
                                                ripple="light">
                                            <Link to={`/product/${item?.hotel_id}`}>
                                                View Details
                                            </Link>
                                        </Button>
                                        {
                                            decodedToken ? (
                                                <Typography color="purple" variant="h6" className="text-right mt-2">
                                                    {
                                                        parseFloat((item?.hotel_price - item?.hotel_price * item?.hotel_discount / 100) - (item?.hotel_price - item?.hotel_price * item?.hotel_discount / 100) * (decodedToken?.coupon_rate / 100)).toLocaleString('en-US', {
                                                            minimumFractionDigits: 2,
                                                            maximumFractionDigits: 2,
                                                        })} ₺
                                                </Typography>
                                            ) : (null)
                                        }
                                    </div>

                                </div>


                            </CardBody>
                        </Card>
                    );
                })
            }
        </div>
    );
}