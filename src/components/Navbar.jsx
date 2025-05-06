import React from 'react';

const Navbar = ({ onMenuClick, isLoggedIn }) => {
  return (
    <div className="navbar">
      {isLoggedIn && (
        <div className="menu-icon" onClick={onMenuClick}>
          &#9776;
        </div>
      )}
      <div className="navbar-center">Resources and Stocks Management</div>
      <img
        src="https://swecha.org/sites/default/files/2021-05/Swecha.png"
        alt="Logo"
        style={{ height: '40px' }}
      />
    </div>
  );
};

export default Navbar;
