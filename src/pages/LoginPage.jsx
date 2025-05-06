import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginPage = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [loginType, setLoginType] = useState('user'); // 'user' or 'admin'

  useEffect(() => {
    const rememberedUser = localStorage.getItem('rememberedUser');
    if (rememberedUser) {
      setUsername(rememberedUser);
      setRememberMe(true);
    }
  }, []);

  const handleLogin = async () => {
    if (username.trim() === '' || password.trim() === '') {
      alert('Please enter both username and password.');
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/api/login`,
        { username, password }
      );

      const user = response.data.user;

      localStorage.setItem('userId', user._id);
      localStorage.setItem('role', user.role);
      localStorage.setItem('isLoggedIn', 'true');

      if (rememberMe) {
        localStorage.setItem('rememberedUser', username);
      } else {
        localStorage.removeItem('rememberedUser');
      }

      setIsLoggedIn(true);
      alert(`${user.role.charAt(0).toUpperCase() + user.role.slice(1)} login successful! Redirecting...`);

      if (user.role === 'admin') {
        navigate('/adminDashboard');
      } else {
        navigate('/dashboard');
      }

    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Login failed. Please try again.');
    }
  };

  const handleShowSignup = (e) => {
    e.preventDefault();
    navigate('/signup');
  };

  const handleLoginTypeSwitch = (type) => {
    setLoginType(type);
    setUsername('');
    setPassword('');
  };

  return (
    <div className="container" id="loginPage">
      <div className="tabs">
        <button
          className={loginType === 'user' ? 'active-tab' : ''}
          onClick={() => handleLoginTypeSwitch('user')}
        >
          User
        </button>
        <button
          className={loginType === 'admin' ? 'active-tab' : ''}
          onClick={() => handleLoginTypeSwitch('admin')}
        >
          Admin
        </button>
      </div>
      <div className="sign-in-title">{loginType.charAt(0).toUpperCase() + loginType.slice(1)}</div>
      <input
        type="text"
        value={username}
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        value={password}
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <div className="remember-me">
        <input
          type="checkbox"
          id="rememberMe"
          checked={rememberMe}
          onChange={() => setRememberMe(!rememberMe)}
        />
        <label htmlFor="rememberMe">Remember Me</label>
      </div>
      <button onClick={handleLogin}>Login</button>
      <br /><br />
      {loginType === 'user' && (
        <h5>
          If you are new?{' '}
          <a href="/" onClick={handleShowSignup} style={{ color: '#007bff' }}>
            Sign up
          </a>
        </h5>
      )}
    </div>
  );
};

export default LoginPage;
