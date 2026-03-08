import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import Pages
import Login from './pages/Login';
import Home from './pages/Home';
import Explore from './pages/Explore';
import Details from './pages/Details';
import Categories from './pages/Categories';
import Cities from './pages/Cities';
import ProfileInfo from './pages/ProfileInfo';
import ProfileFavorites from './pages/ProfileFavorites';
import ProfileHistory from './pages/ProfileHistory';
import ProfileNotifications from './pages/ProfileNotifications';
import ProfileSettings from './pages/ProfileSettings';
import Stay from './pages/Stay';
import HotelDetails from './pages/HotelDetails';
import BookingConfirmation from './pages/BookingConfirmation';

import './../style.css'; // Add the global style
import './styles/profile.css'; // Profile pages styling
import { initGlobalScripts } from './utils/initScripts';
import { useLocation } from 'react-router-dom';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  useEffect(() => {
    initGlobalScripts();
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/details" element={<Details />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/cities" element={<Cities />} />
        <Route path="/profile" element={<ProfileInfo />} />
        <Route path="/profile-favorites" element={<ProfileFavorites />} />
        <Route path="/profile-history" element={<ProfileHistory />} />
        <Route path="/profile-notifications" element={<ProfileNotifications />} />
        <Route path="/profile-settings" element={<ProfileSettings />} />
        <Route path="/stay" element={<Stay />} />
        <Route path="/hotel-details" element={<HotelDetails />} />
        <Route path="/booking-confirmation" element={<BookingConfirmation />} />
      </Routes>
    </Router>
  );
}

export default App;
