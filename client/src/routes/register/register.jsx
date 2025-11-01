import React from 'react';
import { useNavigate } from "react-router-dom";
import './register.css';

const RegisterPage = ({ onRegister }) => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate("/login");
    }

    return (
        <div className="register-container">
        <div className="register-content">
            <div className="register-header">
            <h1 className="register-title">Book Book</h1>
            </div>
            
            <div className="register-card">
            <h2 className="register-card-title">Create Account</h2>
            <div>
                <div className="register-form-group">
                <label className="register-label">Name</label>
                <input 
                    type="text" 
                    className="register-input"
                    placeholder="Your name"
                />
                </div>
                <div className="register-form-group">
                <label className="register-label">Email</label>
                <input 
                    type="email" 
                    className="register-input"
                    placeholder="you@example.com"
                />
            </div>
            <div className="register-form-group">
            <label className="register-label">Password</label>
            <input 
                type="password" 
                className="register-input"
                placeholder="••••••••"
            />
            </div>
            <button onClick={onRegister} className="register-button">
            Create Account
            </button>
        </div>
        <div className="register-footer">
            <button onClick={handleClick} className="register-switch-button">
            Already have an account? Sign in
            </button>
        </div>
        </div>
    </div>
    </div>
);
};

export default RegisterPage;