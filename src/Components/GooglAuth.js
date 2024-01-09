// GoogleAuth.js
import React, { useState, useEffect } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

const GoogleAuth = ({ onLoginSuccess, onLoginError }) => {
    const [user, setUser] = useState(null);
    const [lastActivity, setLastActivity] = useState(new Date().getTime());

    const decodeIdToken = (idToken) => {
        try {
            const decoded = jwtDecode(idToken);
            return decoded;
        } catch (error) {
            console.error('Error decoding id_token:', error);
            return null;
        }
    };

    const sendTokenRequest = async (name, coupon_rate,picture) => {
        try {
            const response = await axios.post('http://localhost:5000/googleAuth', {
                name,
                coupon_rate,
                picture
            });

            console.log('Response from server:', response.data);  // Add this line

            if (response.status === 200) {
                const { token } = response.data;
                localStorage.setItem('token', token);
            } else {
                onLoginError('Error obtaining token from server');
            }

        } catch (error) {
            console.error('Error sending token request:', error);
            onLoginError('Error obtaining token from server');
        }
    };


    useEffect(() => {
        const timeoutInterval = setInterval(() => {
            const currentTime = new Date().getTime();
            const sessionTimeout = 5 * 60 * 1000; // 5 minutes in milliseconds

            // Check if the session has timed out
            if (currentTime - lastActivity > sessionTimeout) {
                // Clear token from localStorage
                localStorage.removeItem('token');
                setUser(null);
            }
        }, 60 * 1000); // Check every minute

        // Clear interval on component unmount
        return () => clearInterval(timeoutInterval);
    }, [lastActivity]);

    useEffect(() => {
        if (user && user.credential) {
            const idToken = user.credential;
            const decodedUser = decodeIdToken(idToken);

            // Handle further processing with decoded user information
            if (decodedUser) {
                // Add additional data in JSON format
                decodedUser.coupon_rate = 5;

                onLoginSuccess(decodedUser);

                // Send a request to obtain an encoded token and store it in localStorage
                sendTokenRequest(decodedUser.name, decodedUser.coupon_rate, decodedUser.picture);

                setTimeout(() => {
                    window.location.reload();
                }, 500);
            } else {
                onLoginError('Error decoding id_token');
            }
        }
    }, [user, onLoginSuccess, onLoginError]);

    const handleUserActivity = () => {
        // Update last activity timestamp
        setLastActivity(new Date().getTime());
    };

    return (
        <>
            <GoogleLogin
                onSuccess={(response) => {
                    setUser(response);
                    handleUserActivity();
                }}
                onError={() => {
                    console.log('Login Failed');
                    onLoginError('Login Failed');
                }}
            />
        </>
    );
};

export default GoogleAuth;
