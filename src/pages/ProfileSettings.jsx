import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ProfileSettings = () => {
    const [language, setLanguage] = useState('en');
    const [currency, setCurrency] = useState('inr');
    const [locationServices, setLocationServices] = useState(true);
    const [twoFactor, setTwoFactor] = useState(false);
    const [profileVisibility, setProfileVisibility] = useState(true);

    const handleDelete = () => {
        if (window.confirm('Are you absolutely sure you want to delete your account? This action cannot be undone.')) {
            alert('Account deletion requested.');
        }
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
                <h2>Global Settings</h2>
            </header>

            <main className="content-section">
                <div className="settings-container">
                    <div className="settings-section">
                        <h3 className="settings-title">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#4caf50' }}>
                                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                            </svg>
                            App Preferences
                        </h3>

                        <div className="setting-item">
                            <div className="setting-info">
                                <h4>App Language</h4>
                                <p>Choose your preferred language</p>
                            </div>
                            <select className="setting-select" value={language} onChange={e => setLanguage(e.target.value)}>
                                <option value="en">English</option>
                                <option value="ta">Tamil (தமிழ்)</option>
                            </select>
                        </div>

                        <div className="setting-item">
                            <div className="setting-info">
                                <h4>Currency</h4>
                                <p>Display prices in</p>
                            </div>
                            <select className="setting-select" value={currency} onChange={e => setCurrency(e.target.value)}>
                                <option value="inr">INR (₹)</option>
                            </select>
                        </div>
                    </div>

                    <div className="settings-section">
                        <h3 className="settings-title">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#4caf50' }}>
                                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                            </svg>
                            Privacy &amp; Security
                        </h3>

                        <div className="setting-item">
                            <div className="setting-info">
                                <h4>Location Services</h4>
                                <p>Allow app to access your location for better recommendations</p>
                            </div>
                            <label className="switch">
                                <input type="checkbox" checked={locationServices} onChange={() => setLocationServices(!locationServices)} />
                                <span className="slider"></span>
                            </label>
                        </div>

                        <div className="setting-item">
                            <div className="setting-info">
                                <h4>Two-Factor Authentication</h4>
                                <p>Add an extra layer of security to your account</p>
                            </div>
                            <label className="switch">
                                <input type="checkbox" checked={twoFactor} onChange={() => setTwoFactor(!twoFactor)} />
                                <span className="slider"></span>
                            </label>
                        </div>

                        <div className="setting-item">
                            <div className="setting-info">
                                <h4>Profile Visibility</h4>
                                <p>Let other travelers find your reviews</p>
                            </div>
                            <label className="switch">
                                <input type="checkbox" checked={profileVisibility} onChange={() => setProfileVisibility(!profileVisibility)} />
                                <span className="slider"></span>
                            </label>
                        </div>
                    </div>

                    <div className="danger-zone">
                        <h4>Delete Account</h4>
                        <p style={{ fontSize: '13px', color: 'var(--text-light)', marginBottom: '10px' }}>
                            Once you delete your account, there is no going back. Please be certain.
                        </p>
                        <button className="btn-danger" onClick={handleDelete}>Delete My Account</button>
                    </div>
                </div>
            </main>
            <footer style={{ height: '60px' }}></footer>
        </div>
    );
};

export default ProfileSettings;
