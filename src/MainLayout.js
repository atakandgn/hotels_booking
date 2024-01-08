import React from "react";
import Navbar from "./Components/Navbar";
import {Footer} from "./Components/Footer";
import {Toaster} from "react-hot-toast";
import ScrollTop from "./Components/ScrollTop";
import {Popup} from "./Components/Popup";
import {PopupProvider} from "./Helpers/PopupContext";

function MainLayout({children}) {
    return (

        <PopupProvider>
            <div className="relative">
                <Popup
                    headerTxt={"Welcome to the new and improved version of the website!"}
                    bodyTxt={"Register now with <b> <u>'HELLO25'</u></b>  and get 25% discount on your first order!"}
                    customClass=""/>

                <Navbar/>
                <div className="container mx-auto min-h-[75vh] lg:px-0 px-2">{children}</div>
                <ScrollTop/>
                <Footer className="fixed bottom"/>
                <Toaster containerClassName="custom-toast-container"/>
            </div>
        </PopupProvider>

    )
}

export default MainLayout;