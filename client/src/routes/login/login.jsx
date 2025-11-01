import React from 'react';
import { useNavigate } from "react-router-dom";
import './login.css';

const LoginPage = ({ onLogin }) => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate("/register");
    }

    return (
        <div className="login-container">
        <div className="login-content">
            <div className="login-header">
                <h1 className="register-title">Book Book</h1>
                
            </div>
            
            <div className="login-card">
            <h2 className="login-card-title">Welcome Back</h2>
            <div>
                <div className="login-form-group">
                <label className="login-label">Email</label>
                <input 
                    type="email" 
                    className="login-input"
                    placeholder="you@example.com"
                />
                </div>
                <div className="login-form-group">
                <label className="login-label">Password</label>
                <input 
                    type="password" 
                    className="login-input"
                    placeholder="••••••••"
                />
                </div>
                <button onClick={onLogin} className="login-button">
                Sign In
                </button>
            </div>
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