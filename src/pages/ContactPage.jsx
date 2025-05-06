import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ContactPage = () => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/users/role/admin');
        setAdmin(res.data);
      } catch (err) {
        console.error('Failed to fetch admin info:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAdmin();
  }, []);

  return (
    <div className="contact-container" id="contactPage">
      <h2>Contact Info</h2>
      {loading ? (
        <p>Loading...</p>
      ) : admin ? (
        <div className="contact-details">
          <div><span>Name:</span> {admin.name}</div>
          <div><span>Department:</span> {admin.department}</div>
          <div><span>ID No:</span> {admin.idNumber}</div>
          <div><span>Email:</span> {admin.email}</div>
        </div>
      ) : (
        <p>Admin details not available.</p>
      )}
    </div>
  );
};

export default ContactPage;
