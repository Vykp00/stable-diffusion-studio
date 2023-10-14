// Importing modules
import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import BrandHeader from "./components/Header";
import Login from "./pages/Login";
import HomePage from "./pages/Home";
import NotFound from "./pages/NotFound";
import Signup from "./pages/Signup";


function App() {
  return (
    <div className="App">
      <BrandHeader />

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path='*' element={<NotFound />}/>
        </Routes>
      </BrowserRouter>
    </div >
  );
}

export default App;