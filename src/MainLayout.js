import React from "react";
import Navbar from "./Components/Navbar";
import {Footer} from "./Components/Footer";

// import ScrollTop from "../Components/Extra/ScrollTop";


function MainLayout({children}) {
    return (
        <div className="">
            {/* <ComplexNavbar/> */}
            <Navbar/>
            <div className="container mx-auto min-h-[100vh] lg:px-0 px-2">{children}</div>
            {/* <ScrollTop/> */}
             <Footer className="fixed bottom"/>
        </div>
    )
}

export default MainLayout;