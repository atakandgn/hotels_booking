import React from "react";
import Navbar from "./Components/Navbar";
import {Footer} from "./Components/Footer";
import {Toaster} from "react-hot-toast";
import ScrollTop from "./Components/ScrollTop";

// import ScrollTop from "../Components/Extra/ScrollTop";


function MainLayout({children}) {
    return (
        <div className="">
            <Navbar/>
            <div className="container mx-auto min-h-[100vh] lg:px-0 px-2">{children}</div>
             <ScrollTop/>
            <Footer className="fixed bottom"/>
            <Toaster/>
        </div>
    )
}

export default MainLayout;