import React from 'react';
import './index.css';
import {
    BrowserRouter, Route, Routes,
} from "react-router-dom";
import HomePage from "./Views/Home";
import NotFound from "./Views/NotFound";
import ProductDetail from "./Views/ProductDetail";
function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="*" element={<NotFound/>}/> {/* 404 */}
                <Route path="/product/:id" element={<ProductDetail/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
