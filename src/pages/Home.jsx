import React, { useState } from 'react';
import { Search, Map, User, ChevronRight, Star, Car, Hotel, Calendar } from 'lucide-react';
import '../App.css';

const Home = ({ onProfileClick, onExploreClick }) => {
    return (
        <div className="home-container">
            <header className="main-header">
                <div className="header-left">
                    <div className="logo-container">
                        <img src="/src/assets/logo.png" alt="Logo" onError={(e) => e.target.src = 'https://via.placeholder.com/40?text=DK'} />
                    </div>
                    <h1 className="brand-name">Discover Kumari</h1>
                </div>
                <div className="header-right">
                    <button className="map-link-btn">
                        <Map size={24} />
                    </button>
                    <button className="profile-btn" onClick={onProfileClick}>
                        <User size={24} />
                    </button>
                </div>
            </header>

            <section className="search-section">
                <div className="search-bar-container">
                    <Search size={20} className="search-icon" />
                    <input type="text" placeholder="Search destinations..." className="search-input" />
                </div>
            </section>

            <nav className="action-nav">
                <div className="nav-card">
                    <div className="icon-box transport-icon">
                        <Car size={24} color="#2d5a27" />
                    </div>
                    <span>Transport</span>
                </div>
                <div className="nav-card">
                    <div className="icon-box stay-icon">
                        <Hotel size={24} color="#2d5a27" />
                    </div>
                    <span>Stay</span>
                </div>
                <div className="nav-card">
                    <div className="icon-box itinerary-icon">
                        <Calendar size={24} color="#2d5a27" />
                    </div>
                    <span>Itinerary</span>
                </div>
            </nav>

            <section className="content-section">
                <div className="section-header">
                    <h2>Popular Cities</h2>
                    <button className="view-all-btn">View All <ChevronRight size={16} /></button>
                </div>
                <div className="cities-grid">
                    {[
                        { name: 'Chennai', desc: 'Gateway to South India', tags: ['Beaches', 'Temples'] },
                        { name: 'Ooty', desc: 'Queen of Hill Stations', tags: ['Lakes', 'Forests'] },
                        { name: 'Madurai', desc: 'The City of Temples', tags: ['Palaces', 'Museums'] },
                        { name: 'Erode', desc: 'The Turmeric City', tags: ['Rivers', 'Forts'] }
                    ].map(city => (
                        <div key={city.name} className="city-card">
                            <div class="city-info">
                                <h3>{city.name}</h3>
                                <p>{city.desc}</p>
                            </div>
                            <div className="city-tags">
                                {city.tags.map(tag => <span key={tag} className="tag">{tag}</span>)}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section className="content-section">
                <div className="section-header">
                    <h2>Featured Destinations</h2>
                    <button className="view-all-btn" onClick={onExploreClick}>View All <ChevronRight size={16} /></button>
                </div>
                <div className="featured-scroll">
                    {[
                        { name: 'Kanyakumari Beach', image: 'https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?auto=format&fit=crop&w=400&q=80' },
                        { name: 'Hidden Falls', image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=400&q=80' }
                    ].map(dest => (
                        <div key={dest.name} className="featured-card">
                            <div className="featured-img" style={{ backgroundImage: `url(${dest.image})` }}></div>
                            <div className="featured-info">
                                <h3>{dest.name}</h3>
                                <div className="rating"><Star size={12} fill="#ffb800" color="#ffb800" /> 5.0</div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Home;
