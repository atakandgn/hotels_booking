import React, {useEffect, useState} from 'react';
import {
    Button,
    Input,
    Option,
    Popover,
    PopoverContent,
    PopoverHandler,
    Select,
    Typography
} from "@material-tailwind/react";
import {Modal} from "./Modal";
import countriesData from '../countries+states+cities.json';
import {Link, useNavigate} from "react-router-dom";
import axios from 'axios';
import toast from "react-hot-toast";
import {ArrowLeftStartOnRectangleIcon} from "@heroicons/react/24/outline";
import SelectBox from "./SelectBox";
import {getDecodedToken} from "./auth";
import GoogleAuth from "./GooglAuth";

import mainLogo from '../../src/Helpers/mainLogo.png';

export default function Navbar() {
    const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const navigate = useNavigate();
    const storageToken = getDecodedToken();
    const [loginData, setLoginData] = useState({});

    const [decodedToken, setDecodedToken] = useState(null);
    // console.log("decodedToken:", decodedToken)
    const [lastActivity, setLastActivity] = useState(new Date().getTime());

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

    const logOut = () => {
        localStorage.removeItem('token');
        setDecodedToken(null);
        window.location.reload();
    }

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:5000/login', {
                username: loginData.username,
                password: loginData.password,
            });
            if (response.status === 200) {
                setIsLoginModalOpen(false);
                toast.success('Login successful!');
                localStorage.setItem('token', response.data.token);

                // Update last activity timestamp
                setLastActivity(new Date().getTime());

                setTimeout(() => {
                    window.location.reload();
                }, 500);
            }
        } catch (error) {
            console.error(error);
            toast.error('Please check login information!');
        } finally {
            // Clear the username and password fields
            setLoginData({
                ...loginData,
                username: '',
                password: '',
            });
        }
    };

    useEffect(() => {
        // Define an async function to get decoded token
        const fetchDecodedToken = async () => {
            const storedToken = localStorage.getItem('token');
            if (storedToken) {
                const decoded = await getDecodedToken(storedToken);
                setDecodedToken(decoded);

                // Update last activity timestamp
                setLastActivity(new Date().getTime());
            }
        };

        // Call the async function
        fetchDecodedToken();
    }, []);


    useEffect(() => {
        // Check for session timeout every minute
        const timeoutInterval = setInterval(() => {
            const currentTime = new Date().getTime();
            const sessionTimeout = 5 * 60 * 1000; // 15 second in milliseconds

            // Check if the session has timed out
            if (currentTime - lastActivity > sessionTimeout) {
                // Clear token and reset decodedToken
                localStorage.removeItem('token');
                setDecodedToken(null);
                navigate(`/`);
            }
        }, 60 * 1000); // Check every minute

        // Clear interval on component unmount
        return () => clearInterval(timeoutInterval);
    }, [lastActivity]);


    // CITY SELECT STATES
    const [selectedCountry, setSelectedCountry] = useState('');
    const [selectedCity, setSelectedCity] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const handleCountryChange = (value) => {
        setSelectedCountry(value);
        setSelectedCity(''); // Reset selectedCity when country changes
        setSelectedDistrict(''); // Reset selectedDistrict when country changes
    };

    const handleCityChange = (value) => {
        setSelectedCity(value);
        setSelectedDistrict(''); // Reset selectedDistrict when city changes
    };

    const handleDistrictChange = (value) => {
        setSelectedDistrict(value);
    };


    const [registerData, setRegisterData] = useState({
        name: '',
        surname: '',
        email: '',
        username: '',
        phone: '',
        gender: '',
        password: '',
        passwordConfirm: '',
        country: '',
        city: '',
        district: '',
        coupon_code: '',
    });



    const registerUser = async () => {
        try {
            if (!registerData?.name) {
                toast.error('Please enter your name!');
                return;
            }
            if (!registerData?.surname) {
                toast.error('Please enter your surname!');
                return;
            }
            if (!registerData?.email) {
                toast.error('Please enter your email!');
                return;
            }
            if (!registerData?.username) {
                toast.error('Please enter your username!');
                return;
            }
            if (!registerData?.phone) {
                toast.error('Please enter your phone number!');
                return;
            }
            if (!registerData.gender){
                toast.error('Please select your gender!');
            }
            if (!selectedCountry) {
                toast.error('Please select your country!');
                return;
            }
            if (!registerData?.password) {
                toast.error('Please enter your password!');
                return;
            }
            if (!registerData?.passwordConfirm) {
                toast.error('Please enter your password again!');
                return;
            }
            if (registerData?.password !== registerData?.passwordConfirm) {
                toast.error('Passwords do not match!');
                return;
            }
            const response = await axios.post(
                'http://localhost:5000/register',
                {
                    name: registerData.name,
                    surname: registerData.surname,
                    username: registerData.username,
                    email: registerData.email,
                    phone: registerData.phone,
                    gender: registerData.gender,
                    password: registerData.password,
                    passwordConfirm: registerData.passwordConfirm,
                    country: selectedCountry,
                    city: selectedCity ? selectedCity : "-",
                    district: selectedDistrict ? selectedDistrict : "-",
                    coupon_code: registerData.coupon_code ? registerData.coupon_code : "DEFAULT",
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            console.log("response: ", response)

            if (response.status === 200) {
                setIsRegisterModalOpen(false);
                console.log('Registration successful!');
                toast.success('Registration successful!');
                setIsLoginModalOpen(true);
                console.log(response.data);
            } else {
                console.error('Unexpected response:', response);
            }
        } catch (error) {
            toast.error(error ? error.response.data : 'Registration failed!');
            console.error('Registration failed:', error);

            if (error.response) {
                console.error('Server response status:', error.response.status);
                console.error('Server response data:', error.response.data);
            } else if (error.request) {
                console.error('No response received from the server');
            } else {
                console.error('Error setting up the request:', error.message);
            }
        }
    };


    const handleLoginSuccess = (decodedUser) => {
        console.log('Login Successful decodedUser:', decodedUser);
    };

    const handleLoginError = (errorMessage) => {
        console.error('Login Error:', errorMessage);
    };

    return (
        <div className="container mx-auto flex justify-between items-center w-full h-[100px]">
            <Link to="/" className="hover:scale-95 transition duration-300 hover:duration-200">
                <img className="object-contain lg:w-[300px] lg:h-[75px] w-[150px] h-[75px]"
                     src={mainLogo}
                     alt=""/>
            </Link>
            <div className="flex items-center gap-4">
                {storageToken ? (
                    <div className="flex gap-4 items-center">
                        <Popover placement="bottom">
                            <PopoverHandler>
                                <Button className="flex items-center gap-4 py-2.5">
                                    <img className="w-12 h-12 rounded-full border border-white"
                                         src={decodedToken?.picture}
                                         alt=""/>
                                    <div>
                                        <Typography variant="h6">Welcome,</Typography>
                                        <Typography variant="small" color="gray" className="font-normal">
                                            <i>{storageToken?.name} {storageToken?.surname}</i>
                                        </Typography>
                                    </div>
                                </Button>
                            </PopoverHandler>
                            <PopoverContent className="flex items-center justify-center gap-2 cursor-pointer"
                                            onClick={logOut}>
                                <ArrowLeftStartOnRectangleIcon className="h-6 w-6"/>
                                <Typography color="blue-gray" className="text-center font-normal">
                                    Log Out
                                </Typography>
                            </PopoverContent>
                        </Popover>
                    </div>
                ) : (
                    <div className="flex gap-4 items-center">
                        <Button variant="outlined" onClick={openLoginModal}>Log In</Button>
                        <Button variant="gradient" onClick={openRegisterModal}>Sign Up</Button>
                    </div>
                )}

                {/*<Drawler/>*/}

            </div>
            <Modal
                long={"sm:h-max sm:overflow-hidden h-[42rem] overflow-scroll"}
                size={"sm"}
                header={<h1>Sign Up</h1>}
                body={
                    <div className="flex flex-col gap-4">
                        <div className="flex sm:flex-row flex-col gap-4">
                            <Input
                                variant="standard"
                                label="Name"
                                placeholder="Name"
                                onChange={(e) => setRegisterData({...registerData, name: e.target.value})}
                            />
                            <Input
                                variant="standard"
                                label="Surname"
                                placeholder="Surname"
                                onChange={(e) => setRegisterData({...registerData, surname: e.target.value})}
                            />
                        </div>
                        <div className="flex sm:flex-row flex-col gap-4">
                            <Input
                                variant="standard"
                                label="E-Mail"
                                placeholder="Standard"
                                onChange={(e) => setRegisterData({...registerData, email: e.target.value})}
                            />
                            <Input
                                variant="standard"
                                label="Username"
                                placeholder="Username"
                                onChange={(e) => setRegisterData({...registerData, username: e.target.value})}
                            />
                        </div>
                        <div className="flex sm:flex-row flex-col gap-4">
                            <Input
                                variant="standard"
                                label="Phone Number"
                                placeholder="Phone Number"
                                type="tel"
                                value={registerData.phone}
                                onChange={(e) => {
                                    const inputValue = e.target.value;
                                    if (!isNaN(inputValue) || inputValue === '') {
                                        setRegisterData({...registerData, phone: inputValue});
                                    }
                                }}
                            />

                            <Select
                                variant="standard"
                                label="Gender"
                                onChange={(value) => setRegisterData({...registerData, gender: value})}
                            >
                                <Option value="1">Male</Option>
                                <Option value="2">Female</Option>
                            </Select>
                        </div>

                        <div className="flex sm:flex-row flex-col gap-4">
                            <SelectBox
                                smallLabel={'Country'}
                                value={selectedCountry}
                                onChange={(value) => handleCountryChange(value)}
                                label="Choose a country"
                                options={countriesData.map((country) => country.name)}
                            />

                            <SelectBox
                                smallLabel={'State'}
                                value={selectedCity}
                                onChange={(value) => handleCityChange(value)}
                                label="Choose a state"
                                options={
                                    selectedCountry
                                        ? countriesData.find((country) => country.name === selectedCountry)?.states.map((state) => state.name)
                                        : []
                                }
                                disabled={!selectedCountry}
                            />
                        </div>
                        <div className="flex sm:flex-row flex-col gap-4">
                            <SelectBox
                                smallLabel={'District'}
                                value={selectedDistrict}
                                onChange={(value) => handleDistrictChange(value)}
                                label="Choose a city"
                                options={
                                    selectedCity
                                        ? countriesData
                                            .find((country) => country.name === selectedCountry)
                                            ?.states.find((state) => state.name === selectedCity)
                                            ?.cities.map((city) => city.name)
                                        : []
                                }
                                disabled={!selectedCity}
                            />

                            <Input
                                variant="standard"
                                label="Enter Coupon"
                                value={registerData.coupon_code}
                                onChange={(e) => setRegisterData({...registerData, coupon_code: e.target.value})}
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <div className="flex sm:flex-row flex-col gap-4">
                                <Input
                                    variant="standard"
                                    type="password"
                                    label="Password"
                                    onChange={(e) => setRegisterData({...registerData, password: e.target.value})}
                                />
                                <Input
                                    variant="standard"
                                    type="password"
                                    label="Password Again"
                                    onChange={(e) => setRegisterData({
                                        ...registerData,
                                        passwordConfirm: e.target.value
                                    })}
                                />
                            </div>
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
                                Use at least 8 characters, one uppercase, one lowercase, and one number.
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

                        <Button
                            variant="filled"
                            color="lightBlue"
                            className="w-full mt-4"
                            onClick={registerUser}
                        >
                            Sign Up
                        </Button>
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
                        <Input
                            variant="standard"
                            label="Username"
                            placeholder="Standard"
                            onChange={(e) => setLoginData({...loginData, username: e.target.value})}
                        />
                        <div>
                            <Input
                                variant="standard"
                                type="password"
                                label="Password"
                                placeholder="Standard"
                                onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                            />
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
                                Password contains at least 8 characters, one uppercase, one lowercase and one number.
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
                        <Button onClick={handleLogin}>Sign In</Button>
                        <GoogleAuth
                            onLoginSuccess={handleLoginSuccess}
                            onLoginError={handleLoginError}
                        />
                    </div>
                }
            />
        </div>
    );
}
