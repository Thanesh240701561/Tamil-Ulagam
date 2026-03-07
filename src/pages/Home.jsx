import React, { useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logoImg from '../assets/logo.png';

const Home = () => {
    const navigate = useNavigate();

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

        const cityDescriptions = {
            'Chennai': 'Gateway to South India',
            'Madurai': 'The Ancient City of Temples',
            'Coimbatore': 'Manchester of South India',
            'Tirunelveli': 'The Halwa City of South India',
            'Nilgiris': 'The Enchanting Blue Mountains',
            'Dindigul': 'The City of Locks and Biryani',
            'Kanyakumari': 'The Land\'s End of India',
            'Thanjavur': 'The Rice Bowl of Tamil Nadu',
            'Trichy': 'The Historic Rockfort City',
            'Tiruchirappalli': 'The Historic Rockfort City',
            'Salem': 'The Steel and Mango City',
            'Erode': 'The Turmeric City of India',
            'Chengalpattu': 'Gateway to Coastal Heritage',
            'Rameswaram': 'Island of Divine Peace',
            'Ooty': 'Queen of Hill Stations',
            'Kodaikanal': 'Princess of Hill Stations'
        };

        return Array.from(cityMap.values()).map(city => ({
            ...city,
            desc: cityDescriptions[city.name] || `${city.name} - ${city.count} Destinations`,
            cats: Array.from(city.cats).slice(0, 4)
        })).sort((a, b) => b.count - a.count);
    }, [destinationsData]);

    const cities = useMemo(() => allCitiesData.slice(0, 6), [allCitiesData]);

    const featured = useMemo(() => {
        return [...destinationsData]
            .sort((a, b) => parseFloat(b.rating || 0) - parseFloat(a.rating || 0))
            .slice(0, 5);
    }, [destinationsData]);

    const handleCityCardClick = (slug) => {
        navigate(`/explore.html?city=${slug}`);
    };

    return (
        <>
            <div className="app-container">
                {/* Header */}
                <header className="main-header">
                    <div className="header-left">
                        <div className="logo-container">
                            <img src={logoImg} alt="Tamil Ulagam Logo" className="main-logo"
                                onError={(e) => { e.target.src = 'https://via.placeholder.com/40?text=Logo'; }} />
                        </div>
                        <h1 className="brand-name">Tamil Ulagam</h1>
                    </div>
                    <div className="header-right">
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
                        <input type="text" placeholder="Search destinations or activities" className="search-input" />
                    </div>
                </section>

                {/* Nav Actions */}
                <nav className="action-nav">
                    <a href="#" className="nav-card">
                        <div className="icon-box transport-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-1.1 0-2 .9-2 2v7c0 1.1.9 2 2 2h10" />
                                <circle cx="7" cy="17" r="2" />
                                <circle cx="17" cy="17" r="2" />
                            </svg>
                        </div>
                        <span>Transport</span>
                    </a>
                    <a href="#" className="nav-card">
                        <div className="icon-box stay-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M2 20v-8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v8" />
                                <path d="M4 10V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v4" />
                                <path d="M12 4v6" />
                                <path d="M2 18h20" />
                            </svg>
                        </div>
                        <span>Stay</span>
                    </a>
                    <a href="#" className="nav-card">
                        <div className="icon-box itinerary-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                                <line x1="16" x2="16" y1="2" y2="6" />
                                <line x1="8" x2="8" y1="2" y2="6" />
                                <line x1="3" x2="21" y1="10" y2="10" />
                                <path d="M8 14h.01" />
                                <path d="M12 14h.01" />
                                <path d="M16 14h.01" />
                                <path d="M8 18h.01" />
                                <path d="M12 18h.01" />
                                <path d="M16 18h.01" />
                            </svg>
                        </div>
                        <span>Itinerary</span>
                    </a>
                </nav>

                {/* Popular Cities */}
                <section className="content-section">
                    <div className="section-header">
                        <h2>Popular Cities</h2>
                        <Link to="/cities.html" className="view-all-btn">View All &gt;</Link>
                    </div>
                    <div className="cities-grid">
                        {cities.map(city => (
                            <div className="city-card-wide" key={city.slug} onClick={() => handleCityCardClick(city.slug)} style={{ cursor: 'pointer' }}>
                                <div className="city-main-info">
                                    <Link to={`/explore.html?city=${city.slug}`} className="city-text" onClick={e => e.stopPropagation()}>
                                        <h3>{city.name}</h3>
                                        <p>{city.desc}</p>
                                    </Link>
                                    <Link to={`/explore.html?city=${city.slug}`} className="city-view-btn" onClick={e => e.stopPropagation()}>View All</Link>
                                </div>
                                <div className="famous-places-list">
                                    {city.cats.map(cat => (
                                        <Link key={cat} to={`/explore.html?city=${city.slug}&cat=${cat.toLowerCase()}`} className="place-tag" onClick={e => e.stopPropagation()}>{cat}</Link>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Featured Destinations */}
                <section className="content-section">
                    <div className="section-header">
                        <h2>Featured Destinations</h2>
                        <Link to="/explore.html" className="view-all-btn">View All &gt;</Link>
                    </div>
                    <div className="scroll-container horizontal-scroll no-scrollbar">
                        {featured.map((dest) => (
                            <Link to={`/details.html?id=${dest.id}`} className="dest-card" key={dest.id}>
                                <div className="dest-img-box" style={{ backgroundImage: `url(${dest.image})` }}></div>
                                <div className="dest-info">
                                    <h3>{dest.name}</h3>
                                    <p>{dest.city}</p>
                                    <div className="rating">⭐⭐⭐⭐⭐ {dest.rating}</div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>

                <footer className="bottom-spacer"></footer>
            </div>
        </>
    );
};

export default Home;
