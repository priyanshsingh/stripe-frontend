import React, { useState } from 'react'
import './register.css';
import { Link } from 'react-router-dom';
import axios from '../../config';
import { useNavigate } from 'react-router-dom';


const Register = (e) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault()
        try {
        await axios.post('/auth/register', { username, password });
        console.log('User registered successfully');
        navigate('/login');
        } catch (error) {
        console.error('Registration failed');
        }
    };
    return (
        <>
            <div className="login-container">
                <div className="login-card">
                    <h2 className="login-heading">Create Account</h2>
                    <form className='form-container' onSubmit={(e) => handleRegister(e)}>
                        <div className="form-input">
                            <label>Username</label>
                            <input type="text" required onChange={(e) => setUsername(e.target.value)} />
                        </div>
                        <div className="form-input">
                            <label>Email</label>
                            <input type="email" required />
                        </div>
                        <div className="form-input">
                            <label>Password</label>
                            <input type="password" required  onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <div>
                            <input type="checkbox" />
                            <label htmlFor="remember" className='remember-me'>Remember me</label>
                        </div>
                        <button type="submit" className='form-submit' >Register</button>
                        <div className="new-login">Already have an account? <Link to="/login">Login</Link></div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Register