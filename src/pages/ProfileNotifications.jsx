import React from 'react';
import { Link } from 'react-router-dom';

const ProfileNotifications = () => {
    const notifications = [
        { type: 'offer', title: 'New Special Offer for You!', desc: 'Get 20% off on premium stays in Ooty this weekend. Use code OOTY20 at checkout.', time: '2 hours ago', unread: true },
        { type: 'alert', title: 'Travel Advisory Updated', desc: 'Important weather update for coastal areas near Kanyakumari. Please review before planning a trip.', time: 'Yesterday, 4:30 PM', unread: true },
        { type: 'system', title: 'Profile Successfully Verified', desc: "Your identity verification has been completed. You're now a verified Tamil Ulagam explorer.", time: 'Oct 22, 2025', unread: false },
    ];

    return (
        <div className="app-container">
            <header className="profile-page-header">
                <Link to="/home.html" className="back-link">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="19" y1="12" x2="5" y2="12"></line>
                        <polyline points="12 19 5 12 12 5"></polyline>
                    </svg>
                    Back
                </Link>
                <h2 style={{ fontSize: '24px', marginTop: '5px' }}>Notifications</h2>
            </header>

            <main className="content-section">
                <button className="clear-all-btn">Mark All as Read</button>

                <div className="notification-container">
                    {notifications.map((notif, i) => (
                        <div className={`notification-card ${notif.unread ? 'unread' : ''}`} key={i}>
                            <div className={`notif-icon ${notif.type}`}>
                                {notif.type === 'offer' && (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                                    </svg>
                                )}
                                {notif.type === 'alert' && (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                                    </svg>
                                )}
                                {notif.type === 'system' && (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                        <polyline points="22 4 12 14.01 9 11.01"></polyline>
                                    </svg>
                                )}
                            </div>
                            <div className="notif-content">
                                <h4 className="notif-title">{notif.title}</h4>
                                <p className="notif-desc">{notif.desc}</p>
                                <span className="notif-time">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <circle cx="12" cy="12" r="10"></circle>
                                        <polyline points="12 6 12 12 16 14"></polyline>
                                    </svg>
                                    {notif.time}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default ProfileNotifications;
