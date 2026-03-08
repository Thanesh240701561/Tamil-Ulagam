import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logoImg from '../assets/logo.png';
import { getCityDesc } from '../utils/cityDescriptions';

const Cities = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');

    const destinationsData = window.destinationsData || [];

    const allCitiesData = useMemo(() => {
        const cityMap = new Map();

        destinationsData.forEach(dest => {
            const cityName = dest.city;
            if (!cityMap.has(cityName)) {
                cityMap.set(cityName, {
                    name: cityName,
                    slug: cityName.toLowerCase().replace(/\s+/g, '-'),
                    cats: new Set(),
                    count: 0
                });
            }
            const cityData = cityMap.get(cityName);
            cityData.count += 1;
            if (dest.category) {
                cityData.cats.add(dest.category.charAt(0).toUpperCase() + dest.category.slice(1));
            }
        });

        return Array.from(cityMap.values()).map(city => ({
            ...city,
            desc: getCityDesc(city.name),
            cats: Array.from(city.cats).slice(0, 4)
        })).sort((a, b) => b.count - a.count);
    }, [destinationsData]);

    const cities = allCitiesData;

    const allCategories = useMemo(() => {
        const cats = new Set();
        destinationsData.forEach(d => cats.add(d.category.toLowerCase()));
        return [...cats];
    }, [destinationsData]);

    const filteredCities = useMemo(() => {
        if (!searchTerm) return cities;
        const term = searchTerm.toLowerCase();
        return cities.filter(c =>
            c.name.toLowerCase().includes(term) ||
            c.desc.toLowerCase().includes(term) ||
            c.cats.some(cat => cat.toLowerCase().includes(term))
        );
    }, [searchTerm]);

    return (
        <>
            <div className="app-container">
                {/* Header */}
                <header className="main-header">
                    <div className="header-left">
                        <Link to="/home" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', color: 'inherit' }}>
                            <div className="logo-container">
                                <img src={logoImg} alt="Tamil Ulagam Logo" className="main-logo"
                                    onError={(e) => { e.target.src = 'https://via.placeholder.com/40?text=Logo'; }} />
                            </div>
                            <h1 className="brand-name">Tamil Ulagam</h1>
                        </Link>
                    </div>
                    <div className="header-right">
                        <Link to="/home" className="map-link-btn" aria-label="Go Home">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                                <polyline points="9 22 9 12 15 12 15 22" />
                            </svg>
                        </Link>
                    </div>
                </header>

                {/* Hero */}
                <section className="city-hero">
                    <h1>Popular Cities</h1>
                    <p>Explore the best cities and their famous landmarks</p>
                    <div className="search-bar-container" style={{ maxWidth: '500px', margin: '30px auto 0', position: 'relative' }}>
                        <svg className="search-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
                            fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="11" cy="11" r="8" />
                            <path d="m21 21-4.3-4.3" />
                        </svg>
                        <input
                            type="text"
                            placeholder="Search cities or famous places..."
                            className="search-input"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </section>

                {/* Categories */}
                <section className="content-section" style={{ marginTop: '-20px', position: 'relative', zIndex: 10 }}>
                    <div className="section-header">
                        <h2>Browse by Category</h2>
                    </div>
                    <div className="scroll-container horizontal-scroll no-scrollbar">
                        {allCategories.map(cat => (
                            <Link key={cat} to={`/explore?cat=${cat}`} className={`cat-card ${cat}`}>
                                {cat.charAt(0).toUpperCase() + cat.slice(1)}
                            </Link>
                        ))}
                    </div>
                </section>

                {/* Cities Grid */}
                <main className="content-section">
                    <div className="cities-grid">
                        {filteredCities.length === 0 ? (
                            <p style={{ gridColumn: '1/-1', textAlign: 'center', padding: '40px', color: 'var(--text-light)' }}>
                                No cities found matching "{searchTerm}"
                            </p>
                        ) : (
                            filteredCities.map(city => (
                                <div className="city-card-wide" key={city.slug} onClick={() => navigate(`/explore?city=${city.slug}`)} style={{ cursor: 'pointer' }}>
                                    <div className="city-main-info">
                                        <Link to={`/explore?city=${city.slug}`} className="city-text" onClick={e => e.stopPropagation()}>
                                            <h3>{city.name}</h3>
                                            <p>{city.desc}</p>
                                        </Link>
                                        <Link to={`/explore?city=${city.slug}`} className="city-view-btn" onClick={e => e.stopPropagation()}>View All</Link>
                                    </div>
                                    <div className="famous-places-list">
                                        {city.cats.map(cat => (
                                            <Link key={cat} to={`/explore?city=${city.slug}&cat=${cat.toLowerCase()}`} className="place-tag" onClick={e => e.stopPropagation()}>
                                                {cat}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </main>

                <footer className="bottom-spacer"></footer>
            </div>
        </>
    );
};

export default Cities;
