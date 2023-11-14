import React, { useEffect, useState } from "react";
import { Route, useNavigate } from "react-router-dom";
import HTTP from "../httpClient";

const ProtectedRoute = (props) => {
    const navigate = useNavigate();
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
                setIsLoggedIn(false);
                return navigate('/auth/login'); // Navigate user to login page if they're no logged in
            });
    }, [isLoggedIn]);
    return (
        <React.Fragment>
            {
                isLoggedIn ? props.children : null
            }
        </React.Fragment>
    )
}

export default ProtectedRoute;