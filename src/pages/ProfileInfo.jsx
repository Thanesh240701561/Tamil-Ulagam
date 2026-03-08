import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const ProfileInfo = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: 'User Explorer',
        email: 'user@tamilulagam.com',
        phone: '+91 98765 43210',
        location: 'Chennai, India'
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Profile updated successfully!');
        navigate('/home');
    };

    return (
        <div className="app-container">
            <header className="profile-page-header">
                <Link to="/home" className="back-link">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="19" y1="12" x2="5" y2="12"></line>
                        <polyline points="12 19 5 12 12 5"></polyline>
                    </svg>
                    Back
                </Link>
                <h2 style={{ fontSize: '24px', marginTop: '5px' }}>Personal Information</h2>
            </header>

            <main className="content-section">
                <div className="profile-container">
                    <img src="https://ui-avatars.com/api/?name=User&background=1e88e5&color=fff&size=200" alt="User Avatar"
                        className="profile-avatar-large" />
                    <button className="change-photo-btn">Change Photo</button>

                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Full Name</label>
                            <input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Enter your full name" />
                        </div>
                        <div className="form-group">
                            <label>Email Address</label>
                            <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="Enter your email" />
                        </div>
                        <div className="form-group">
                            <label>Phone Number</label>
                            <input type="tel" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="Enter your phone number" />
                        </div>
                        <div className="form-group">
                            <label>Location</label>
                            <input type="text" value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} placeholder="Enter your location" />
                        </div>
                        <button type="submit" className="save-btn">Save Changes</button>
                    </form>
                </div>
            </main>
        </div>
    );
};

export default ProfileInfo;
