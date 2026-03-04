import React from 'react';
import { User, Settings, LogOut, ChevronRight, MapPin, Heart, Bell } from 'lucide-react';
import './Profile.css';

const Profile = ({ user, onLogout, onClose }) => {
    return (
        <div className="profile-overlay">
            <div className="profile-sidebar">
                <div className="profile-header">
                    <div className="profile-info-main">
                        <div className="profile-avatar">
                            <img src={`https://ui-avatars.com/api/?name=${user.email}&background=2d5a27&color=fff`} alt="Avatar" />
                        </div>
                        <div className="user-details">
                            <h2>{user.email.split('@')[0]}</h2>
                            <p>{user.email}</p>
                        </div>
                    </div>
                    <button className="close-profile" onClick={onClose}>&times;</button>
                </div>

                <div className="profile-stats">
                    <div className="stat-item">
                        <span className="stat-value">12</span>
                        <span className="stat-label">Visited</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-value">25</span>
                        <span className="stat-label">Favorites</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-value">8</span>
                        <span className="stat-label">Reviews</span>
                    </div>
                </div>

                <div className="profile-menu">
                    <div className="menu-group">
                        <h3>Account Settings</h3>
                        <button className="menu-item">
                            <User size={20} />
                            <span>Personal Information</span>
                            <ChevronRight size={16} />
                        </button>
                        <button className="menu-item">
                            <Heart size={20} />
                            <span>My Favorites</span>
                            <ChevronRight size={16} />
                        </button>
                        <button className="menu-item">
                            <MapPin size={20} />
                            <span>Travel History</span>
                            <ChevronRight size={16} />
                        </button>
                    </div>

                    <div className="menu-group">
                        <h3>Preferences</h3>
                        <button className="menu-item">
                            <Bell size={20} />
                            <span>Notifications</span>
                            <ChevronRight size={16} />
                        </button>
                        <button className="menu-item">
                            <Settings size={20} />
                            <span>Global Settings</span>
                            <ChevronRight size={16} />
                        </button>
                    </div>
                </div>

                <button className="logout-btn" onClick={onLogout}>
                    <LogOut size={20} />
                    <span>Logout</span>
                </button>
            </div>
        </div>
    );
};

export default Profile;
