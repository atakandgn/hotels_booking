import React, {useEffect, useRef, useState} from "react";
import MainLayout from "../MainLayout";
import {Alert, Button, Chip, Tooltip, Typography} from "@material-tailwind/react";
import {ChevronRightIcon} from "@heroicons/react/16/solid";
import {FeaturedImageGallery} from "../Components/ImageGallery";
import MapContainer from "../Components/MapContainer";
import CommentsCarousel from "../Components/Comments";
import MakeComment from "../Components/MakeComment";
import axios from "axios";
import {useParams} from "react-router-dom";
import {getDecodedToken} from "../Components/auth";
import toast from "react-hot-toast";

export default function HotelDetail() {
    const decodedToken = getDecodedToken();
    const {hotelID} = useParams();
    // ref for comments section
    const commentsRef = useRef(null);

    // Function to scroll to the comments section
    const scrollToComments = () => {
        if (commentsRef.current) {
            commentsRef.current.scrollIntoView({behavior: "smooth"});
        }
    };

    const [hotelData, setHotelData] = useState();

    useEffect(() => {
        const getHotelDetail = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/getHotelDetail/${hotelID}`);
                setHotelData(response.data);
            } catch (error) {
                console.error(error?.message);
            }
        };
        getHotelDetail();
    }, [hotelID]); // Trigger the effect whenever hotelID changes

    const mapCenter = hotelData ? [hotelData.hotel_latitude, hotelData.hotel_longitude] : [0, 0];

    console.log("hotelData", hotelData)
    const makeTheReservation = async (rating, comment) => {
        return new Promise((resolve, reject) => {
            // Add your actual save comment logic here
            // For now, let's just simulate success
            setTimeout(() => {
                resolve("Comment sent successfully!");
            }, 1000);
        });
    };

    const makeReservation = () => {
        toast.promise(
            new Promise((resolve) => {
                setTimeout(() => {
                    // Simulate a successful reservation after a delay
                    resolve("Reservation is made successfully!");
                }, 1000);
            }),
            {
                loading: 'Making Reservation...',
                success: <b>Reservation is made successfully!</b>,
                error: <b>Something went wrong!</b>,
            }
        );
    };

    return (
        <MainLayout>
            <div className="flex flex-col gap-8">
                <div className="grid lg:grid-cols-2 grid-cols-1 gap-2">
                    <div className="flex flex-col gap-2">
                        <div className="flex flex-col gap-2">
                            <Typography variant="h3" color="blue-gray">
                                {hotelData?.hotel_name}
                            </Typography>
                            <Typography variant="h6" color="gray">
                                {hotelData?.hotel_description}
                            </Typography>
                        </div>

                        <div className="flex items-center gap-2">
                            <Chip color="green" value="8.4"/>
                            <Typography variant="h6" color="gray"> Perfect</Typography>
                        </div>

                        <Typography variant="small" color="indigo" onClick={scrollToComments}
                                    className="flex items-center hover:text-indigo-300 hover:scale-105 w-max cursor-pointer transition duration-200">
                            See all {hotelData?.hotel_comments} reviews
                            <ChevronRightIcon className="w-5 h-5"/>
                        </Typography>
                        {/*Hotel Features*/}
                        <div className="flex items-center gap-2 flex-wrap">
                            <Typography variant="h4" color="blue-gray">Hotel Features:</Typography>
                            <Tooltip content="Havuzlu Otel">
                                <i className="fa-solid fa-lg fa-water-ladder cursor-pointer"></i>
                            </Tooltip>
                            <Tooltip content="Restorant">
                                <i className="fa-solid fa-lg fa-mug-saucer cursor-pointer"></i>
                            </Tooltip>
                            <Tooltip content="Wifi">
                                <i className="fa-solid fa-lg fa-wifi cursor-pointer"></i>
                            </Tooltip>
                            <Tooltip content="Spa">
                                <i className="fa-solid fa-lg fa-spa cursor-pointer"></i>
                            </Tooltip>
                            <Tooltip content="Fitness">
                                <i className="fa-solid fa-lg fa-dumbbell cursor-pointer"></i>
                            </Tooltip>
                            <Tooltip content="Otopark">
                                <i className="fa-solid fa-lg fa-parking cursor-pointer"></i>
                            </Tooltip>
                            <Tooltip content="Klima">
                                <i className="fa-solid fa-lg fa-fan cursor-pointer"></i>
                            </Tooltip>
                            <Tooltip content="Engelli Dostu">
                                <i className="fa-solid fa-lg fa-wheelchair cursor-pointer"></i>
                            </Tooltip>
                            <Tooltip content="Çocuk Dostu">
                                <i className="fa-solid fa-lg fa-child cursor-pointer"></i>
                            </Tooltip>
                            <Tooltip content="Denize Sıfır">
                                <i className="fa-solid fa-lg fa-water cursor-pointer"></i>
                            </Tooltip>
                            <Tooltip content="Jakuzi">
                                <i className="fa-solid fa-lg fa-hot-tub cursor-pointer"></i>
                            </Tooltip>
                        </div>

                        {/*    price and ex price*/}
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-2">
                                <Typography variant="h3" color="blue-gray">
                                    {hotelData?.hotel_price - (hotelData?.hotel_price * hotelData?.hotel_discount / 100)} TL
                                </Typography>
                                <Typography variant="h6" color="gray" className="line-through">
                                    {hotelData?.hotel_price} TL
                                </Typography>
                            </div>
                            <Typography variant="h6" color="gray">
                                The price includes taxes and fees for one night.
                            </Typography>
                        </div>
                        <div className="grid items-center">
                            {decodedToken ? <Button
                                    variant={"outlined"}
                                    color={"blue"}
                                    className="btn btn-primary"
                                    onClick={makeReservation}
                                >
                                    <Typography variant="button" color="">
                                        Make Reservation With Membership Discount {" "}
                                        <span className="font-bold text-xl">
                                        {hotelData?.hotel_price - (hotelData?.hotel_price * decodedToken?.discount / 100)} TL
                                        </span>
                                    </Typography>
                                </Button> :
                                <Button
                                    variant={"outlined"}
                                    color={"blue"}
                                    className="btn btn-primary"
                                    onClick={makeReservation}
                                >
                                    <Typography variant="button" color="">
                                        Make Reservation
                                        <span className="font-bold text-xl">
                                        </span>
                                    </Typography>
                                </Button>
                            }
                        </div>


                    </div>
                    <FeaturedImageGallery/>
                </div>

                <MapContainer center={mapCenter}/>

                <div ref={commentsRef} className="flex flex-col gap-2">
                    <Typography variant="h4" color="blue-gray">Comments</Typography>
                    <MakeComment/>
                    <div className="flex items-center gap-2">
                        <Alert
                            icon={
                                <i className="fa-solid fa-lg fa-info-circle text-[#f2e338]"></i>
                            }
                            className="rounded-none border-l-4 border-[#f2e338] bg-[#c4c92e]/10 font-medium text-[#2ec946]"
                        >
                            <Typography variant="h6" color="gray">
                                For this hotel, there is no comment yet.
                            </Typography>
                        </Alert>
                    </div>
                    <CommentsCarousel/>
                </div>


            </div>

        </MainLayout>
    )
}