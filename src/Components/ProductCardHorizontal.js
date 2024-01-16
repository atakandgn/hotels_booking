import {
    Card,
    CardHeader,
    CardBody,
    Typography, Tooltip, Chip, Button, Dialog, DialogHeader, DialogBody, DialogFooter, IconButton,
} from "@material-tailwind/react";
import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {getDecodedToken} from "./auth";
import {StarIcon} from "@heroicons/react/20/solid";

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import toast from "react-hot-toast";

export function ProductCardHorizontal({data}) {
    const decodedToken = getDecodedToken();
    const [hotelFeatures, setHotelFeatures] = useState([]);
    const [openDialogIndex, setOpenDialogIndex] = useState(null);

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
                        <Tooltip content="Near the sea">
                            <i className="fa-solid fa-lg fa-water cursor-pointer"></i>
                        </Tooltip>
                    </div>
                );
            case 1:
                return (
                    <div key={feature} className="flex items-center gap-2">
                        <Tooltip content="Pool">
                            <i className="fa-solid fa-lg fa-water-ladder cursor-pointer"></i>
                        </Tooltip>
                    </div>
                );
            case 2:
                return (
                    <div key={feature} className="flex items-center gap-2">
                        <Tooltip content="Breakfast">
                            <i className="fa-solid fa-lg fa-mug-saucer cursor-pointer"></i>
                        </Tooltip>
                    </div>
                );
            case 3:
                return (
                    <div key={feature} className="flex items-center gap-2">
                        <Tooltip content="Free Wifi">
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
                        <Tooltip content="Parking">
                            <i className="fa-solid fa-lg fa-parking cursor-pointer"></i>
                        </Tooltip>
                    </div>
                );
            case 7:
                return (
                    <div key={feature} className="flex items-center gap-2">
                        <Tooltip content="Air Conditioner">
                            <i className="fa-solid fa-lg fa-fan cursor-pointer"></i>
                        </Tooltip>
                    </div>
                );
            case 8:
                return (
                    <div key={feature} className="flex items-center gap-2">
                        <Tooltip content="Disabled Access">
                            <i className="fa-solid fa-lg fa-wheelchair cursor-pointer"></i>
                        </Tooltip>
                    </div>
                );
            case 9:
                return (
                    <div key={feature} className="flex items-center gap-2">
                        <Tooltip content="Child Friendly">
                            <i className="fa-solid fa-lg fa-child cursor-pointer"></i>
                        </Tooltip>
                    </div>
                );
            case 10:
                return (
                    <div key={feature} className="flex items-center gap-2">
                        <Tooltip content="Casino">
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

    // Image gallery states
    const [open, setOpen] = React.useState(false);
    const [isFavorite, setIsFavorite] = React.useState(false);

    const handleOpen = (index) => {
        setOpenDialogIndex(index);
    };

    const handleClose = () => {
        setOpenDialogIndex(null);
    };
    //
    const handleIsFavorite = () => {
        decodedToken ? setIsFavorite((cur) => !cur) : toast.error("Please login to add your favorite hotel.");
    }
    const settings = {
        dots: true,
        fade: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };
    return (
        <div className="flex flex-col gap-4 w-full py-4">
            {
                data.map((item, index) => {
                    return (
                        <Card className="w-full lg:h-64 md:flex-row flex-col" id={index}>
                            <CardHeader
                                shadow={false}
                                floated={false}
                                className="m-0 md:w-2/5 w-full md:h-full h-40 shrink-0 md:rounded-r-none cursor-zoom-in"
                                onClick={() => handleOpen(index)}
                            >
                                <img
                                    src={item?.hotel_images[0]}
                                    alt="card-image"
                                    className="h-full w-full object-cover "
                                />
                            </CardHeader>
                            <Dialog size="lg" open={openDialogIndex === index} handler={handleClose}>
                                <DialogHeader className="justify-between">
                                    <Typography color="blue-gray" variant="h4">
                                        {item?.hotel_name}
                                    </Typography>
                                    <div className="flex items-center gap-2">
                                        <IconButton
                                            variant="text"
                                            size="sm"
                                            color={isFavorite ? "red" : "blue-gray"}
                                            onClick={handleIsFavorite}
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24"
                                                fill="currentColor"
                                                className="h-5 w-5"
                                            >
                                                <path
                                                    d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z"/>
                                            </svg>
                                        </IconButton>
                                    </div>
                                </DialogHeader>
                                <DialogBody children="">
                                    <div className="w-full bg-slate-50 rounded-md">
                                        <Slider {...settings}>
                                            {
                                                item?.hotel_images.map((image, index) => {
                                                    return (
                                                        <div key={index}>
                                                            <img
                                                                src={image}
                                                                alt="card-image"
                                                                className="h-[500px] w-full object-contain rounded"
                                                            />
                                                        </div>
                                                    )
                                                })
                                            }
                                        </Slider>
                                    </div>
                                </DialogBody>
                                <DialogFooter className="justify-between">
                                    <Button color="red" variant="outlined" size="sm" rounded={false}
                                            ripple={true} onClick={handleClose}>
                                        Close
                                    </Button>

                                    <Link to={`/product/${item?.hotel_id}`}>
                                        <Button
                                            size="sm"
                                            variant="outlined"
                                            ripple={true}
                                            color="purple"
                                            className="mr-5 flex items-center"
                                        >
                                            Detail
                                        </Button>
                                    </Link>

                                </DialogFooter>

                            </Dialog>
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
                                        <Chip value={"%" + item?.hotel_discount + " Discount"} color="teal"
                                              className="normal-case"/>
                                        <div>
                                            <span className="text-sm line-through "> {item?.hotel_price}₺</span>
                                            <span
                                                className="lg:text-2xl text-lg font-bold"> {parseFloat(item?.hotel_price - item?.hotel_price * item?.hotel_discount / 100).toLocaleString()} ₺</span>
                                        </div>
                                        <Typography color="gray" variant="h6"
                                                    className="text-right sm:text-[14px] text-[13px]">
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
                                                ripple={true}>
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
    )
        ;
}