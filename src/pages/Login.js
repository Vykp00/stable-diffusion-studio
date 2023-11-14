import React, { useState } from 'react';
import '../index.css'
import HTTP from '../httpClient';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/esm/Container';
import Card from 'react-bootstrap/Card';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const resp = await HTTP.post('https://studio-ai.onrender.com/auth/login', formData);
      // Handle successful login here
      window.location.href = "/";
    } catch (error) {
      // Handle login error
      if (error.response.status === 401) {
        alert("Invalid credentials");
      }

    }
  };

  return (
    <Card style={{ width: '45rem' }} className="col-md-5 mx-auto">
      <Container>
        <h1>Login</h1>
        <Form onSubmit={handleLogin}>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <br></br>
            <input
              required
              type="text"
              name="email"
              placeholder="enter email address"
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
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              id=""
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form >
      </Container>
    </Card>
  );
}

export default Login;
