// AdminSidebar.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdminSidebar = ({ isOpen, onLogout }) => {
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    onLogout();
    navigate('/');
  };

  const handleDashboardClick = () => {
    navigate('/adminDashboard');
  };

  return (
    <div className={`sidebar ${isOpen ? 'active' : ''}`}>
      <ul>
        <li>
          <button onClick={handleDashboardClick} className="nav-btn">
            Dashboard
          </button>
        </li>
        <li>
          <button onClick={handleLogoutClick} className="logout-btn">
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default AdminSidebar;
