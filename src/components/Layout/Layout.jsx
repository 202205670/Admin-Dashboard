import React, { Fragment, useEffect, useState } from 'react';
import Sidebar from '../sidebar/sidebar';
import Topbar from '../topbar/topbar';
import './Layout.css'; // CSS for the layout

const Layout = (props) => {
  return (
    <Fragment>
      {props.isAuthenticated && <Topbar className="topbar" />} {/* Show Topbar if authenticated */}
      <div className="layout-container">
        {props.isAuthenticated && <Sidebar className="sidebar" />} {/* Show Sidebar if authenticated */}
        <div className="main-content">
          {props.children} {/* Page-specific content will render here */}
        </div>
      </div>
    </Fragment>
  );
};

export default Layout;
