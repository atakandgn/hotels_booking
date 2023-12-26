import React from "react";
// import {Footer} from "../Components/Footer/Footer";
// import ScrollTop from "../Components/Extra/ScrollTop";


function MainLayout({children}) {
    return (
        <div>
            {/* <ComplexNavbar/> */}
            <div className="min-h-[100vh] lg:px-0">{children}</div>
            {/* <ScrollTop/> */}
            {/* <Footer className="fixed bottom"/> */}
        </div>
    )
}

export default MainLayout;