// auth.js
import { jwtDecode } from 'jwt-decode';

export const getToken = () => {
    const token = localStorage.getItem('token');
    console.log("localStorage.getItem('token'):", token);
    return token;
};

export const getDecodedToken = () => {
    const token = getToken();
    if (token) {
        return jwtDecode(token);
    }
    return null;
};
