import React from 'react';
import './index.css';
import {
    BrowserRouter, Route, Routes,
} from "react-router-dom";
import HomePage from "./Views/Home";
import NotFound from "./Views/NotFound";
import HotelDetail from "./Views/HotelDetail";

function App() {
    return (
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<HomePage/>}/>
                    <Route path="*" element={<NotFound/>}/> {/* 404 */}
                    <Route path="/product/:hotelID" element={<HotelDetail/>}/>
                </Routes>
            </BrowserRouter>
    );
}

export default App;
