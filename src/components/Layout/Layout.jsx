import React, { Fragment } from 'react';
import Sidebar from '../sidebar/sidebar';
import Topbar from '../topbar/topbar';
import "./Layout.css"; // CSS for the layout

const Layout = (props) => {
  return (
    <Fragment>
      <Topbar className="topbar" /> {/* Always show the Topbar */}

        <Sidebar className="sidebar" /> {/* Always show the Sidebar */}
        <div className="main-content">
          {props.children} {/* Page-specific content will render here */}
        </div>
 
    </Fragment>
  );
};

export default Layout;
