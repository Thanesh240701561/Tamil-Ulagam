import React, { useState } from 'react';
import { Search, Camera, ArrowLeft, User } from 'lucide-react';
import DestinationCard from '../components/DestinationCard';

const destinations = [
    {
        id: 1,
        name: 'Kanyakumari Beach',
        description: 'Beautiful seaside spot',
        image: 'https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c7f?auto=format&fit=crop&w=800&q=80',
        rating: 5,
        likes: 425
    },
    {
        id: 2,
        name: 'Kalikesam',
        description: 'Serene forest area',
        image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=800&q=80',
        rating: 5,
        likes: 203
    },
    {
        id: 3,
        name: 'Kodayar',
        description: 'Scenic hill reservoir',
        image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=80',
        rating: 5,
        likes: 210
    },
    {
        id: 4,
        name: 'Kattabomman Memorial',
        description: 'Historic freedom fighter site',
        image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80',
        rating: 5,
        likes: 178
    },
    {
        id: 5,
        name: 'Kanalkesam',
        description: 'Breathtaking viewpoints',
        image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
        rating: 5,
        likes: 156
    }
];

function Explore({ onBack, onProfileClick }) {
    const [searchTerm, setSearchTerm] = useState('Ka');

    const filteredDestinations = destinations.filter(dest =>
        dest.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="app-container">
            <header className="wave-container">
                <svg className="wave-background" viewBox="0 0 1440 320" preserveAspectRatio="none">
                    <path fill="#ffffff" fillOpacity="1" d="M0,160L48,176C96,192,192,224,288,224C384,224,480,192,576,165.3C672,139,768,117,864,122.7C960,128,1056,160,1152,165.3C1248,171,1344,149,1392,138.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                    <path fill="#e0f2f1" fillOpacity="0.5" d="M0,64L48,85.3C96,107,192,149,288,149.3C384,149,480,107,576,112C672,117,768,171,864,181.3C960,192,1056,160,1152,144C1248,128,1344,128,1392,128L1440,128L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path>
                </svg>
                <div className="header-content">
                    <button className="back-button" onClick={onBack}>
                        <ArrowLeft size={24} color="#555" />
                    </button>
                    <h1 className="page-title">Explore</h1>
                    <button className="profile-btn-small" onClick={onProfileClick}>
                        <User size={20} color="#555" />
                    </button>
                </div>
            </header>

            <div className="search-section">
                <div className="search-bar-container">
                    <Search size={20} className="search-icon" />
                    <input
                        type="text"
                        className="search-input"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search destinations..."
                    />
                    <Camera size={20} className="camera-icon" />
                </div>
            </div>

            <main className="destinations-list">
                {filteredDestinations.map(dest => (
                    <DestinationCard
                        key={dest.id}
                        {...dest}
                    />
                ))}
            </main>
        </div>
    );
}

export default Explore;
