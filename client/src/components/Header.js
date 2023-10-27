import React, { useState, useEffect } from 'react';
import HTTP from '../httpClient';

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar'
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';

function BrandHeader() {
    //Get User
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Make a GET request to the server to fetch user data
        HTTP.get('http://127.0.0.1:5000/@me')
            .then(response => {
                setUser(response.data); // Update the state with the user data
                setLoading(false);
            })
            .catch(error => {
                console.error('Failed to fetch user data:', error);
                setLoading(false);
            });
    }, []);


    //Sign out User
    const signoutUser = async () => {
        const resp = await HTTP.post("http://127.0.0.1:5000/auth/signout");
        window.location.href = "/auth";
    }

    if (loading) {
        return <p>Loading user data...</p>;
    }
    // If user is logged in
    if (user) {
        return (
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand href="/">
                        <img
                            alt="logo"
                            src="../static/brush-svg-large.svg"
                            width="15%"
                            height="15%"
                            className="d-inline-block align-top"
                        />{' '}
                        Studio.ai
                    </Navbar.Brand>
                    <Nav>
                        <Button href="/" variant="light">{user.email}</Button>{' '}
                        <Button href="/gallery" variant="outline-primary"> My Gallery</Button>{' '}
                        <Button onClick={signoutUser} variant="secondary">Sign out</Button>{' '}
                    </Nav>
                </Container>
            </Navbar>
        );
    }

    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="/auth">
                    <img
                        alt="logo"
                        src="../static/brush-svg-large.svg"
                        width="15%"
                        height="15%"
                        className="d-inline-block align-top"
                    />{' '}
                    Studio.ai
                </Navbar.Brand>
                <Nav>
                    <Button href="/auth/login" variant="primary">Login</Button>{' '}
                    <Button href="/auth/signup" variant="light">Signup</Button>{' '}
                </Nav>
            </Container>
        </Navbar>
    );
}

export default BrandHeader;