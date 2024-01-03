import React, {useState} from 'react';
import {Button, Input, Typography} from "@material-tailwind/react";
import {Modal} from "./Modal";
import {CustomButton} from "./CustomButton";
import CitySelect from './CitySelect';
import countriesData from '../countries+states+cities.json';
import {Link} from "react-router-dom";

export default function Navbar() {
    const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

    const openRegisterModal = () => {
        setIsRegisterModalOpen(true);
        setIsLoginModalOpen(false);
    };

    const closeRegisterModal = () => {
        setIsRegisterModalOpen(false);
    };

    const openLoginModal = () => {
        setIsLoginModalOpen(true);
        setIsRegisterModalOpen(false);
    };

    const closeLoginModal = () => {
        setIsLoginModalOpen(false);
    };
    const switchForm = () => {
        setIsRegisterModalOpen(!isRegisterModalOpen);
        setIsLoginModalOpen(!isLoginModalOpen);
    };
    return (
        <div className="flex justify-between items-center w-full h-[100px] bg-slate-100 px-12">
            <Link to="/">
                <img className="object-contain lg:w-[300px] lg:h-[75px] w-[150px] h-[75px]"
                     src="https://upload.wikimedia.org/wikipedia/en/thumb/e/e4/Hotels.com_logo.svg/2560px-Hotels.com_logo.svg.png"
                     alt=""/>
            </Link>
            <div className="flex items-center">
                <div>
                    <Button onClick={openLoginModal}>Sign In</Button>
                </div>
                <div className="ml-4">
                    <Button onClick={openRegisterModal}>Sign Up</Button>
                </div>
            </div>
            <Modal
                size={"xs"}
                header={<h1>Sign Up</h1>}
                body={
                    <div className="flex flex-col gap-4">
                        <Input variant="standard" label="E-Mail" placeholder="Standard"/>
                        <CitySelect data={countriesData} variant="standard"/>
                        <div className="flex flex-col gap-2">
                            <Input variant="standard" type="password" label="Password"/>
                            <Input variant="standard" type="password" label="Password Again"/>
                            <Typography
                                variant="small"
                                color="gray"
                                className="mt-2 flex items-center gap-1 font-normal"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="-mt-px h-4 w-4"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                Use at least 8 characters, one uppercase, one lowercase and one number.
                            </Typography>
                            <Typography color="gray" className="mt-4 text-center font-normal">
                                Already have an account?
                                <button
                                    onClick={switchForm}
                                    className="font-medium text-gray-900">
                                    {" "} <b>Sign In</b> {" "}
                                </button>
                            </Typography>
                        </div>

                        <CustomButton variant={"filled"} text={"Register"} color={"lightBlue"} size={"md"}
                                      optionalClass={"flex justify-center"}/>
                    </div>
                }
                isOpen={isRegisterModalOpen}
                onClickFunction={closeRegisterModal}
            />
            <Modal
                size="xs"
                header="Sign In"
                isOpen={isLoginModalOpen}
                onClickFunction={closeLoginModal}
                body={
                    <div className="flex flex-col gap-4">
                        <Input variant="standard" label="E-Mail" placeholder="Standard"/>
                        <div>
                            <Input variant="standard" type="password" label="Password"/>
                            <Typography
                                variant="small"
                                color="gray"
                                className="mt-2 flex items-center gap-1 font-normal"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="-mt-px h-4 w-4"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                Use at least 8 characters, one uppercase, one lowercase and one number.
                            </Typography>
                            <Typography color="gray" className="mt-4 text-center font-normal">
                                Don't have an account?
                                <button
                                    onClick={switchForm}
                                    className="font-medium text-gray-900">
                                    {" "} <b>Sign Up</b> {" "}
                                </button>
                            </Typography>
                        </div>
                        <CustomButton variant={"filled"} text={"Sign In"} color={"lightBlue"} size={"md"}
                                      optionalClass={"flex justify-center"}/>
                    </div>
                }
            />
        </div>
    );
}
