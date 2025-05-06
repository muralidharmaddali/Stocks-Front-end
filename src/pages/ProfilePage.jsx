import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProfilePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Added to track loading state

  useEffect(() => {
    const fetchProfile = async () => {
      const userId = localStorage.getItem('userId');

      if (!userId) {
        alert('User not logged in');
        return navigate('/');
      }

      try {
        const res = await axios.get(`http://localhost:5000/api/users/${userId}`);
        setUser(res.data);
      } catch (err) {
        console.error('Failed to fetch user profile:', err);
        alert('Failed to load profile. Please login again.');
        localStorage.clear();
        navigate('/');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="profile-container" id="profilePage">
      <h2>Profile Info</h2>
      {user ? (
        <div className="profile-details">
          <div><span>Name:</span> {user.name}</div>
          <div><span>Department:</span> {user.department}</div>
          <div><span>ID No:</span> {user.idNumber}</div>
          <div><span>Email:</span> {user.email}</div>
          <div><span>Role:</span> {user.role}</div>
        </div>
      ) : (
        <p>No user data available</p>
      )}
      <button className="profile-button" onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default ProfilePage;
