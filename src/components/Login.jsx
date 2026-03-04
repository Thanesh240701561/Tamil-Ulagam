import React, { useState } from 'react';
import { Mail, Lock, ArrowRight, Github } from 'lucide-react';
import './Login.css';

const Login = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email && password) {
            onLogin(email);
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <div className="login-header">
                    <div className="logo-section">
                        <div className="login-logo">
                            <img src="/src/assets/logo.png" alt="Logo" onError={(e) => e.target.src = 'https://via.placeholder.com/60?text=DK'} />
                        </div>
                    </div>
                    <h1>Welcome Back</h1>
                    <p>Login to your account to explore Kanyakumari</p>
                </div>

                <form onSubmit={handleSubmit} className="login-form">
                    <div className="input-group">
                        <Mail className="input-icon" size={20} />
                        <input
                            type="email"
                            placeholder="Email Address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="input-group">
                        <Lock className="input-icon" size={20} />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <div className="form-options">
                        <label className="remember-me">
                            <input type="checkbox" />
                            <span>Remember me</span>
                        </label>
                        <a href="#" className="forgot-password">Forgot Password?</a>
                    </div>

                    <button type="submit" className="login-submit-btn">
                        Login <ArrowRight size={20} style={{ marginLeft: '8px' }} />
                    </button>
                </form>

                <div className="social-login">
                    <div className="divider">
                        <span>Or continue with</span>
                    </div>
                    <div className="social-buttons">
                        <button className="social-btn">
                            <img src="https://www.google.com/favicon.ico" alt="Google" />
                            Google
                        </button>
                        <button className="social-btn">
                            <Github size={20} />
                            GitHub
                        </button>
                    </div>
                </div>

                <p className="signup-prompt">
                    Don't have an account? <a href="#">Sign up</a>
                </p>
            </div>
        </div>
    );
};

export default Login;
