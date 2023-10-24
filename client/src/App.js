// Importing modules
import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css';
import BrandHeader from "./components/Header";
import Login from "./pages/Login";
import ImageDisplay from "./components/ImageDisplay";
import NotFound from "./pages/NotFound";
import Signup from "./pages/Signup";
import ModelForm from "./components/ModelForm";


function App() {
  return (
    <div className="App">
      <BrandHeader />

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ModelForm />}/>
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path='model?prompt=${prompt}&api={api}' element={<ModelForm/>}/>
          <Route path='*' element={<NotFound />}/>
        </Routes>
      </BrowserRouter>
    </div >
  );
}

export default App;