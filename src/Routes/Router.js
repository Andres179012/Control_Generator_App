import React from 'react'
import {Route, Routes} from "react-router-dom";
import AccesosView from '../components/Accesos_View';
import Home from '../components/HomePage';
import Login from '../Screen/Login';

export default function Router() {
  return (
    <div>
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/accesos" element={<AccesosView/>} />
        </Routes>
    </div>
  )
}
