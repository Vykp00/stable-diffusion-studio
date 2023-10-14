import React, { useState } from 'react';
import HTTP from '../httpClient';

//Set disable login
function Button({ children, disabled, onClick }) {
  const className = "button";
  return (
    <button
      type={className}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

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
      const resp = await HTTP.post('http://127.0.0.1:5000/login', formData);
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
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <label>Email{': '}
          <input
            required
            type="text"
            name="email"
            placeholder="email@example.com"
            value={formData.email}
            onChange={handleInputChange}
            id=""
          />
        </label>
        <label>Password{': '}
          <input
            required
            type="password"
            name="password"
            placeholder="*******"
            value={formData.password}
            onChange={handleInputChange}
            id=""
          />
        </label>
        <button type="submit">Login</button>
      </form>
    </div>
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
*/}
export default Login;
