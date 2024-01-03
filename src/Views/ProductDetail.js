import React, {useRef} from "react";
import MainLayout from "../MainLayout";
import {Alert, Chip, Tooltip, Typography} from "@material-tailwind/react";
import {ChevronRightIcon} from "@heroicons/react/16/solid";
import {FeaturedImageGallery} from "../Components/ImageGallery";
import MapContainer from "../Components/MapContainer";
import CommentsCarousel from "../Components/Comments";
import MakeComment from "../Components/MakeComment";


export default function ProductDetail() {
    const mapCenter = [40.267093575747516, 14.933098165767607];
    // ref for comments section
    const commentsRef = useRef(null);

    // Function to scroll to the comments section
    const scrollToComments = () => {
        if (commentsRef.current) {
            commentsRef.current.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <MainLayout>
            <div className="flex flex-col gap-8">
                <div className="grid lg:grid-cols-2 grid-cols-1 gap-2">
                    <div className="flex flex-col gap-2">
                        <div className="flex flex-col gap-2">
                            <Typography variant="h3" color="blue-gray">
                                Holiday Inn Resort Bodrum, bir IHG Hotel
                            </Typography>
                            <Typography variant="h6" color="gray">
                                Holiday Inn Resort Bodrum, located in the Zeytinlikahve area, one of the most beautiful
                                bays in Bodrum, offers guests a unique holiday experience with its beachfront location.
                                The hotel has its own beach and pier. There is one outdoor swimming pool and one indoor
                                swimming pool at the hotel. Additionally, there is a children's pool for the younger
                                guests. Throughout your stay at the hotel, you can enjoy a fitness center and tennis
                                court for sports activities. The hotel's SPA center provides sauna, Turkish bath, and
                                massage services.
                            </Typography>
                        </div>

                        <div className="flex items-center gap-2">
                            <Chip color="green" value="8.4"/>
                            <Typography variant="h6" color="gray"> Perfect</Typography>
                        </div>

                        <Typography variant="small" color="indigo" onClick={scrollToComments}
                                    className="flex items-center hover:text-indigo-300 hover:scale-105 w-max cursor-pointer transition duration-200">
                            See all 3 reviews
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
                                <Typography variant="h3" color="blue-gray">1.500 TL</Typography>
                                <Typography variant="h6" color="gray" className="line-through">1.200 TL</Typography>
                            </div>
                            <Typography variant="h6" color="gray">The price includes taxes and fees for one
                                night.</Typography>
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