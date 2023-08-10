import React, {  useState } from 'react';
import './login.css';
import { Link } from 'react-router-dom';
import axios from "../../config";
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { setAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/auth/login', { username, password });
      const token = response.data.token;
      localStorage.setItem('token', token);
      setAuthenticated(true); 
      navigate("/plans");
      console.log('Login successful');
    } catch (error) {
      console.error('Login failed');
    }
  };
  return (
    <>
      <div className="login-container">
        <div className="login-card">
          <h2 className="login-heading">Login to your account</h2>
          <form className='form-container' onSubmit={(e) => handleLogin(e)}>
            <div className="form-input">
              <label>Username</label>
              <input type="text" required onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div className="form-input">
              <label>Password</label>
              <input type="password" required  onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <div>
              <input type="checkbox" />
              <label htmlFor="remember" className='remember-me'>Remember me</label>
            </div>
            <button type="submit" className='form-submit'>Login</button>
            <div className="new-login">New to MyApp? <Link to="/register">Sign Up</Link></div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;