import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {PopupProvider} from "./Helpers/PopupContext";
import {GoogleOAuthProvider} from "@react-oauth/google";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <PopupProvider>
            <GoogleOAuthProvider clientId="731809491846-3nb76ilucghd2n1ulcrnjn726tqusdo3.apps.googleusercontent.com">
            <App/>
            </GoogleOAuthProvider>
        </PopupProvider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
