import React from 'react';
import "./topbar.css";
import GTLS_LOGO from './GTlS_LOGO.jpg'; // Adjust the path based on your project structure

const LogoWidget = () => {
  return (
    <header className="topbar">
      <div className="topbar-container">
        <div className="logo">
          <img src={GTLS_LOGO} alt="GTLS_LOGO" className="logo-image" />
          <span className="logo-text">GOLD TIGER - DRIVER</span>
        </div>
      </div>
    </header>
  );
}

export default LogoWidget;
