import React, { useState } from 'react';
import HTTP from '../httpClient';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/esm/Container';
import Card from 'react-bootstrap/Card';

function Signup() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
    });

    // Verify Registration
    const [error, setError] = useState(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSignup = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            const resp = await HTTP.post('https://studio-ai.onrender.com/auth/signup', formData);
            // Handle successful signup here
            if (resp.status === 200) {
                // Redirect or show a success message
                window.location.href = "/auth/login";
            } else {
                setError('Failed to sign up. Please try again.');
            }
        } catch (error) {
            // Handle Sign up error
            setError('Failed to sign up. Please try again.');
        }

    };

    return (
        <Card style={{ width: '45rem' }} className="col-md-5 mx-auto">
            <Container>
                <h1>Create an account</h1>
                <Form onSubmit={handleSignup}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <br></br>
                        <input
                            required
                            type="text"
                            name="email"
                            placeholder="email@example.com"
                            value={formData.email}
                            onChange={handleInputChange}
                            id=""
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <br></br>
                        <input
                            required
                            type="password"
                            name="password"
                            placeholder="*******"
                            value={formData.password}
                            onChange={handleInputChange}
                            id=""
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Confirm Password</Form.Label>
                        <br></br>
                        <input
                            required
                            type="password"
                            name="confirmPassword"
                            placeholder="*******"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
                {error && <p>{error}</p>}
            </Container>
        </Card>
    );
}

export default Signup;
