import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import './login.css';
import userServices from '../../services/user'

const LoginPage = ({ setUserDetails }) => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate("/register");
    }

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [shouldNavigate, setShouldNavigate] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);
        try {
            const response = await userServices.login(email, password);
            if (response) {
                const userData = await userServices.getUser();
                setUserDetails(userData);
                setShouldNavigate(true);
            } else {
                setError('Invalid credentials');
            }
        } catch (err) {
            setError(err?.response?.data?.message || err.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    }

    // Navigate after state updates
    useEffect(() => {
        if (shouldNavigate) {
            navigate('/library');
        }
    }, [shouldNavigate, navigate]);

    return (
        <div className="login-container">
        <div className="login-content">
            <div className="login-header">
                <h1 className="register-title">Book Book</h1>
            </div>
            
            <div className="login-card">
            <h2 className="login-card-title">Welcome Back</h2>
            <form onSubmit={handleSubmit}>
                <div className="login-form-group">
                    <label className="login-label">Email</label>
                    <input 
                        type="email" 
                        className="login-input"
                        placeholder="you@example.com"
                        required
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>
                <div className="login-form-group">
                    <label className="login-label">Password</label>
                    <input 
                        type="password" 
                        className="login-input"
                        placeholder="••••••••"
                        required
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>
                {error && 
                <div className="login-error">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#EA3323"><path d="M480-280q17 0 28.5-11.5T520-320q0-17-11.5-28.5T480-360q-17 0-28.5 11.5T440-320q0 17 11.5 28.5T480-280Zm-40-160h80v-240h-80v240Zm40 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>
                    <p>Invalid email or password</p>
                </div>}
                    <button type="submit" disabled={loading} className="login-button">
                    {   loading ? 'Signing in…' : 'Sign In'}
                    </button>
            </form>
            <div className="login-footer">
                <button onClick={handleClick} className="login-switch-button">
                Don't have an account? Register
                </button>
            </div>
            </div>
        </div>
        </div>
    );
};

export default LoginPage;