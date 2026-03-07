import React from 'react';
import { Link } from 'react-router-dom';

const Categories = () => {
    return (
        <>

            <div className="app-container">

                <header className="main-header">
                    <div className="header-left">
                        <Link to="/home.html" className="logo-link"
                            style="display: flex; align-items: center; gap: 10px; text-decoration: none; color: inherit;">
                            <div className="logo-container">
                                <img src="./src/assets/logo.png" alt="Tamil Ulagam Logo" className="main-logo"
                                    onError={(e) => { e.target.src = 'https://via.placeholder.com/40?text=Logo'; }} />
                            </div>
                            <h1 className="brand-name">Tamil Ulagam</h1>
                        </Link>
                    </div>
                    <div className="header-right" style="display: flex; align-items: center; gap: 12px;">
                        <a href="#" className="map-link-btn" aria-label="Open Map">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path
                                    d="M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0z" />
                                <path d="M15 5.764v15" />
                                <path d="M9 3.236v15" />
                            </svg>
                        </a>
                        <button id="profileBtn" className="profile-btn" aria-label="User Profile">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                                <circle cx="12" cy="7" r="4" />
                            </svg>
                        </button>
                    </div>
                </header>


                <section className="search-section">
                    <div className="search-bar-container">
                        <svg className="search-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
                            fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="11" cy="11" r="8" />
                            <path d="m21 21-4.3-4.3" />
                        </svg>
                        <input type="text" placeholder="Search categories..." className="search-input" />
                    </div>
                </section>

                <main className="content-section">
                    <div className="categories-grid">
                        <Link to="/explore.html?cat=waterfalls" className="cat-large-card"
                            style={{ backgroundImage: `url(https://images.unsplash.com/photo-1433086390636-524ee3c004d6?auto=format&fit=crop&w=500&q=80)` }}>
                            <div className="cat-overlay">Waterfalls</div>
                        </Link>
                        <Link to="/explore.html?cat=mountains" className="cat-large-card"
                            style={{ backgroundImage: `url(https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=500&q=80)` }}>
                            <div className="cat-overlay">Mountains</div>
                        </Link>
                        <Link to="/explore.html?cat=islands" className="cat-large-card"
                            style={{ backgroundImage: `url(https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?auto=format&fit=crop&w=500&q=80)` }}>
                            <div className="cat-overlay">Islands</div>
                        </Link>
                        <Link to="/explore.html?cat=beaches" className="cat-large-card"
                            style={{ backgroundImage: `url(https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=500&q=80)` }}>
                            <div className="cat-overlay">Beaches</div>
                        </Link>
                        <Link to="/explore.html?cat=temples" className="cat-large-card"
                            style={{ backgroundImage: `url(https://images.unsplash.com/photo-1512100356132-d4263b6589a2?auto=format&fit=crop&w=500&q=80)` }}>
                            <div className="cat-overlay">Temples</div>
                        </Link>
                        <Link to="/explore.html?cat=forests" className="cat-large-card"
                            style={{ backgroundImage: `url(https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=500&q=80)` }}>
                            <div className="cat-overlay">Forests</div>
                        </Link>
                    </div>
                </main>
            </div>



        </>
    );
};

export default Categories;
