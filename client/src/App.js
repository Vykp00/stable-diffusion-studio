// Importing modules
import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import logo from './logo.svg';
import './App.css';

import Login from "./Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;