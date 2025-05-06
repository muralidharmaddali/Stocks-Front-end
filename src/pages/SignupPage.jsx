import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [department, setDepartment] = useState('');
  const [idNumber, setIdNumber] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!username || !password || !name || !department || !idNumber || !email) {
      setError('All fields are required.');
      return;
    }

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/api/signup`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username,
            password,
            name,
            department,
            idNumber,
            email,
            role: 'user',
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || 'Signup failed.');
      } else {
        alert('Signup successful! Please log in.');
        navigate('/');
      }
    } catch (err) {
      setError('Server error during signup.');
    }
  };

  return (
    <div className="signup-container">
      <center><h2>Sign Up</h2></center>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSignup}>
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        /><br />
        <input
          type="text"
          placeholder="Department"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
        /><br />
        <input
          type="text"
          placeholder="ID Number"
          value={idNumber}
          onChange={(e) => setIdNumber(e.target.value)}
        /><br />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        /><br />
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        /><br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        /><br />
        <button type="submit">Sign Up</button>
        <p>
          <center>Already a User? Click here{' '}</center>
          <button type="button" onClick={() => navigate('/')}>
            Login
          </button>
        </p>
      </form>
    </div>
  );
};

export default SignupPage;
