import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import './register.css';
import userServices from "../../services/user";

const RegisterPage = () => {
    const navigate = useNavigate();
    
    const handleClick = () => {
        navigate("/login");
    }

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const onRegister = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);
        try {
            const response = await userServices.register(name, email, password);
            console.log('username: ', name, 'email: ', email, 'password: ', password)
            if (response) {
                navigate('/library');
            } else {
                console.log('invalid credentials')
                setError('Invalid credentials');
            }
        } catch (err) {
            setError(err?.response?.data?.message || err.message || 'Register failed');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="register-container">
        <div className="register-content">
            <div className="register-header">
                <h1 className="register-title">Book Book</h1>
            </div>
            
            <div className="register-card">
                <h2 className="register-card-title">Create Account</h2>
                <form onSubmit={onRegister}>
                    <div className="register-form-group">
                    <label className="register-label">Name</label>
                    <input 
                        type="text" 
                        className="register-input"
                        placeholder="Your name"
                        onChange={e => setName(e.target.value)}
                    />
                    </div>
                    <div className="register-form-group">
                    <label className="register-label">Email</label>
                    <input 
                        type="email" 
                        className="register-input"
                        placeholder="you@example.com"
                        onChange={e => setEmail(e.target.value)}
                    />
                    </div>
                    <div className="register-form-group">
                        <label className="register-label">Password</label>
                        <input 
                            type="password" 
                            className="register-input"
                            placeholder="••••••••"
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>

                    {error && 
                    <div className="register-error">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#EA3323"><path d="M480-280q17 0 28.5-11.5T520-320q0-17-11.5-28.5T480-360q-17 0-28.5 11.5T440-320q0 17 11.5 28.5T480-280Zm-40-160h80v-240h-80v240Zm40 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>
                        <p>Error creating account</p>
                    </div>}
                        <button type="submit" disabled={loading} className="register-button">
                        { loading ? 'Creating account...' : 'Create account' }
                        </button>
                </form>

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