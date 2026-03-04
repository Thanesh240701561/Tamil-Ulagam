import React from 'react';
import { Star, Heart, ChevronRight } from 'lucide-react';

const DestinationCard = ({ name, description, image, rating, likes }) => {
  return (
    <div className="destination-card">
      <img src={image} alt={name} className="destination-image" />
      <div className="destination-info">
        <h3 className="destination-name">{name}</h3>
        <p className="destination-category">{description}</p>
        <div className="destination-stats">
          <div className="stars">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={14} fill={i < rating ? "#ffb800" : "none"} stroke={i < rating ? "#ffb800" : "#cbd5e0"} />
            ))}
          </div>
          <div className="like-count">
            <Heart size={14} />
            {likes}
          </div>
        </div>
      </div>
      <ChevronRight className="arrow-icon" size={20} />
    </div>
  );
};

export default DestinationCard;
