import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  const goToStockManagement = () => {
    navigate('/stocks');
  };

  return (
    <div className="container" id="dashboard">
      <h1>Welcome to Your Dashboard</h1>
      <br/>
      <p>Manage your stock efficiently with this platform.</p>
      <button className="dashboard-button" onClick={goToStockManagement}>
        Go to Stock Management
      </button>
    </div>
  );
};

export default Dashboard;
