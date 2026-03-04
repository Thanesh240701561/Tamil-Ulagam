import React, { useState, useEffect } from 'react';
import Home from './pages/Home';
import Explore from './pages/Explore';
import Login from './components/Login';
import Profile from './components/Profile';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [currentPage, setCurrentPage] = useState('home'); // 'home' or 'explore'
  const [showProfile, setShowProfile] = useState(false);

  // Auto-login for demo purposes or check local storage if needed
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = (email) => {
    const userData = { email };
    setUser(userData);
    setIsLoggedIn(true);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
    setShowProfile(false);
    localStorage.removeItem('user');
  };

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="app-root">
      {currentPage === 'home' ? (
        <Home
          onProfileClick={() => setShowProfile(true)}
          onExploreClick={() => setCurrentPage('explore')}
        />
      ) : (
        <Explore onBack={() => setCurrentPage('home')} />
      )}

      {showProfile && (
        <Profile
          user={user}
          onLogout={handleLogout}
          onClose={() => setShowProfile(false)}
        />
      )}
    </div>
  );
}

export default App;
