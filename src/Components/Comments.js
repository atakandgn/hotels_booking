import React from 'react';
import Slider from 'react-slick';
import {StarIcon} from '@heroicons/react/20/solid';
import {Avatar, Tooltip, Typography} from '@material-tailwind/react';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const commentsData = [
    {
        name: 'Alice Johnson',
        username: '@alice123',
        rating: 4,
        comment:
            'Had a wonderful stay at this hotel! The staff was friendly, the room was clean, and the amenities were great. Will definitely come back.',
    },
    {
        name: 'Bob Smith',
        username: '@bob85',
        avatarSrc: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1061&q=80',
        rating: 5,
        comment:
            'Amazing experience! The hotel exceeded my expectations. Beautiful rooms, delicious food, and excellent service. Highly recommend!',
    },
    {
        name: 'Eva Miller',
        username: '@eva_traveler',
        avatarSrc: 'https://static.vecteezy.com/system/resources/previews/002/002/257/non_2x/beautiful-woman-avatar-character-icon-free-vector.jpg',
        rating: 3,
        comment:
            'Good overall. The location is convenient, and the staff is friendly. However, the room could use some modernization. Decent value for the price.',
    },
    {
        name: 'David Brown',
        username: '@david_traveler',
        avatarSrc: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80',
        rating: 4,
        comment:
            'Enjoyed my stay at the hotel. Comfortable beds, clean facilities, and a pleasant atmosphere. The breakfast options were a nice touch!',
    },
    {
        name: 'Sophie Turner',
        username: '@sophie_traveler',
        avatarSrc: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1760&q=80',
        rating: 5,
        comment:
            'Exceptional service! The staff went above and beyond to make our stay memorable. The hotel is in a perfect location, and the room was spacious and comfortable.',
    },
];

const CommentsCarousel = () => {

    const settings = {
        dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 2,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        pauseOnHover: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1,
                },
            },
        ]
    };
    return (
            <Slider {...settings} className="w-full sm:overflow-visible">
                {commentsData.map((comment, index) => (
                    <div className="p-4" key={index}>
                        <div className="mb-4">
                            <div className="min-h-[170px] max-h-[180px] shadow-md bg-white p-4 border rounded-md cursor-pointer">
                                <div className="flex justify-between items-center mb-6">
                                    <div className="flex items-center gap-1.5">
                                        <Avatar src={comment?.avatarSrc ? comment.avatarSrc : "https://static.vecteezy.com/system/resources/previews/024/183/502/original/male-avatar-portrait-of-a-young-man-with-a-beard-illustration-of-male-character-in-modern-color-style-vector.jpg"
                                        } alt="avatar" variant="rounded"/>
                                        <div className="flex flex-col">
                                            <strong className="text-gray-800 text-lg">{comment?.name}</strong>
                                            <span className="text-gray-600 text-sm">{comment?.username}</span>
                                        </div>
                                    </div>
                                    <div className="flex text-yellow-500">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <StarIcon
                                                key={star}
                                                className={`h-5 w-5 ${star <= comment.rating ? 'text-yellow-500' : 'text-gray-300'}`}
                                            />
                                        ))}
                                    </div>
                                </div>
                                <Tooltip
                                    placement="bottom"
                                    className="border border-blue-gray-50 bg-white px-4 py-3 shadow-xl shadow-black/10"
                                    content={
                                        <div className="w-80">
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal opacity-80"
                                            >
                                                {comment.comment}
                                            </Typography>
                                        </div>
                                    }
                                >
                                    <p className="text-gray-700 text-sm text-truncate-3">{comment.comment}</p>
                                </Tooltip>
                            </div>
                        </div>
                    </div>
                ))}
            </Slider>
    );
};

export default CommentsCarousel;
