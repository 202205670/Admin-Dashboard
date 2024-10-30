import React from "react";
import { useNavigate } from "react-router-dom";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import TableComponent from "../../components/Table/TableComponent";
import { faTruck } from '@fortawesome/free-solid-svg-icons';
import "./RunsheetDetailPage.css";

const RunsheetPage = () => {
  const navigate = useNavigate();

  const runsheetData = {
    Runsheet: "#32571",
    driver: "Ahmad Ahmad",
    vehicle: "25536",
    branch: "Sydney",
    startTime: "11:20 AM",
    finishTime: "12:20 PM",
    restTime: "12:20 PM",
    status: "Open",
    startKMs: 793306,
    finishedKMs: 793488,
    totalKMs: 128,
    checkboxes: {
      status: true,
      vehicleSafety: true,
      driverSafety: true,
      fuelAdded: true,
    },
  };

  const recentActivities = [
    { id: 2, consig: "C002", customer: "Customer B", runsheet: "R002", source: "Source B", destination: "Destination B", time_In: "09:00", time_Out: "11:00", priority: "2", status: "Not Active", type: "Type B" },
    { id: 1, consig: "C001", customer: "Customer A", runsheet: "R001", source: "Source A", destination: "Destination A", time_In: "08:00", time_Out: "10:00", priority: "1", status: "Active", type: "Type A" },
    { id: 2, consig: "C002", customer: "Customer B", runsheet: "R002", source: "Source B", destination: "Destination B", time_In: "09:00", time_Out: "11:00", priority: "2", status: "Not Active", type: "Type B" },
    { id: 2, consig: "C002", customer: "Customer B", runsheet: "R002", source: "Source B", destination: "Destination B", time_In: "09:00", time_Out: "11:00", priority: "2", status: "Not Active", type: "Type B" },
    { id: 2, consig: "C002", customer: "Customer B", runsheet: "R002", source: "Source B", destination: "Destination B", time_In: "09:00", time_Out: "11:00", priority: "2", status: "Not Active", type: "Type B" },
    { id: 2, consig: "C002", customer: "Customer B", runsheet: "R002", source: "Source B", destination: "Destination B", time_In: "09:00", time_Out: "11:00", priority: "2", status: "Not Active", type: "Type B" },
    { id: 2, consig: "C002", customer: "Customer B", runsheet: "R002", source: "Source B", destination: "Destination B", time_In: "09:00", time_Out: "11:00", priority: "2", status: "Not Active", type: "Type B" },
  
  ];

  const handleEditClick = () => {
    navigate(`/edit-runsheet/${runsheetData.id}`);
  };

  const handleCancelClick = () => {
    navigate("/runsheets"); // Navigate back to the main Runsheet page
  };

  return (
    <PageWrapper showAddButton={false}>
      <div className="runsheet-details">
        <div>
          <h2>Runsheet Details</h2>
        </div>
        <div className="runsheet-info">
          <div className="info-item"><strong>Runsheet:</strong> {runsheetData.Runsheet}</div>
          <div className="info-item"><strong>Driver:</strong> {runsheetData.driver}</div>
          <div className="info-item"><strong>Vehicle:</strong> {runsheetData.vehicle}</div>
          <div className="info-item"><strong>Branch:</strong> {runsheetData.branch}</div>
        </div>
        <div className="runsheet-info">
          <div className="info-item"><strong>Start Time:</strong> {runsheetData.startTime}</div>
          <div className="info-item"><strong>Finish Time:</strong> {runsheetData.finishTime}</div>
          <div className="info-item"><strong>Rest Time:</strong> {runsheetData.restTime}</div>
          <label>Status:<input type="checkbox" checked={runsheetData.checkboxes.status} readOnly /> {runsheetData.checkboxes.status ? "Open" : "Closed"}</label>
        </div>
        <div className="runsheet-info">
          <div className="info-item"><strong>Start KM’s:</strong> {runsheetData.startKMs}</div>
          <div className="info-item"><strong>Finished KM’s:</strong> {runsheetData.finishedKMs}</div>
          <div className="info-item"><strong>Total KM’s:</strong> {runsheetData.totalKMs}</div>
        </div>
        
        <div className="checkboxes">
          <label><input type="checkbox" checked={runsheetData.checkboxes.vehicleSafety} readOnly /> Vehicle Safety</label>
          <label><input type="checkbox" checked={runsheetData.checkboxes.driverSafety} readOnly /> Driver Safety</label>
          <label><input type="checkbox" checked={runsheetData.checkboxes.fuelAdded} readOnly /> Fuel Added</label>
        </div>

        <div className="recent-activities">
          <TableComponent
            data={recentActivities}
            columns={[
              "consig",
              "customer",
              "runsheet",
              "source",
              "destination",
              "time_In",
              "time_Out",
              "priority",
              "status",
              "type",
            ]}
            editPageUrl="/edit-consignment"
            pageSpecificIcons={faTruck}
          />
        </div>
        
        <div className="button-group">
          
          <button className="cancel-button" onClick={handleCancelClick}>Cancel</button>
          <button className="edit-button" onClick={handleEditClick}>Edit</button>
        </div>
      </div>
    </PageWrapper>
  );
};

export default RunsheetPage;
