import React, { Fragment, useEffect, useState } from 'react';
import Sidebar from '../sidebar/sidebar';
import Topbar from '../topbar/topbar';
import './Layout.css'; // CSS for the layout

const Layout = (props) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token'); // Retrieve token from local storage
    setIsAuthenticated(!!token); // Set to true if token exists, false otherwise
  }, []);

  return (
    <Fragment>
      {isAuthenticated && <Topbar className="topbar" />} {/* Show Topbar if authenticated */}
      <div className="layout-container">
        {isAuthenticated && <Sidebar className="sidebar" />} {/* Show Sidebar if authenticated */}
        <div className="main-content">
          {props.children} {/* Page-specific content will render here */}
        </div>
      </div>
    </Fragment>
  );
};

export default Layout;
