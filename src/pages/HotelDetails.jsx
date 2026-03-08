import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { hotelData } from '../utils/hotelData';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import '../styles/stay.css';

const MapPin = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>;
const Check = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>;
const ArrowLeft = () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" /></svg>;

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
        <div className={`filter-group compact custom-select-wrapper ${isOpen ? 'open' : ''}`} ref={wrapperRef} style={{ position: 'relative' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.8em', fontWeight: '700', textTransform: 'uppercase', color: '#444' }}>{label}</label>
            <div className="custom-select-trigger" onClick={() => setIsOpen(!isOpen)} style={{ width: '100%', padding: '10px', borderRadius: '10px', border: '1px solid #eee', background: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', fontFamily: 'Outfit, sans-serif' }}>
                <span style={{ fontSize: '0.95em', fontWeight: '600' }}>{value}</span>
                <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
                    <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </div>
            {isOpen && (
                <div className="custom-options no-scrollbar" style={{ position: 'absolute', top: '100%', left: '0', right: '0', background: '#fff', border: '1px solid #eee', borderRadius: '10px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', zIndex: 1000, maxHeight: '150px', overflowY: 'auto', marginTop: '5px' }}>
                    {options.map(opt => (
                        <div
                            key={opt}
                            className={`custom-option ${value === opt ? 'selected' : ''}`}
                            onClick={() => { onChange(opt); setIsOpen(false); }}
                            style={{ padding: '10px 15px', fontSize: '0.9em', cursor: 'pointer', color: value === opt ? '#fff' : '#333', background: value === opt ? '#1e88e5' : 'transparent' }}
                        >
                            {opt}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

const HotelDetails = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const hotelId = searchParams.get('id');
    const defaultCheckIn = searchParams.get('in') || '';
    const defaultCheckOut = searchParams.get('out') || '';
    console.log("Loading Hotel with ID:", hotelId); // Debugging link
    const autoBook = searchParams.get('book');

    const hotel = hotelData.find(h => h.id?.toString().toLowerCase().trim() === hotelId?.toString().toLowerCase().trim());

    if (!hotel) {
        return <div className="hotel-details-container"><h2>Hotel not found!</h2><Link to="/stay">Back to Stays</Link></div>;
    }

    const [selectedRooms, setSelectedRooms] = useState({}); // { [rt.type]: count }
    const [checkIn, setCheckIn] = useState(defaultCheckIn ? new Date(defaultCheckIn) : null);
    const [checkOut, setCheckOut] = useState(defaultCheckOut ? new Date(defaultCheckOut) : null);
    const [adults, setAdults] = useState(parseInt(searchParams.get('adults')) || 2);
    const [children, setChildren] = useState(parseInt(searchParams.get('children')) || 0);
    const [rooms, setRooms] = useState(parseInt(searchParams.get('rooms')) || 1);

    const nearbyAttractions = useMemo(() => {
        if (!hotel || !window.destinationsData) return [];
        return window.destinationsData
            .filter(dest => dest.city.toLowerCase() === hotel.city.toLowerCase())
            .slice(0, 6)
            .map(dest => ({
                id: dest.id,
                name: dest.name,
                image: dest.image,
                distance: (Math.random() * 5 + 1).toFixed(1) + " km" // Generate a random realistic distance
            }));
    }, [hotel]);

    const totalPrice = useMemo(() => {
        if (!checkIn || !checkOut || isNaN(checkIn.getTime()) || isNaN(checkOut.getTime())) return 0;
        const diff = checkOut.getTime() - checkIn.getTime();
        const nights = Math.max(1, Math.ceil(diff / (1000 * 60 * 60 * 24)));

        let total = 0;
        Object.entries(selectedRooms).forEach(([type, count]) => {
            const rt = hotel.roomTypes.find(r => r.type === type);
            if (rt) total += rt.price * count;
        });

        // Fallback for logic if no room selected yet, use starting price
        if (total === 0) total = hotel.pricePerNight * rooms;

        return total * nights;
    }, [selectedRooms, hotel, checkIn, checkOut, rooms]);

    useEffect(() => {
        window.scrollTo(0, 0);
        if (autoBook === 'true') {
            setTimeout(() => {
                const widget = document.querySelector('.booking-widget');
                if (widget) widget.scrollIntoView({ behavior: 'smooth' });
            }, 500);
        }
    }, [autoBook]);

    const handleRoomSelection = (type, action) => {
        setSelectedRooms(prev => {
            const current = prev[type] || 0;
            const next = action === 'add' ? current + 1 : Math.max(0, current - 1);
            const newState = { ...prev };
            if (next === 0) delete newState[type];
            else newState[type] = next;
            return newState;
        });
    };

    const handleBookNow = () => {
        const totalRoomsSelected = Object.values(selectedRooms).reduce((a, b) => a + b, 0);

        if (totalRoomsSelected === 0) {
            alert("Please select at least one room.");
            return;
        }
        if (!checkIn || !checkOut) {
            alert("Please select Check-in and Check-out dates.");
            return;
        }

        // Capacity check
        let totalAdultCap = 0;
        let totalChildCap = 0;
        Object.entries(selectedRooms).forEach(([type, count]) => {
            const rt = hotel.roomTypes.find(r => r.type === type);
            if (rt) {
                totalAdultCap += (rt.maxAdults || rt.maxOccupancy || 2) * count;
                totalChildCap += (rt.maxChildren || 0) * count;
            }
        });

        if (adults > totalAdultCap) {
            alert(`Capacity Issue: Selected rooms fit ${totalAdultCap} adults, but you have ${adults}. Please add more rooms.`);
            return;
        }
        if (children > totalChildCap && totalChildCap > 0) {
            // For children, often adults can swap, but let's be strict if data exists
            // Or just check total guests vs total potential
            const remainingAdultSlots = totalAdultCap - adults;
            if (children > (totalChildCap + remainingAdultSlots)) {
                alert(`Capacity Issue: Selected rooms don't fit ${children} children. Please add more rooms.`);
                return;
            }
        }

        if (!checkIn || !checkOut || isNaN(checkIn.getTime()) || isNaN(checkOut.getTime())) {
            alert("Please select valid Check-in and Check-out dates.");
            return;
        }

        const roomSummary = Object.entries(selectedRooms).map(([type, count]) => `${count}x ${type}`).join(', ');

        navigate(`/booking-confirmation?hotel=${encodeURIComponent(hotel.name)}&room=${encodeURIComponent(roomSummary)}&in=${checkIn.toISOString()}&out=${checkOut.toISOString()}&adults=${adults}&children=${children}&rooms=${totalRoomsSelected}&total=${totalPrice}`);
    };

    return (
        <div className="hotel-details-container fade-in">
            <Link to="/stay" className="details-back"><ArrowLeft /> Back to stays</Link>

            <div className="hotel-gallery">
                <img
                    src={hotel.imagesGallery[0] || hotel.image}
                    alt={hotel.name}
                    className="gallery-main"
                    onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1542314831-c6a4d27eceb0?auto=format&fit=crop&w=800&q=80'; }}
                />
                <div className="gallery-side">
                    {hotel.imagesGallery.slice(1, 3).map((img, i) => (
                        <img
                            key={i}
                            src={img}
                            alt="Gallery"
                            onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=400&q=80'; }}
                        />
                    ))}
                </div>
            </div>

            <div className="details-grid">
                <div className="details-main-info">
                    <h1>{hotel.name}</h1>
                    <div className="details-meta">
                        <span className="meta-tag location"><MapPin /> {hotel.location}, {hotel.city}</span>
                        <span className="meta-tag rating" style={{ background: '#FFD700', color: '#111' }}>{hotel.rating} ⭐</span>
                        <span className="meta-tag type" style={{ background: '#f1f1f1', color: '#555' }}>{hotel.type}</span>
                    </div>

                    <h3 className="section-title">Amenities</h3>
                    <div className="features-grid">
                        {hotel.amenities.map(am => (
                            <div className="feature-item" key={am}><Check /> {am}</div>
                        ))}
                    </div>

                    <h3 className="section-title">Nearby Tourist Attractions</h3>
                    <div className="attractions-list">
                        {nearbyAttractions.length > 0 ? nearbyAttractions.map((attr, i) => (
                            <Link to={`/details?id=${attr.id}`} className="attraction-card" key={i} style={{ textDecoration: 'none' }}>
                                <img
                                    src={attr.image}
                                    alt={attr.name}
                                    className="attraction-img"
                                    onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1596489392263-ce2ff40994f1?auto=format&fit=crop&w=400&q=80'; }}
                                />
                                <div className="attraction-info">
                                    <h4>{attr.name}</h4>
                                    <p>{attr.distance} away from property</p>
                                </div>
                            </Link>
                        )) : (
                            <p style={{ color: '#888', fontStyle: 'italic', fontSize: '0.9em' }}>Discovering nearby treasures in {hotel.city}...</p>
                        )}
                    </div>

                    <h3 className="section-title">Select Rooms</h3>
                    <div className="rooms-list">
                        {hotel.roomTypes.map((rt, i) => (
                            <div className="room-card" key={i} style={{ borderColor: selectedRooms[rt.type] ? '#1e88e5' : '#eaeaea', background: selectedRooms[rt.type] ? '#f0f7ff' : '#fff' }}>
                                <div style={{ flex: 1 }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <div className="room-name">{rt.type}</div>
                                        {rt.isAC ? <span className="ac-badge">AC</span> : <span className="ac-badge non-ac">Non-AC</span>}
                                    </div>
                                    <p style={{ color: '#777', fontSize: '0.85em', marginTop: '6px' }}>
                                        Fits {rt.maxAdults || rt.maxOccupancy || 2} Adults, {rt.maxChildren || 0} Children
                                    </p>
                                </div>
                                <div className="room-price-info">
                                    <div className="room-price" style={{ textAlign: 'right', marginBottom: '8px' }}>₹{rt.price}<span>/night</span></div>

                                    <div className="room-counter">
                                        <button className="count-btn" onClick={() => handleRoomSelection(rt.type, 'remove')}>-</button>
                                        <span className="count-val">{selectedRooms[rt.type] || 0}</span>
                                        <button className="count-btn" onClick={() => handleRoomSelection(rt.type, 'add')}>+</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div>
                    <div className="booking-widget">
                        <div className="widget-price">
                            ₹{hotel.pricePerNight} <span>/night onwards</span>
                        </div>

                        <div className="date-selector" style={{ marginBottom: '15px' }}>
                            <label style={{ display: 'block', marginBottom: '8px' }}>Check-in Date & Time</label>
                            <DatePicker
                                selected={checkIn}
                                onChange={(date) => {
                                    setCheckIn(date);
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
                                wrapperClassName="date-picker-wrapper"
                                minDate={new Date()}
                                portalId="portal-root"
                            />
                        </div>

                        <div className="date-selector" style={{ marginBottom: '15px' }}>
                            <label style={{ display: 'block', marginBottom: '8px' }}>Check-out Date & Time</label>
                            <DatePicker
                                selected={checkOut}
                                onChange={(date) => setCheckOut(date)}
                                showTimeSelect
                                timeFormat="h aa"
                                timeIntervals={60}
                                dateFormat="MMM d, yyyy h aa"
                                placeholderText="Select Date & Time"
                                className="custom-datepicker"
                                wrapperClassName="date-picker-wrapper"
                                minDate={checkIn || new Date()}
                                filterTime={(time) => {
                                    if (!checkIn || !time) return true;
                                    if (checkIn.toDateString() !== time.toDateString()) return true;
                                    return time.getTime() > checkIn.getTime();
                                }}
                                portalId="portal-root"
                            />
                        </div>

                        <div className="guest-selector-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginBottom: '15px' }}>
                            <ScrollableSelect
                                label="Adults"
                                value={adults}
                                options={[...Array(16)].map((_, i) => i + 1)}
                                onChange={setAdults}
                                portalId="portal-root"
                            />
                            <ScrollableSelect
                                label="Children"
                                value={children}
                                options={[...Array(11)].map((_, i) => i)}
                                onChange={setChildren}
                                portalId="portal-root"
                            />
                            <ScrollableSelect
                                label="Rooms"
                                value={rooms}
                                options={[...Array(5)].map((_, i) => i + 1)}
                                onChange={setRooms}
                                portalId="portal-root"
                            />
                        </div>

                        {Object.keys(selectedRooms).length > 0 && (
                            (() => {
                                let adCap = 0; let chCap = 0;
                                Object.entries(selectedRooms).forEach(([t, c]) => {
                                    const rt = hotel.roomTypes.find(r => r.type === t);
                                    if (rt) { adCap += (rt.maxAdults || rt.maxOccupancy || 2) * c; chCap += (rt.maxChildren || 0) * c; }
                                });
                                if (adults > adCap || children > (chCap + (adCap - adults))) {
                                    return <p style={{ color: '#d32f2f', fontSize: '0.75em', marginBottom: '10px', fontWeight: '500' }}>
                                        ⚠️ Capacity Warning: selected rooms fit {adCap} adults & {chCap} children.
                                    </p>;
                                }
                                return null;
                            })()
                        )}

                        <div className="booking-summary" style={{ marginBottom: '20px', padding: '15px', background: '#f8f9fa', borderRadius: '12px', border: '1px dashed #1e88e5' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                <span style={{ color: '#666' }}>Stay Duration:</span>
                                <span style={{ fontWeight: '600' }}>{Math.max(1, Math.ceil((checkOut?.getTime() || 0) - (checkIn?.getTime() || 0)) / (1000 * 60 * 60 * 24))} Night(s)</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                <span style={{ color: '#666' }}>Rooms Selected:</span>
                                <span style={{ fontWeight: '600', textAlign: 'right', fontSize: '0.85em' }}>
                                    {Object.entries(selectedRooms).map(([type, count]) => `${count}x ${type}`).join('\n') || 'None'}
                                </span>
                            </div>
                            <hr style={{ border: 'none', borderTop: '1px solid #eee', margin: '10px 0' }} />
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.2em' }}>
                                <span style={{ fontWeight: 'bold' }}>Total Amount:</span>
                                <span style={{ fontWeight: 'bold', color: '#1e88e5' }}>₹{totalPrice}</span>
                            </div>
                        </div>

                        <button className="btn-primary book-now-btn" onClick={handleBookNow}>
                            Book Now
                        </button>
                        <p style={{ textAlign: 'center', fontSize: '0.8em', color: '#888', marginTop: '15px' }}>You won't be charged yet.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HotelDetails;
