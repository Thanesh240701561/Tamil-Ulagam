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

import './../style.css'; // Add the global style
import './styles/profile.css'; // Profile pages styling
import { initGlobalScripts } from './utils/initScripts';

function App() {
  useEffect(() => {
    initGlobalScripts();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home.html" element={<Home />} />
        <Route path="/explore.html" element={<Explore />} />
        <Route path="/details.html" element={<Details />} />
        <Route path="/categories.html" element={<Categories />} />
        <Route path="/cities.html" element={<Cities />} />
        <Route path="/profile-info.html" element={<ProfileInfo />} />
        <Route path="/profile-favorites.html" element={<ProfileFavorites />} />
        <Route path="/profile-history.html" element={<ProfileHistory />} />
        <Route path="/profile-notifications.html" element={<ProfileNotifications />} />
        <Route path="/profile-settings.html" element={<ProfileSettings />} />

        {/* Cleaner routes */}
        <Route path="/home" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/details" element={<Details />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/cities" element={<Cities />} />
        <Route path="/profile" element={<ProfileInfo />} />
      </Routes>
    </Router>
  );
}

export default App;
