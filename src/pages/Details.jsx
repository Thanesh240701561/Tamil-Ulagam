import React, { useState, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

const Details = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const id = searchParams.get('id');
    const [showModal, setShowModal] = useState(false);

    const destinationsData = window.destinationsData || [];
    const place = useMemo(() => destinationsData.find(d => d.id === id), [id, destinationsData]);

    if (!place) {
        return (
            <div className="details-container">
                <header className="details-header">
                    <button className="back-btn" onClick={() => navigate(-1)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="19" y1="12" x2="5" y2="12" />
                            <polyline points="12 19 5 12 12 5" />
                        </svg>
                    </button>
                    <div className="header-title">Details</div>
                </header>
                <div className="content-padding"><h2>Place not found</h2></div>
            </div>
        );
    }

    const mapQuery = encodeURIComponent(`${place.name}, ${place.city}, Tamil Nadu`);
    const gallery = place.gallery || [place.image];

    return (
        <>
            <div className="details-container">
                <header className="details-header">
                    <button className="back-btn" onClick={() => navigate(-1)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="19" y1="12" x2="5" y2="12" />
                            <polyline points="12 19 5 12 12 5" />
                        </svg>
                    </button>
                    <div className="header-title">{place.name}</div>
                </header>

                <div className="hero-section" onClick={() => setShowModal(true)}>
                    <img src={place.image} alt={place.name} className="hero-img" />
                </div>

                <div className="content-padding">
                    <h1 className="place-name">{place.name}</h1>
                    <div className="rating-loc">
                        <div className="rating-val">
                            <span>⭐</span> <span>{place.rating}</span> Rating
                        </div>
                        <div className="location-text">
                            📌 <span>{place.location}</span>
                        </div>
                    </div>

                    <div className="about-section">
                        <h2 className="section-title">About</h2>
                        <p className="about-text">{place.about || place.description}</p>
                    </div>

                    <div className="map-link-section">
                        <a href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`}
                            target="_blank" rel="noopener noreferrer" className="map-link">
                            <span>📌</span> Locate on Map
                        </a>
                    </div>
                </div>

                {/* Gallery Modal */}
                {showModal && (
                    <div className="modal" style={{ display: 'flex' }} onClick={(e) => { if (e.target === e.currentTarget) setShowModal(false); }}>
                        <span className="close-modal" onClick={() => setShowModal(false)}>&times;</span>
                        <div className="modal-content">
                            {gallery.map((imgUrl, i) => (
                                <img key={i} src={imgUrl} alt={`Gallery ${i + 1}`} className="modal-img" />
                            ))}
                        </div>
                        <div className="modal-hint">Swipe left/right to view more</div>
                    </div>
                )}
            </div>

            <style>{`
                .details-container { max-width: 600px; margin: 0 auto; background: #fff; min-height: 100vh; position: relative; }
                .details-header { display: flex; align-items: center; justify-content: center; padding: 20px; position: sticky; top: 0; background: #fff; z-index: 10; box-shadow: 0 2px 10px rgba(0,0,0,0.05); }
                .back-btn { position: absolute; left: 20px; background: none; border: none; cursor: pointer; color: var(--text-main); display: flex; align-items: center; justify-content: center; }
                .header-title { font-size: 18px; font-weight: 700; }
                .hero-section { width: 100%; height: 350px; overflow: hidden; cursor: pointer; position: relative; }
                .hero-img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.3s ease; }
                .hero-section:hover .hero-img { transform: scale(1.05); }
                .content-padding { padding: 24px; }
                .place-name { font-size: 28px; font-weight: 700; margin-bottom: 8px; }
                .rating-loc { display: flex; align-items: center; gap: 15px; margin-bottom: 24px; color: var(--text-light); font-size: 14px; }
                .rating-val { display: flex; align-items: center; gap: 4px; color: #fb8c00; font-weight: 600; }
                .section-title { font-size: 20px; font-weight: 700; margin-bottom: 12px; }
                .about-text { color: var(--text-light); line-height: 1.8; margin-bottom: 30px; }
                .map-link-section { border-top: 1px solid #eee; padding-top: 20px; }
                .map-link { display: flex; align-items: center; gap: 10px; text-decoration: none; color: #1e88e5; font-weight: 600; padding: 12px; background: #e3f2fd; border-radius: 12px; transition: background 0.2s; }
                .map-link:hover { background: #bbdefb; }
                .modal { display: none; position: fixed; z-index: 100; left: 0; top: 0; width: 100%; height: 100%; background-color: rgba(0,0,0,0.9); flex-direction: column; align-items: center; justify-content: center; }
                .modal-content { width: 100%; max-width: 800px; display: flex; overflow-x: auto; scroll-snap-type: x mandatory; gap: 10px; padding: 20px; }
                .modal-img { flex: 0 0 100%; scroll-snap-align: center; width: 100%; height: 60vh; object-fit: contain; }
                .close-modal { position: absolute; top: 20px; right: 20px; color: #fff; font-size: 40px; cursor: pointer; z-index: 110; }
                .modal-hint { color: #ccc; margin-top: 10px; font-size: 14px; }
            `}</style>
        </>
    );
};

export default Details;
