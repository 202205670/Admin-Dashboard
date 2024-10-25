import React from 'react'
import "./topbar.css"



const LogoWidget = () => {
  return (
    <header className="topbar">
    <div className="topbar-container">
      <div className="logo">
        <img src="GTLS_LOGO.jpg" alt="GTLS_LOGO" className="logo-image" />
        <span className="logo-text">GOLDTIGER - DRIVER</span>
      </div>
    </div>
  </header>
);
}

export default LogoWidget;
