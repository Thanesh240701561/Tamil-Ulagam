import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        navigate('/home');
    };

    return (
        <>
            <div className="login-page-container">
                <div className="login-card-wrapper">
                    <div className="login-logo-container">
                        <img src="./src/assets/logo.png" alt="Tamil Ulagam Logo"
                            onError={(e) => { e.target.src = 'https://via.placeholder.com/60?text=DK'; }} />
                        <h1 className="login-title">Tamil Ulagam</h1>
                        <p className="login-subtitle">Sign in to start exploring</p>
                    </div>

                    <form id="loginForm" onSubmit={handleLogin}>
                        <div className="input-group">
                            <svg className="input-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                strokeLinejoin="round">
                                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                                <polyline points="22,6 12,13 2,6"></polyline>
                            </svg>
                            <input type="email" id="email" placeholder="Email Address" required />
                        </div>

                        <div className="input-group">
                            <svg className="input-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                strokeLinejoin="round">
                                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                            </svg>
                            <input type="password" id="password" placeholder="Password" required />
                        </div>

                        <div className="login-options">
                            <label>
                                <input type="checkbox" defaultChecked /> Remember me
                            </label>
                            <a href="#" className="forgot-pass">Forgot Password?</a>
                        </div>

                        <button type="submit" className="login-btn">Log In</button>
                    </form>

                    <div className="divider-box">
                        <span>OR</span>
                    </div>

                    <button className="social-login-btn">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 2v20"></path>
                            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                        </svg>
                        Sign in with Google
                    </button>

                    <p className="signup-text">
                        Don't have an account? <a href="#">Create one</a>
                    </p>
                </div>
            </div>
        </>
    );
};

export default Login;
