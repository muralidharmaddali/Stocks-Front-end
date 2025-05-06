import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';  // Adjust the path as needed
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import AdminSidebar from './components/AdminSIdebar';// Make sure this path is correct

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');

  const toggleSidebar = () => {
    setSidebarOpen(prev => !prev);
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('role');
    setIsLoggedIn(false);
    setSidebarOpen(false);
  };

  useEffect(() => {
    const checkLogin = () => {
      setIsLoggedIn(localStorage.getItem('isLoggedIn') === 'true');
    };

    window.addEventListener('storage', checkLogin);
    return () => window.removeEventListener('storage', checkLogin);
  }, []);

  const role = localStorage.getItem('role'); // either 'admin' or 'user'

  return (
    <Router>
      <div className="app-container">
        <Navbar onMenuClick={toggleSidebar} isLoggedIn={isLoggedIn} />
        <div className="layout">
          {isLoggedIn && (
            role === 'admin' ? (
              <AdminSidebar isOpen={sidebarOpen} onLogout={handleLogout} />
            ) : (
              <Sidebar isOpen={sidebarOpen} onLogout={handleLogout} />
            )
          )}
          <div className="main-content">
            <AppRoutes setIsLoggedIn={setIsLoggedIn} />
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
