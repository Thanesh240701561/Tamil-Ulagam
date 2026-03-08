import React, { useState, useMemo, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { hotelData } from '../utils/hotelData';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import '../styles/stay.css';

// SVG Icons inline for smooth UI
const MapPin = () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>;
const Star = () => <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>;
const Bell = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></svg>;
const ArrowLeft = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" /></svg>;

const ScrollableSelect = ({ value, options, onChange, label }) => {
    const [isOpen, setIsOpen] = useState(false);
    const wrapperRef = React.useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [wrapperRef]);

    return (
        <div className={`filter-group compact custom-select-wrapper ${isOpen ? 'open' : ''}`} ref={wrapperRef}>
            <label>{label}</label>
            <div className="custom-select-trigger" onClick={() => setIsOpen(!isOpen)}>
                <span>{value}</span>
                <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
                    <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </div>
            {isOpen && (
                <div className="custom-options no-scrollbar">
                    {options.map(opt => (
                        <div
                            key={opt}
                            className={`custom-option ${value === opt ? 'selected' : ''}`}
                            onClick={() => { onChange(opt); setIsOpen(false); }}
                        >
                            {opt}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

const Stay = () => {
    const uniqueCities = React.useMemo(() => {
        return Array.from(new Set(hotelData.map(h => h.city?.trim()))).filter(Boolean).sort();
    }, []);

    const [searchParams, setSearchParams] = useSearchParams();
    const cityParam = searchParams.get('city') || '';
    const [city, setCity] = useState(cityParam || uniqueCities[0] || '');
    const [checkIn, setCheckIn] = useState(() => {
        const d = new Date();
        d.setHours(10, 0, 0, 0);
        return d;
    });
    const [checkOut, setCheckOut] = useState(() => {
        const d = new Date();
        d.setDate(d.getDate() + 1);
        d.setHours(10, 0, 0, 0);
        return d;
    });
    const [maxPrice, setMaxPrice] = useState(20000);
    const [sortBy, setSortBy] = useState('');
    const [stayType, setStayType] = useState('');
    const [isACFilter, setIsACFilter] = useState('all'); // 'all', 'ac', 'non-ac'
    const [adults, setAdults] = useState(2);
    const [children, setChildren] = useState(0);
    const [rooms, setRooms] = useState(1);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const filteredHotels = useMemo(() => {
        let result = [...hotelData];

        if (city) {
            result = result.filter(h => h.city.toLowerCase() === city.toLowerCase().trim());
        }

        if (maxPrice) {
            result = result.filter(h => h.pricePerNight <= maxPrice);
        }

        if (stayType) {
            result = result.filter(h => h.type === stayType);
        }

        // Filter by AC/Non-AC
        if (isACFilter !== 'all') {
            const wantAC = isACFilter === 'ac';
            result = result.filter(h =>
                h.roomTypes.some(rt => rt.isAC === wantAC)
            );
        }

        // Filter by capacity (Considering Multiple Rooms)
        const totalGuestsReq = adults + children;
        result = result.filter(h => {
            // Check if ANY room type in this hotel can accommodate the group across the requested number of rooms
            return h.roomTypes.some(rt => {
                const maxPerRoom = (rt.maxAdults || rt.maxOccupancy || 2) + (rt.maxChildren || 0);
                return (maxPerRoom * rooms) >= totalGuestsReq;
            });
        });

        if (sortBy === 'price-low') {
            result = result.sort((a, b) => a.pricePerNight - b.pricePerNight);
        } else if (sortBy === 'price-high') {
            result = result.sort((a, b) => b.pricePerNight - a.pricePerNight);
        } else if (sortBy === 'rating') {
            result = result.sort((a, b) => b.rating - a.rating);
        } else if (sortBy === 'distance') {
            result = result.sort((a, b) => a.distanceToAttraction - b.distanceToAttraction);
        }

        return result;
    }, [city, maxPrice, stayType, sortBy, isACFilter, adults, children, rooms]);

    // Smart Recommendation Logic
    const topRecommendations = useMemo(() => {
        if (!city) return [];
        // Find the best rated hotel within the selected budget
        return filteredHotels.filter(h => h.rating >= 4.5 && h.pricePerNight <= maxPrice).slice(0, 1);
    }, [filteredHotels, maxPrice, city]);



    return (
        <div className="stay-page">
            <header className="stay-header">
                <Link to="/home" className="back-link">
                    <ArrowLeft /> Back to Home
                </Link>
                <h1>Find Your Perfect Stay</h1>
                <p>Book premium hotels, cozy resorts, and peaceful homestays in Tamil Nadu.</p>
            </header>

            <section className="stay-filters-bar">
                <div className="filter-group">
                    <label>City / Place</label>
                    <select value={city} onChange={(e) => setCity(e.target.value)}>
                        {uniqueCities.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                </div>

                <div className="filter-group date-picker-wrapper">
                    <label>Check-in</label>
                    <DatePicker
                        selected={checkIn}
                        onChange={(date) => {
                            setCheckIn(date);
                            // If check-out is before or same as new check-in, push check-out to +1 day
                            if (checkOut && date >= checkOut) {
                                const newOut = new Date(date);
                                newOut.setDate(newOut.getDate() + 1);
                                setCheckOut(newOut);
                            }
                        }}
                        showTimeSelect
                        timeFormat="h aa"
                        timeIntervals={60}
                        dateFormat="MMM d, yyyy h aa"
                        placeholderText="Select Date & Time"
                        className="custom-datepicker"
                        minDate={new Date()}
                        portalId="portal-root"
                    />
                </div>

                <div className="filter-group date-picker-wrapper">
                    <label>Check-out</label>
                    <DatePicker
                        selected={checkOut}
                        onChange={(date) => setCheckOut(date)}
                        showTimeSelect
                        timeFormat="h aa"
                        timeIntervals={60}
                        dateFormat="MMM d, yyyy h aa"
                        placeholderText="Select Date & Time"
                        className="custom-datepicker"
                        minDate={checkIn || new Date()}
                        filterTime={(time) => {
                            if (!checkIn || !time) return true;
                            if (checkIn.toDateString() !== time.toDateString()) return true;
                            return time.getTime() > checkIn.getTime();
                        }}
                        portalId="portal-root"
                    />
                </div>

                <ScrollableSelect
                    label="Adults"
                    value={adults}
                    options={[...Array(16)].map((_, i) => i + 1)}
                    onChange={setAdults}
                />

                <ScrollableSelect
                    label="Children"
                    value={children}
                    options={[...Array(11)].map((_, i) => i)}
                    onChange={setChildren}
                />

                <ScrollableSelect
                    label="Rooms"
                    value={rooms}
                    options={[...Array(5)].map((_, i) => i + 1)}
                    onChange={setRooms}
                />

                <div className="filter-group budget-group">
                    <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        Budget Limit:
                        <div className="budget-input-wrapper">
                            <span>₹</span>
                            <input
                                type="number"
                                className="budget-number-input"
                                value={maxPrice}
                                onChange={(e) => setMaxPrice(e.target.value)}
                            />
                        </div>
                    </label>
                    <div className="range-slider-container">
                        <input
                            type="range"
                            min="500"
                            max="50000"
                            step="500"
                            value={maxPrice}
                            onChange={(e) => setMaxPrice(e.target.value)}
                            className="budget-range-slider"
                        />
                    </div>
                </div>

                <div className="filter-group sort-group">
                    <label>Sort By</label>
                    <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                        <option value="">Recommended</option>
                        <option value="price-low">Price: Low to High</option>
                        <option value="price-high">Price: High to Low</option>
                        <option value="rating">Top Rated</option>
                        <option value="distance">Proximity to Attractions</option>
                    </select>
                </div>
            </section>

            <div className="secondary-filters">
                <div className="sec-filter-group">
                    <button className={`sec-filter-btn ${stayType === '' ? 'active' : ''}`} onClick={() => setStayType('')}>All Stays</button>
                    <button className={`sec-filter-btn ${stayType === 'hotel' ? 'active' : ''}`} onClick={() => setStayType('hotel')}>Hotels</button>
                    <button className={`sec-filter-btn ${stayType === 'resort' ? 'active' : ''}`} onClick={() => setStayType('resort')}>Resorts</button>
                    <button className={`sec-filter-btn ${stayType === 'homestay' ? 'active' : ''}`} onClick={() => setStayType('homestay')}>Homestays</button>
                </div>
                <div className="sec-filter-group">
                    <button className={`sec-filter-btn ${isACFilter === 'all' ? 'active' : ''}`} onClick={() => setIsACFilter('all')}>All Rooms</button>
                    <button className={`sec-filter-btn ${isACFilter === 'ac' ? 'active' : ''}`} onClick={() => setIsACFilter('ac')}>AC Only</button>
                    <button className={`sec-filter-btn ${isACFilter === 'non-ac' ? 'active' : ''}`} onClick={() => setIsACFilter('non-ac')}>Non-AC</button>
                </div>
            </div>

            {
                topRecommendations.length > 0 && (
                    <div className="smart-recommendation">
                        <Bell />
                        <div>
                            <span>Smart Suggestion:</span> Based on your budget of ₹{maxPrice}, we highly recommend <strong>{topRecommendations[0].name}</strong> with a stellar {topRecommendations[0].rating} rating!
                        </div>
                    </div>
                )
            }

            <div className="hotel-grid">
                {filteredHotels.length > 0 ? (
                    filteredHotels.map(hotel => (
                        <div className="hotel-card" key={hotel.id}>
                            <div className="hotel-img-wrapper">
                                <div className="hotel-type-badge">{hotel.type}</div>
                                <div className="hotel-rating-badge"><Star /> {hotel.rating}</div>
                                <img
                                    src={hotel.image}
                                    alt={hotel.name}
                                    onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1542314831-c6a4d27eceb0?auto=format&fit=crop&w=400&q=80'; }}
                                />
                            </div>

                            <div className="hotel-info-card">
                                <h3 className="hotel-title">{hotel.name}</h3>
                                <div className="hotel-location">
                                    <MapPin /> {hotel.location}, {hotel.city}
                                </div>

                                <div className="hotel-amenities">
                                    {hotel.amenities.slice(0, 3).map((am, i) => (
                                        <span key={i} className="amenity-tag">{am}</span>
                                    ))}
                                    {hotel.amenities.length > 3 && <span className="amenity-tag">+{hotel.amenities.length - 3}</span>}
                                </div>

                                <p style={{ fontSize: '0.85em', color: '#666', marginBottom: '15px' }}>
                                    {hotel.distanceToAttraction} km from center
                                </p>

                                <div className="hotel-card-footer">
                                    <div className="hotel-price">
                                        <span className="price-label">Starts from</span>
                                        <span className="price-val">₹{hotel.pricePerNight}</span>
                                    </div>
                                    <div className="hotel-actions">
                                        <Link to={`/hotel-details?id=${hotel.id}&in=${checkIn ? checkIn.toISOString() : ''}&out=${checkOut ? checkOut.toISOString() : ''}&adults=${adults}&children=${children}&rooms=${rooms}&book=true`} className="btn-primary" style={{ flex: 1, textAlign: 'center' }}>View & Book</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="no-hotels">
                        <h3>No stays found!</h3>
                        <p>Try adjusting your budget or changing the filter options.</p>
                    </div>
                )}
            </div>

        </div>
    );
};

export default Stay;
