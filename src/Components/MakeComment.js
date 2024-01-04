import React, {useState} from "react";
import toast from 'react-hot-toast';
import {StarIcon} from "@heroicons/react/20/solid";

const saveComment = async (rating, comment) => {
    return new Promise((resolve, reject) => {
        // Add your actual save comment logic here
        // For now, let's just simulate success
        setTimeout(() => {
            resolve("Comment sent successfully!");
        }, 1000);
    });
};

export default function MakeComment() {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");

    const handleStarClick = (selectedRating) => {
        setRating(selectedRating);
    };

    const handleCommentChange = (e) => {
        setComment(e.target.value);
    };

    const handleSendClick = () => {
        // Check if rating and comment are provided
        if (rating === 0 || comment.trim() === "") {
            toast.error("Please select a rating and enter a comment.");
        } else {
            // Use toast.promise for asynchronous operations
            toast.promise(
                saveComment(rating, comment),
                {
                    loading: 'Sending...',
                    success: (data) => <b>{data}</b>,
                    error: <b>Please select a rating and enter a comment.</b>,
                }
            );
        }
    };

    return (
        <div
            className="flex w-full flex-row items-center justify-between gap-2 rounded-full border border-gray-600/10 bg-gray-600/5 sm:p-3 p-1
            transition-all duration-200 l hover:border-gray-800/5 hover:bg-gray-800/5">
            <textarea
                className="w-full resize-none bg-transparent border-none outline-none text-gray-900/50 h-[50px] p-3 max-w-[1000px] sm:text-base text-sm"
                rows="1"
                placeholder="Your Comment Here ..."
                value={comment}
                onChange={handleCommentChange}
            ></textarea>

            <div className="flex items-center gap-2">
                <div className="flex sm:flex-nowrap xs:flex-nowrap flex-wrap items-center justify-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <StarIcon
                            key={star}
                            className={`h-6 w-6 cursor-pointer ${star <= rating ? 'text-yellow-500' : 'text-gray-300'}`}
                            onClick={() => handleStarClick(star)}
                        />
                    ))}
                </div>
                <div className="flex items-center justify-center w-10 h-10">
                    <button
                        className="relative w-10 h-10 select-none rounded-full text-center align-middle font-sans
                    font-medium uppercase text-gray-900 transition-all hover:bg-gray-900/10 active:bg-gray-900/20 p-1"
                        type="button"
                        onClick={handleSendClick}
                    >
                <span className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
                    <svg
                        width="20"
                        height="20"
                        viewBox="0 0 14 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M12.9576 7.71521C13.0903 7.6487 13.2019 7.54658 13.2799 7.42027C13.3579 7.29396 13.3992 7.14845 13.3992 7.00001C13.3992 6.85157 13.3579 6.70606 13.2799 6.57975C13.2019 6.45344 13.0903 6.35132 12.9576 6.28481L1.75762 0.684812C1.61875 0.615327 1.46266 0.587759 1.30839 0.605473C1.15412 0.623186 1.00834 0.685413 0.888833 0.784565C0.769325 0.883716 0.681257 1.01551 0.635372 1.16385C0.589486 1.3122 0.587767 1.4707 0.630424 1.62001L1.77362 5.62001C1.82144 5.78719 1.92243 5.93424 2.06129 6.03889C2.20016 6.14355 2.36934 6.20011 2.54322 6.20001H6.20002C6.4122 6.20001 6.61568 6.2843 6.76571 6.43433C6.91574 6.58436 7.00002 6.78784 7.00002 7.00001C7.00002 7.21218 6.91574 7.41567 6.76571 7.5657C6.61568 7.71573 6.4122 7.80001 6.20002 7.80001H2.54322C2.36934 7.79991 2.20016 7.85647 2.06129 7.96113C1.92243 8.06578 1.82144 8.21283 1.77362 8.38001L0.631223 12.38C0.588482 12.5293 0.590098 12.6877 0.635876 12.8361C0.681652 12.9845 0.769612 13.1163 0.889027 13.2155C1.00844 13.3148 1.15415 13.3771 1.30838 13.3949C1.46262 13.4128 1.61871 13.3854 1.75762 13.316L12.9576 7.71601V7.71521Z"
                            fill="#90A4AE"
                        ></path>
                    </svg>
                </span>
                    </button>
                </div>
            </div>

        </div>
    );
}
