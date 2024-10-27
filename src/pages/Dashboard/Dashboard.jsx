import React, { useState } from "react";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import "./dashboard.css";
import DriversPage from "../Drivers/DriverList";
import EmployeesPage from "../Employees/EmployeesPage";
import ConsignmentsPage from "../Consignments/ConsignmentsPage";
import RunsheetPage from "../Runsheets/RunsheetsPage";
import VehiclePage from "../Vehicles/Vehicle";


const Dashboard = () => {
  const [driverCounts, setDriverCounts] = useState({ active: 0, inactive: 0 });
  const [employeeCounts, setEmployeeCounts] = useState({ active: 0, inactive: 0 });
  const [consignmentCounts, setConsignmentCounts] = useState({ active: 0, inactive: 0 });
  const [runsheetCounts, setRunsheetCounts] = useState({ active: 0, inactive: 0 });
  const [vehicleCount, setVehicleCount] = useState({ active: 0, inactive: 0 });

  const updateDriverCount = (counts) => {
    setDriverCounts(counts);
  };

  const updateEmployeeCount = (counts) => {
    setEmployeeCounts(counts);
  };

  const updateConsignmentCount = (counts) => {
    setConsignmentCounts(counts);
  };

  const updateRunsheetCount = (counts) => {
    setRunsheetCounts(counts);
  };

  const updateVehicleCount = ({ active, inactive }) => {
    setVehicleCount({ active, inactive });
  };

  return (
    <PageWrapper title="Dashboard" showAddButton={false}>
      <div className="dashboard-container">
        <div className="dashboard-box">
          <h2>Driver Status Counts</h2>
          <p>Active: {driverCounts.active}</p>
          <p>Not Active: {driverCounts.inactive}</p>
        </div>
        {/* DriversPage is included here to calculate counts */}
        <DriversPage updateDriverCount={updateDriverCount} showRecords={true} />

        <div className="dashboard-box">
          <h2>Employee Status Counts</h2>
          <p>Active: {employeeCounts.active}</p>
          <p>Not Active: {employeeCounts.inactive}</p>
        </div>
        {/* EmployeesPage is included here to calculate counts */}
        <EmployeesPage updateEmployeeCount={updateEmployeeCount} showRecords={true} />

        <div className="dashboard-box">
          <h2>Consignment Status Counts</h2>
          <p>Active: {consignmentCounts.active}</p>
          <p>Not Active: {consignmentCounts.inactive}</p>
        </div>
        <ConsignmentsPage updateConsignmentCount={updateConsignmentCount} showRecords={true} />

        <div className="dashboard-box">
          <h2>Runsheet Status Counts</h2>
          <p>Open: {runsheetCounts.active}</p>
          <p>Closed: {runsheetCounts.inactive}</p>
        </div>
        <RunsheetPage updateRunsheetCount={updateRunsheetCount} showRecords={true} />

        <div className="dashboard-boxx">
          <h2>Vehicle Status Counts</h2>
          <p>Active Vehicles: {vehicleCount.active}</p>
          <p>Inactive Vehicles: {vehicleCount.inactive}</p>
        </div>
        <VehiclePage 
        updateVehicleCount={updateVehicleCount} 
        showRecords={true}
      />
      </div>
    </PageWrapper>
  );
};

export default Dashboard;
