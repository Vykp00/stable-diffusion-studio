// Importing modules
import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import './index.css';
import BrandHeader from "./components/Header";
import ModelForm from "./components/ModelForm";
import Footer from "./components/Footer";
import HTTP from "./httpClient";
import Stack from 'react-bootstrap/Stack';

//add Authorization
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Make a GET request to the server to fetch user data
    HTTP.get('https://studio-ai.onrender.com/@me')
      .then(response => {
        setUser(response.data); // Update the state with if user is logged in
        setIsLoggedIn(true);
      })
      .catch(error => {
        console.error('Unauthorized', error);
        setIsLoggedIn(false)
        window.location.href = "/auth"; // Navigate user to guest page if they're no logged in
      });
  }, [isLoggedIn]);
  return (
    <React.Fragment>
      {isLoggedIn && <BrandHeader />}
      <Stack gap={5}>
        <Outlet />
        <ModelForm />
        {isLoggedIn && <Footer />}
      </Stack>
    </React.Fragment>
  );
}

export default App;