import React from 'react';
import { Link } from 'react-router-dom';

const ProfileHistory = () => {
    const history = [
        { date: 'Oct 12, 2025', title: 'Kodaikanal Lake', desc: 'Spent an amazing afternoon boating across the serene lake and cycling around the perimeter.' },
        { date: 'Aug 24, 2025', title: 'Meenakshi Amman Temple', desc: "A guided cultural tour exploring the magnificent architecture of Madurai's famous temple complex." },
        { date: 'May 10, 2024', title: 'Marina Beach', desc: 'Relaxed evening walk along the longest natural urban beach in India.' },
    ];

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
                <h2 style={{ fontSize: '24px', marginTop: '5px' }}>Travel History</h2>
            </header>

            <main className="content-section">
                <div className="timeline">
                    {history.map((item, i) => (
                        <div className="timeline-item" key={i}>
                            <div className="timeline-icon" style={i === history.length - 1 ? { background: '#e0e0e0' } : {}}></div>
                            <div className="timeline-content">
                                <div className="history-date">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
                                        fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                        <line x1="16" y1="2" x2="16" y2="6"></line>
                                        <line x1="8" y1="2" x2="8" y2="6"></line>
                                        <line x1="3" y1="10" x2="21" y2="10"></line>
                                    </svg>
                                    {item.date}
                                </div>
                                <h3 className="history-title">{item.title}</h3>
                                <p className="history-desc">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div style={{ textAlign: 'center', marginTop: '30px' }}>
                    <button style={{ background: 'none', border: '1px solid #1e88e5', color: '#1e88e5', padding: '10px 20px', borderRadius: '20px', fontFamily: "'Outfit'", fontWeight: 500, cursor: 'pointer', transition: 'all 0.2s' }}>
                        Load Older Trips
                    </button>
                </div>
            </main>
            <footer style={{ height: '60px' }}></footer>
        </div>
    );
};

export default ProfileHistory;
