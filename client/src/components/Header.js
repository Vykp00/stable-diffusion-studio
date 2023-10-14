import React, { useState, useEffect } from 'react';
import HTTP from '../httpClient';

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar'
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';

function BrandHeader() {
    //Get User
    const [user, setUser] = useState(null)
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
    const signoutUser = async() => {
        const resp = await HTTP.post("http://127.0.0.1:5000/signout");
        window.location.href = "/";
    }
    
    if (loading) {
        return <p>Loading user data...</p>;
    }
    // If user is logged in
    if (user) {
        return (
            <Navbar className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand href="/">
                        <img
                            alt=""
                            src={"client/public/static/brush-svg-large.svg"}
                            className="d-inline-block align-top"
                        />{' '}
                        Studio.ai
                    </Navbar.Brand>
                    <Nav>
                        <Button href="/" variant="light">{user.email}</Button>{' '}
                        <Button onClick={signoutUser} variant="secondary">Sign out</Button>{' '}
                    </Nav>
                </Container>
            </Navbar>
        );
    }

    return (
        <Navbar className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="/">
                    <img
                        alt=""
                        src={"client/public/static/brush-svg-large.svg"}
                        className="d-inline-block align-top"
                    />{' '}
                    Studio.ai
                </Navbar.Brand>
                <Nav>
                    <Button href="/login" variant="primary">Login</Button>{' '}
                    <Button href="/signup" variant="light">Signup</Button>{' '}
                </Nav>
            </Container>
        </Navbar>
    );
}

export default BrandHeader;