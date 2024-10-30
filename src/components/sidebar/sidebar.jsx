import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Dashboard,
  Person,
  Group,
  Inventory,
  Assignment,
  Hub,
  DirectionsCar,
} from "@mui/icons-material";
import "./sidebar.css";

export default function Sidebar() {
  const location = useLocation();
  const [activePage, setActivePage] = useState(location.pathname || "/");

  const handlePageChange = (page) => {
    setActivePage(page);
  };

  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="profileSection">
          <div className="profileIcon">
            <Person />
          </div>
          <div className="profileInfo">
            <h3 className="profileName">Younes</h3>
            <span className="profileEmail">Younes@gtls.com.au</span>
          </div>
        </div>
        <div className="profileDivider"></div> {/* Divider line after profile info */}
        
        <div className="sidebarMenu">
          <ul className="sidebarList">
            <Link to="dashboard" className="link" onClick={() => handlePageChange("/")}>
              <li
                className={`sidebarListItem ${activePage === "/" ? "active" : ""}`}
              >
                <Dashboard className="sidebarIcon" />
                <span>Dashboard</span>
              </li>
            </Link>
            <Link to="/drivers" className="link" onClick={() => handlePageChange("/drivers")}>
              <li
                className={`sidebarListItem ${activePage === "/drivers" ? "active" : ""}`}
              >
                <Person className="sidebarIcon" />
                <span>Drivers</span>
              </li>
            </Link>
            <Link to="/employees" className="link" onClick={() => handlePageChange("/employees")}>
              <li
                className={`sidebarListItem ${activePage === "/employees" ? "active" : ""}`}
              >
                <Group className="sidebarIcon" />
                <span>Employees</span>
              </li>
            </Link>
            <Link to="/consignments" className="link" onClick={() => handlePageChange("/consignments")}>
              <li
                className={`sidebarListItem ${activePage === "/consignments" ? "active" : ""}`}
              >
                <Inventory className="sidebarIcon" />
                <span>Consignments</span>
              </li>
            </Link>
            <Link to="/runsheets" className="link" onClick={() => handlePageChange("/runsheets")}>
              <li
                className={`sidebarListItem ${activePage === "/runsheets" ? "active" : ""}`}
              >
                <Assignment className="sidebarIcon" />
                <span>Runsheets</span>
              </li>
            </Link>
            <Link to="/branches" className="link" onClick={() => handlePageChange("/branches")}>
              <li
                className={`sidebarListItem ${activePage === "/branches" ? "active" : ""}`}
              >
                <Hub className="sidebarIcon" />
                <span>Branches</span>
              </li>
            </Link>
            <Link to="/vehicles" className="link" onClick={() => handlePageChange("/vehicles")}>
              <li
                className={`sidebarListItem ${activePage === "/vehicles" ? "active" : ""}`}
              >
                <DirectionsCar className="sidebarIcon" />
                <span>Vehicles</span>
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
}
