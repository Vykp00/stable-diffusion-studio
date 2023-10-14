import React, { useState } from 'react';
import HTTP from '../httpClient';

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
            const resp = await HTTP.post('http://127.0.0.1:5000/signup', formData);
            // Handle successful signup here
            if (resp.status === 200) {
                // Redirect or show a success message
                window.location.href = "/login";
            } else {
                setError('Failed to sign up. Please try again.');
            }
        } catch (error) {
            // Handle Sign up error
            setError('Failed to sign up. Please try again.');
        }

    };

    return (
        <div>
            <h1>Create an account</h1>
            <form onSubmit={handleSignup}>
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
                <label>Confirm Password{': '}
                    <input
                        required
                        type="password"
                        name="confirmPassword"
                        placeholder="*******"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                    />
                </label>
                <button type="submit">Submit</button>
            </form>
            {error && <p>{error}</p>}
        </div>
    );
}

export default Signup;
