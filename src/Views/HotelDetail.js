import React, {useEffect, useRef, useState} from "react";
import MainLayout from "../MainLayout";
import {Alert, Button, Chip, Tooltip, Typography} from "@material-tailwind/react";
import {ImageGallery} from "../Components/ImageGallery";
import MapContainer from "../Components/MapContainer";
import CommentsCarousel from "../Components/Comments";
import MakeComment from "../Components/MakeComment";
import axios from "axios";
import {useParams} from "react-router-dom";
import {getDecodedToken} from "../Components/auth";
import toast from "react-hot-toast";
import {ChatBubbleBottomCenterTextIcon} from "@heroicons/react/24/outline";

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
    const mapCenter = [
        hotelData && hotelData.hotel_latitude,
        hotelData && hotelData.hotel_longitude
    ];

    const makeTheReservation = async (rating, comment) => {
        return new Promise((resolve, reject) => {
            //  Comment Functionality
            // For now, its just simulate success
            setTimeout(() => {
                resolve("Comment sent successfully!");
            }, 1000);
        });
    };

    const makeReservation = () => {
        toast.promise(
            new Promise((resolve, reject) => {
                setTimeout(() => {
                    // Simulate a successful reservation after a delay
                    (decodedToken ?
                        resolve("Reservation is made successfully!")
                        :
                        reject("Please Login to Make Reservation")
                    );
                }, 1000);
            }),
            {
                loading: 'Making Reservation...',
                success: <b>Reservation is made successfully!</b>,
                error: <b>Please Login to Make Reservation</b>,
            }
        );
    };

    const hotelFeatureData = hotelData?.hotel_features?.map((feature) => {
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
    });
    return (
        <MainLayout>
            <div className="flex flex-col gap-8">
                <div className="grid lg:grid-cols-2 grid-cols-1 gap-2 my-4">
                    <div className="flex flex-col gap-2">
                        <div className="flex flex-col gap-2">
                            <Typography variant="h3" color="blue-gray">
                                {hotelData?.hotel_name}
                            </Typography>
                            <Typography variant="h6" color="gray">
                                {hotelData?.hotel_description}
                            </Typography>
                        </div>


                        {
                            (() => {
                                switch (hotelData?.hotel_rating) {
                                    case 5:
                                        return (
                                            <div className="flex items-center gap-2">
                                                <Chip color="green" value={hotelData?.hotel_rating * 1.5}/>
                                                <Typography variant="h6" color="gray"> Excellent</Typography>
                                            </div>
                                        );
                                    case 4:
                                        return (
                                            <div className="flex items-center gap-2">
                                                <Chip color="green" value={hotelData?.hotel_rating * 1.5}/>
                                                <Typography variant="h6" color="gray"> Amazing</Typography>
                                            </div>
                                        );
                                    case 3:
                                        return (
                                            <div className="flex items-center gap-2">
                                                <Chip color="green" value={hotelData?.hotel_rating * 1.5}/>
                                                <Typography variant="h6" color="gray"> Very Good</Typography>
                                            </div>
                                        );
                                    case 2:
                                        return (
                                            <div className="flex items-center gap-2">
                                                <Chip color="green" value={hotelData?.hotel_rating * 1.5}/>
                                                <Typography variant="h6" color="gray"> Good</Typography>
                                            </div>
                                        );
                                    case 1:
                                        return (
                                            <div className="flex items-center gap-2">
                                                <Chip color="green" value={hotelData?.hotel_rating * 1.5}/>
                                                <Typography variant="h6" color="gray"> Fair</Typography>
                                            </div>
                                        );
                                    default:
                                        return null;
                                }
                            })()
                        }
                        <Typography variant="small" color="indigo" onClick={scrollToComments}
                                    className="flex items-center hover:text-indigo-300 hover:scale-105 w-max cursor-pointer transition duration-200">
                            {
                                hotelData?.hotel_comments > 0 ?
                                    (
                                        <div className="flex items-center gap-1">
                                            See all {hotelData?.hotel_comments} reviews
                                            <ChatBubbleBottomCenterTextIcon className="w-5 h-5"/>
                                        </div>
                                    )
                                    : (
                                        <div className="flex items-center gap-1">
                                            Be the first to review
                                            <ChatBubbleBottomCenterTextIcon className="w-5 h-5"/>
                                        </div>
                                    )
                            }

                        </Typography>
                        {/*Hotel Features*/}
                        <div className="flex items-center gap-2 flex-wrap">
                            <Typography variant="h4" color="blue-gray">Hotel Features:</Typography>
                            {
                                hotelFeatureData
                            }

                        </div>

                        {/*    price and ex price*/}
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-2">
                                <Typography variant="h3" color="blue-gray">
                                    {parseFloat(hotelData?.hotel_price - (hotelData?.hotel_price * hotelData?.hotel_discount / 100)).toLocaleString('en-US', {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                    })} ₺
                                </Typography>
                                <Typography variant="h6" color="gray" className="line-through">
                                    {/*tostring 2 digit end*/}
                                    {parseFloat(hotelData?.hotel_price).toLocaleString('en-US', {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                    })} ₺
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
                                        {parseFloat(
                                            (hotelData?.hotel_price - (hotelData?.hotel_price * hotelData?.hotel_discount / 100)) - (hotelData?.hotel_price - (hotelData?.hotel_price * hotelData?.hotel_discount / 100)) * decodedToken?.coupon_rate / 100

                                        ).toLocaleString('en-US', {
                                            minimumFractionDigits: 2,
                                            maximumFractionDigits: 2,
                                        })} ₺
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
                    <ImageGallery images={hotelData?.hotel_images}/>
                </div>

                {mapCenter[0] && mapCenter[1] ? (
                    <MapContainer center={mapCenter}/>
                ) : (
                    <div>Loading Map...</div>
                )}

                <div ref={commentsRef} className="flex flex-col gap-2">
                    <Typography variant="h4" color="blue-gray">Comments</Typography>
                    <MakeComment/>
                    {
                        hotelData?.hotel_comments > 0 ? (<CommentsCarousel/>) :
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

                    }


                </div>


            </div>

        </MainLayout>
    )
}