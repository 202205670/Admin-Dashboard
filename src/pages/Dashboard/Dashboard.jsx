import React, { useState } from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import "./dashboard.css";
import DriversPage from "../Drivers/DriverList";
import EmployeesPage from "../Employees/EmployeesPage";
import ConsignmentsPage from "../Consignments/ConsignmentsPage";
import RunsheetPage from "../Runsheets/RunsheetsPage";
import VehiclePage from "../Vehicles/Vehicle";

// Define active and inactive colors
const COLORS = ["#EDCB54", "#FFECAB"];

const Dashboard = () => {
  const [driverCounts, setDriverCounts] = useState({ active: 0, inactive: 0 });
  const [employeeCounts, setEmployeeCounts] = useState({ active: 0, inactive: 0 });
  const [consignmentCounts, setConsignmentCounts] = useState({ active: 0, inactive: 0 });
  const [runsheetCounts, setRunsheetCounts] = useState({ active: 0, inactive: 0 });
  const [vehicleCounts, setVehicleCounts] = useState({ active: 0, inactive: 0 });

  const generateChartData = (active, inactive) => [
    { name: "Active", value: active },
    { name: "Not Active", value: inactive },
  ];

  return (
    <PageWrapper title="Dashboard" showAddButton={false}>
      <div className="dashboard-container">
        
        {/* Driver Status */}
        <div className="dashboard-box">
          <h2>Drivers</h2>
          <p> Active: <span className="status-dot active-dot"></span>{driverCounts.active}</p>
          <p> Not Active: <span className="status-dot inactive-dot"></span> {driverCounts.inactive}</p>
          <PieChart width={200} height={150}>
            <Pie
              data={generateChartData(driverCounts.active, driverCounts.inactive)}
            
            >
              {generateChartData(driverCounts.active, driverCounts.inactive).map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        
        </div>
        <DriversPage updateDriverCount={setDriverCounts} showRecords={true} />

        {/* Employee Status */}
        <div className="dashboard-box">
          <h2>Employees</h2>
          <p> Active: <span className="status-dot active-dot"></span>{employeeCounts.active}</p>
          <p> Not Active: <span className="status-dot inactive-dot"></span> {employeeCounts.inactive}</p>
          <PieChart width={200} height={150}>
            <Pie
              data={generateChartData(employeeCounts.active, employeeCounts.inactive)}
           
            >
              {generateChartData(employeeCounts.active, employeeCounts.inactive).map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
          
        </div>
        <EmployeesPage updateEmployeeCount={setEmployeeCounts} showRecords={true} />

        {/* Consignment Status */}
        <div className="dashboard-box">
          <h2>Consignments</h2>
          <p>Active: <span className="status-dot active-dot"></span> {consignmentCounts.active}</p>
          <p>Not Active: <span className="status-dot inactive-dot"></span> {consignmentCounts.inactive}</p>
          <PieChart width={200} height={150}>
            <Pie
              data={generateChartData(consignmentCounts.active, consignmentCounts.inactive)}
            
            >
              {generateChartData(consignmentCounts.active, consignmentCounts.inactive).map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        
        </div>
        <ConsignmentsPage updateConsignmentCount={setConsignmentCounts} showRecords={true} />

        {/* Runsheet Status */}
        <div className="dashboard-box">
          <h2>Runsheets</h2>
          <p> Open: <span className="status-dot active-dot"></span>{runsheetCounts.active}</p>
          <p> Closed: <span className="status-dot inactive-dot"></span>  {runsheetCounts.inactive}</p>
          <PieChart width={200} height={150}>
            <Pie
              data={generateChartData(runsheetCounts.active, runsheetCounts.inactive)}
         
            >
              {generateChartData(runsheetCounts.active, runsheetCounts.inactive).map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        
        </div>
        <RunsheetPage updateRunsheetCount={setRunsheetCounts} showRecords={true} />

        {/* Vehicle Status */}
        <div className="dashboard-box">
          <h2>Vehicle</h2>
          <p>Active: <span className="status-dot active-dot"></span>{vehicleCounts.active}</p>
          <p>Not Active: <span className="status-dot inactive-dot"></span> {vehicleCounts.inactive}</p>
          <PieChart width={200} height={150}>
            <Pie
              data={generateChartData(vehicleCounts.active, vehicleCounts.inactive)}
           
            >
              {generateChartData(vehicleCounts.active, vehicleCounts.inactive).map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        
        </div>
        <VehiclePage updateVehicleCount={setVehicleCounts} showRecords={true} />
      </div>
    </PageWrapper>
  );
};

export default Dashboard;
