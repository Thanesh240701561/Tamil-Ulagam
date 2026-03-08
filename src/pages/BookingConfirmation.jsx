import React from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import '../styles/stay.css';

const BookingConfirmation = () => {
    const [searchParams] = useSearchParams();

    const hotelName = searchParams.get('hotel') || 'N/A';
    const roomType = searchParams.get('room') || 'N/A';
    const checkIn = searchParams.get('in');
    const checkOut = searchParams.get('out');
    const adults = searchParams.get('adults') || '2';
    const children = searchParams.get('children') || '0';
    const rooms = searchParams.get('rooms') || '1';
    const total = searchParams.get('total') || '0';

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('en-IN', {
            weekday: 'short', month: 'short', day: 'numeric',
            hour: 'numeric', hour12: true
        }).format(date);
    };

    return (
        <div className="booking-confirm-container" style={{ paddingTop: '100px', background: '#f4f7f6' }}>
            <div className="confirm-card" style={{ maxWidth: '600px', margin: '0 auto', background: '#fff', borderRadius: '30px', padding: '40px', boxShadow: '0 20px 60px rgba(0,0,0,0.08)', border: '1px solid #eee' }}>
                <div className="success-icon" style={{ background: '#4CAF50', color: '#fff', width: '70px', height: '70px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 25px' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                </div>
                <h1 style={{ textAlign: 'center', fontSize: '2em', fontWeight: '800', color: '#1a1a1a', marginBottom: '10px' }}>Booking Summary</h1>
                <p style={{ textAlign: 'center', color: '#666', marginBottom: '35px' }}>Your dream stay is confirmed! Here is your summary.</p>

                <div className="id-badge" style={{ textAlign: 'center', background: '#f9f9f9', padding: '10px 20px', borderRadius: '50px', margin: '0 auto 30px', display: 'block', width: 'fit-content', fontSize: '0.9em', color: '#888', fontWeight: '600' }}>
                    Booking ID: #TU-{Math.floor(100000 + Math.random() * 900000)}
                </div>

                <div className="summary-section" style={{ borderTop: '2px dashed #eee', paddingTop: '25px', marginBottom: '25px' }}>
                    <h3 style={{ fontSize: '1.25em', marginBottom: '20px', color: '#1e88e5' }}>Reservation Details</h3>
                    <div className="confirm-details" style={{ display: 'grid', gap: '15px' }}>
                        <div className="confirm-detail-row" style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #f9f9f9' }}>
                            <span style={{ color: '#888' }}>Hotel</span>
                            <span style={{ fontWeight: '700', color: '#333' }}>{hotelName}</span>
                        </div>
                        <div className="confirm-detail-row" style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #f9f9f9' }}>
                            <span style={{ color: '#888' }}>Room Selection</span>
                            <span style={{ fontWeight: '700', color: '#333' }}>{roomType}</span>
                        </div>
                        <div className="confirm-detail-row" style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #f9f9f9' }}>
                            <span style={{ color: '#888' }}>Guests</span>
                            <span style={{ fontWeight: '700', color: '#333' }}>{adults} Adult(s), {children} Child(ren)</span>
                        </div>
                        <div className="confirm-detail-row" style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #f9f9f9' }}>
                            <span style={{ color: '#888' }}>Check-in</span>
                            <span style={{ fontWeight: '700', color: '#333' }}>{formatDate(checkIn)}</span>
                        </div>
                        <div className="confirm-detail-row" style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #f9f9f9' }}>
                            <span style={{ color: '#888' }}>Check-out</span>
                            <span style={{ fontWeight: '700', color: '#333' }}>{formatDate(checkOut)}</span>
                        </div>
                    </div>
                </div>

                <div className="payment-summary" style={{ background: '#1e88e5', color: '#fff', borderRadius: '20px', padding: '25px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
                    <div>
                        <span style={{ display: 'block', fontSize: '0.9em', opacity: '0.8' }}>Total Amount Paid</span>
                        <span style={{ fontSize: '0.8em', opacity: '0.7' }}>Includes all taxes and fees</span>
                    </div>
                    <span style={{ fontSize: '2em', fontWeight: '800' }}>₹{total}</span>
                </div>

                <div style={{ display: 'flex', gap: '15px' }}>
                    <Link to="/home" className="btn-primary" style={{ flex: 1, textDecoration: 'none', background: '#1a1a1a', color: '#fff' }}>Return to Home</Link>
                    <button onClick={() => window.print()} className="btn-primary" style={{ flex: 1, background: '#fff', color: '#1a1a1a', border: '2px solid #1a1a1a' }}>Print Receipt</button>
                </div>
            </div>
        </div>
    );
};

export default BookingConfirmation;
