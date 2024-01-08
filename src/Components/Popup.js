import React, {useState, useEffect} from "react";
import {Alert, Typography} from "@material-tailwind/react";
import { InformationCircleIcon} from "@heroicons/react/24/outline";

export function Popup({customClass,headerTxt, bodyTxt}) {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const popupClosedTimestamp = sessionStorage.getItem("popupClosedTimestamp");

        if (!popupClosedTimestamp) {
            setOpen(true);
        } else {
            const fiveMinutes = 5 * 60 * 1000;
            const currentTime = new Date().getTime();

            if (currentTime - parseInt(popupClosedTimestamp) < fiveMinutes) {
                setOpen(false);
            } else {
                setOpen(true);
            }
        }
    }, []);

    function Icon() {
        return (
            <InformationCircleIcon color={"#13359a"} className="w-6 h-6 mr-2" aria-hidden="true"/>
        );
    }

    const handleClose = () => {
        setOpen(false);
        const timestamp = new Date().getTime();
        sessionStorage.setItem("popupClosedTimestamp", timestamp.toString());
    };

    return (
        <div className={customClass}>
            {open && (
                <Alert
                    variant={"outlined"}
                    className="fixed bottom-[10%] z-50 w-max bg-blue-200 border-slate-400"
                    open={open}
                    onClose={handleClose}
                    icon={<Icon/>}
                    animate={{
                        mount: {y: 0},
                        unmount: {y: 100},
                    }}
                >
                    <Typography variant="h5" color="white">
                        {headerTxt}
                    </Typography>
                    <Typography color="white" variant="h6" className="mt-2 ">
                        {bodyTxt}
                    </Typography>

                </Alert>
            )}
        </div>
    );
}
