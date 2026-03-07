import React, { useState, useMemo, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import logoImg from '../assets/logo.png';

const Explore = () => {
    const [searchParams] = useSearchParams();
    const cityFilter = searchParams.get('city');
    const catFilter = searchParams.get('cat');
    const qFilter = searchParams.get('q');

    const [currentCat, setCurrentCat] = useState(catFilter ? catFilter.toLowerCase() : 'all');
    const [searchTerm, setSearchTerm] = useState(qFilter || '');

    useEffect(() => {
        setCurrentCat(catFilter ? catFilter.toLowerCase() : 'all');
        setSearchTerm(qFilter || '');
    }, [catFilter, qFilter]);

    const destinationsData = window.destinationsData || [];

    const currentCity = cityFilter ? cityFilter.toLowerCase() : null;

    const categories = useMemo(() => {
        let pool = destinationsData;
        if (currentCity) {
            pool = destinationsData.filter(d => d.city.toLowerCase() === currentCity);
        }
        return ['all', ...new Set(pool.map(d => d.category.toLowerCase()))];
    }, [currentCity, destinationsData]);

    const filtered = useMemo(() => {
        let result = destinationsData;

        if (currentCity) {
            result = result.filter(d => d.city.toLowerCase() === currentCity);
        }
        if (currentCat !== 'all') {
            result = result.filter(d => d.category.toLowerCase() === currentCat);
        }
        if (searchTerm) {
            const term = searchTerm.toLowerCase();
            result = result.filter(d =>
                d.name.toLowerCase().includes(term) ||
                d.city.toLowerCase().includes(term) ||
                d.category.toLowerCase().includes(term) ||
                d.description.toLowerCase().includes(term)
            );
        }
        return result;
    }, [currentCity, currentCat, searchTerm, destinationsData]);

    const pageTitle = useMemo(() => {
        if (searchTerm) return `Search results for "${searchTerm}"`;
        if (currentCity && currentCat !== 'all') {
            return `${currentCat.charAt(0).toUpperCase() + currentCat.slice(1)} in ${currentCity.charAt(0).toUpperCase() + currentCity.slice(1)}`;
        }
        if (currentCity) return `Famous Places in ${currentCity.charAt(0).toUpperCase() + currentCity.slice(1)}`;
        if (currentCat !== 'all') return `${currentCat.charAt(0).toUpperCase() + currentCat.slice(1)} Destinations`;
        return 'Explore All Destinations';
    }, [currentCity, currentCat, searchTerm]);

    return (
        <>
            <div className="app-container">
                {/* Header */}
                <header className="main-header">
                    <div className="header-left">
                        <Link to="/home.html" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', color: 'inherit' }}>
                            <div className="logo-container">
                                <img src={logoImg} alt="Tamil Ulagam Logo" className="main-logo"
                                    onError={(e) => { e.target.src = 'https://via.placeholder.com/40?text=Logo'; }} />
                            </div>
                            <h1 className="brand-name">Tamil Ulagam</h1>
                        </Link>
                    </div>
                    <div className="header-right" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <a href="#" className="map-link-btn" aria-label="Open Map">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0z" />
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

                {/* Search */}
                <section className="search-section">
                    <div className="search-bar-container">
                        <svg className="search-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
                            fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="11" cy="11" r="8" />
                            <path d="m21 21-4.3-4.3" />
                        </svg>
                        <input
                            type="text"
                            placeholder="Search destinations..."
                            className="search-input"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </section>

                {/* Category Filters */}
                <section className="content-section" style={{ marginBottom: '20px' }}>
                    <div className="scroll-container horizontal-scroll no-scrollbar" style={{ padding: '5px 0 15px' }}>
                        {categories.map(cat => (
                            <div
                                key={cat}
                                className={`cat-card ${cat} ${currentCat === cat ? 'active' : ''}`}
                                style={{
                                    cursor: 'pointer',
                                    padding: '8px 20px',
                                    fontSize: '14px',
                                    border: currentCat === cat ? '2px solid var(--text-main)' : undefined
                                }}
                                onClick={() => setCurrentCat(cat)}
                            >
                                {cat.charAt(0).toUpperCase() + cat.slice(1)}
                            </div>
                        ))}
                    </div>
                </section>

                {/* Destinations Grid */}
                <main className="content-section">
                    <h2 style={{ marginBottom: '20px', fontSize: '24px' }}>{pageTitle}</h2>
                    <div className="destinations-grid">
                        {filtered.length === 0 ? (
                            <p style={{ gridColumn: '1/-1', textAlign: 'center', padding: '40px', color: 'var(--text-light)' }}>
                                No destinations found matching your criteria.
                            </p>
                        ) : (
                            filtered.map(dest => (
                                <Link to={`/details.html?id=${dest.id}`} className="dest-card" key={dest.id}>
                                    <div className="dest-img-box" style={{ backgroundImage: `url('${dest.image}')` }}></div>
                                    <div className="dest-info">
                                        <h3>{dest.name}</h3>
                                        <p>{dest.description}</p>
                                        <div className="rating">⭐⭐⭐⭐⭐ {dest.rating}</div>
                                    </div>
                                </Link>
                            ))
                        )}
                    </div>
                </main>

                <footer className="bottom-spacer"></footer>
            </div>

            <style>{`
                .destinations-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
                    gap: 20px;
                    padding: 20px 0;
                }
                @media (min-width: 900px) {
                    .destinations-grid {
                        grid-template-columns: repeat(3, 1fr);
                    }
                }
            `}</style>
        </>
    );
};

export default Explore;
