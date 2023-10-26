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
      const resp = await HTTP.post('http://127.0.0.1:5000/auth/login', formData);
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

{/*
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const canLogin = email !== '' && password !== '';

  // Handle Login
  const logInUser = async () => {
    console.log(email, password);

    try{
      const resp = await HTTP.post("http://127.0.0.1:5000/login", {
        email,
        password,
      });

      window.location.href = "/";

    } catch(error){
      if (error.response.status === 401) {
        alert("Invalid credentials");
      }
    }
  
  };

  return (
    <div>
      <h1>Login</h1>
      <form>
        <label>Email{': '}
          <input
            required
            type="text"
            placeholder="example@email.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            id=""
          />
        </label>
        {' '}
        <label>Password{': '}
          <input
            required
            type="password"
            placeholder="*****"
            value={password}
            onChange={e => setPassword(e.target.value)}
            id=""
          />
        </label>
        <Button
          disabled={!canLogin}
          onClick={() => logInUser()}
        >
          Log in
        </Button>
        {!canLogin && <i>Fill in both fields.</i>}
      </form>
    </div>
  );
}

  return (
      <Form onSubmit={handleLogin}>
        <h1>Login</h1>
        <Form.Group className="mb-3">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={formData.email}
            onChange={handleInputChange}
            id="" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
            id="" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
  );
}
*/}
export default Login;
