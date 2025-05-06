import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate();

  const goToPendingRequests = () => {
    navigate('/PendingList');
  };

  const goToBorrowedList = () => {
    navigate('/BorrowList');
  };

  return (
    <div className="admin-dashboard-container" style={styles.container}>
    <div style={styles.innerContainer}>
      <h1 style={styles.heading}>Admin Dashboard</h1>
      <div style={styles.buttonGroup}>
        <button style={styles.button} onClick={goToPendingRequests}>
          Pending Requests
        </button>
        <button style={styles.button} onClick={goToBorrowedList}>
          Borrowed List
        </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
  height: '100vh',
  width: '100%', // Corrected to full width of screen
  display: 'flex',
  padding: '40px 20px',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
},
innerContainer: {
  width: '100%',
  maxWidth: '400px',
  backgroundColor: '#ffffff',
  padding: '40px 30px',
  borderRadius: '60px', // Rounded top and bottom (cylinder effect)
  boxShadow: '0 6px 20px rgba(0, 0, 0, 0.1)',
  border: '1px solid #dee2e6',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
},
  heading: {
    marginBottom: '40px',
    fontSize: '2rem',
    fontWeight: 'bold',
  },
  buttonGroup: {
    display: 'flex',
    gap: '20px',
  },
  button: {
    padding: '15px 30px',
    fontSize: '16px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
  },
};

export default AdminDashboard;
