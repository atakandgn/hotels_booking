import React from 'react';
import './index.css';
import {
    BrowserRouter, Route, Routes,
} from "react-router-dom";
import HomePage from "./Views/Home";
import NotFound from "./Views/NotFound";
import Detail from "./Views/Detail";
function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="*" element={<NotFound/>}/> {/* 404 */}
                <Route path="/detail" element={<Detail/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
