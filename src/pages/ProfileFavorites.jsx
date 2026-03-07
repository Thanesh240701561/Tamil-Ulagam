import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ProfileFavorites = () => {
    const [favorites, setFavorites] = useState([
        { id: 'kk1', name: 'Kanyakumari Beach', desc: 'Beautiful seaside spot where three oceans meet.', image: 'https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?auto=format&fit=crop&w=400&q=80' },
        { id: 'kk2', name: 'Kalikesam', desc: 'Serene forest area perfect for nature walks.', image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=400&q=80' },
    ]);

    const handleRemove = (id) => {
        setFavorites(favorites.filter(fav => fav.id !== id));
    };

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
                <h2>My Favorites</h2>
            </header>

            <main className="content-section">
                <div className="profile-container">
                    {favorites.length === 0 ? (
                        <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-light)' }}>
                            <p>No favorites yet. Start exploring!</p>
                            <Link to="/explore.html" className="btn-view" style={{ marginTop: '20px', display: 'inline-block' }}>Explore Places</Link>
                        </div>
                    ) : (
                        favorites.map(fav => (
                            <div className="favorite-card" key={fav.id}>
                                <div className="favorite-img" style={{ backgroundImage: `url(${fav.image})` }}></div>
                                <div className="favorite-details">
                                    <h3>{fav.name}</h3>
                                    <p>{fav.desc}</p>
                                    <div className="favorite-actions">
                                        <button
                                            className="btn-remove"
                                            aria-label="Remove from favorites"
                                            onClick={() => handleRemove(fav.id)}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
                                                fill="currentColor" stroke="none">
                                                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                                            </svg>
                                        </button>
                                        <Link to={`/details.html?id=${fav.id}`} className="btn-view">View Detail</Link>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </main>
        </div>
    );
};

export default ProfileFavorites;
