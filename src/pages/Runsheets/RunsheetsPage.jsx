import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { faFileExcel } from '@fortawesome/free-solid-svg-icons';
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import TableComponent from "../../components/Table/TableComponent"; 
import useStatusCount from "../../hooks/useStatusCount"; // Import the status count hook if needed

const RunsheetPage = ({ updateRunsheetCount, showRecords }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [branch, setBranch] = useState("");
  const [status, setStatus] = useState("");
  const [runsheetsData, setRunsheetsData] = useState([
    // Sample data for runsheets - replace with actual data source
    {
      id: 1,
      runsheet: "12321",
      driver: "Ahmad Ahmad",
      vehicle: "x285",
      startTime: "08:00 AM",
      finishTime: "10:00 PM",
      restTime: "7:00 PM",
      status: "Open",
      addedBy: "Bassam",
      branch: "Sydney",
    },
    {
      id: 2,
      runsheet: "R002",
      driver: "Driver B",
      vehicle: "Vehicle B",
      startTime: "09:00",
      finishTime: "11:00",
      restTime: "45 mins",
      status: "Closed",
      addedBy: "Admin",
      branch: "Melbourne",
    },
    {
      id: 1,
      runsheet: "12321",
      driver: "Ahmad Ahmad",
      vehicle: "x285",
      startTime: "08:00 AM",
      finishTime: "10:00 PM",
      restTime: "7:00 PM",
      status: "Open",
      addedBy: "Bassam",
      branch: "Sydney",
    },
    {
      id: 2,
      runsheet: "R002",
      driver: "Driver B",
      vehicle: "Vehicle B",
      startTime: "09:00",
      finishTime: "11:00",
      restTime: "45 mins",
      status: "Closed",
      addedBy: "Admin",
      branch: "Melbourne",
    },
    {
      id: 1,
      runsheet: "12321",
      driver: "Ahmad Ahmad",
      vehicle: "x285",
      startTime: "08:00 AM",
      finishTime: "10:00 PM",
      restTime: "7:00 PM",
      status: "Open",
      addedBy: "Bassam",
      branch: "Sydney",
    },
    {
      id: 2,
      runsheet: "R002",
      driver: "Driver B",
      vehicle: "Vehicle B",
      startTime: "09:00",
      finishTime: "11:00",
      restTime: "45 mins",
      status: "Closed",
      addedBy: "Admin",
      branch: "Melbourne",
    },
    {
      id: 1,
      runsheet: "12321",
      driver: "Ahmad Ahmad",
      vehicle: "x285",
      startTime: "08:00 AM",
      finishTime: "10:00 PM",
      restTime: "7:00 PM",
      status: "Open",
      addedBy: "Bassam",
      branch: "Sydney",
    },
    {
      id: 2,
      runsheet: "R002",
      driver: "Driver B",
      vehicle: "Vehicle B",
      startTime: "09:00",
      finishTime: "11:00",
      restTime: "45 mins",
      status: "Closed",
      addedBy: "Admin",
      branch: "Melbourne",
    },
    {
      id: 1,
      runsheet: "12321",
      driver: "Ahmad Ahmad",
      vehicle: "x285",
      startTime: "08:00 AM",
      finishTime: "10:00 PM",
      restTime: "7:00 PM",
      status: "Open",
      addedBy: "Bassam",
      branch: "Sydney",
    },
    {
      id: 2,
      runsheet: "R002",
      driver: "Driver B",
      vehicle: "Vehicle B",
      startTime: "09:00",
      finishTime: "11:00",
      restTime: "45 mins",
      status: "Closed",
      addedBy: "Admin",
      branch: "Melbourne",
    },
    {
      id: 1,
      runsheet: "12321",
      driver: "Ahmad Ahmad",
      vehicle: "x285",
      startTime: "08:00 AM",
      finishTime: "10:00 PM",
      restTime: "7:00 PM",
      status: "Open",
      addedBy: "Bassam",
      branch: "Sydney",
    },
    {
      id: 2,
      runsheet: "R002",
      driver: "Driver B",
      vehicle: "Vehicle B",
      startTime: "09:00",
      finishTime: "11:00",
      restTime: "45 mins",
      status: "Closed",
      addedBy: "Admin",
      branch: "Melbourne",
    },
    {
      id: 1,
      runsheet: "12321",
      driver: "Ahmad Ahmad",
      vehicle: "x285",
      startTime: "08:00 AM",
      finishTime: "10:00 PM",
      restTime: "7:00 PM",
      status: "Open",
      addedBy: "Bassam",
      branch: "Sydney",
    },
    {
      id: 2,
      runsheet: "R002",
      driver: "Driver B",
      vehicle: "Vehicle B",
      startTime: "09:00",
      finishTime: "11:00",
      restTime: "45 mins",
      status: "Closed",
      addedBy: "Admin",
      branch: "Melbourne",
    },
    {
      id: 1,
      runsheet: "12321",
      driver: "Ahmad Ahmad",
      vehicle: "x285",
      startTime: "08:00 AM",
      finishTime: "10:00 PM",
      restTime: "7:00 PM",
      status: "Open",
      addedBy: "Bassam",
      branch: "Sydney",
    },
    {
      id: 2,
      runsheet: "R002",
      driver: "Driver B",
      vehicle: "Vehicle B",
      startTime: "09:00",
      finishTime: "11:00",
      restTime: "45 mins",
      status: "Closed",
      addedBy: "Admin",
      branch: "Melbourne",
    },
    
  ]);

  // Calculate active (open) and inactive (closed) counts
  const activeCount = runsheetsData.filter(item => item.status === "Open").length;
  const inactiveCount = runsheetsData.filter(item => item.status === "Closed").length;

  useEffect(() => {
    if (typeof updateRunsheetCount === "function") {
      updateRunsheetCount({ active: activeCount, inactive: inactiveCount });
    }
  }, [activeCount, inactiveCount, updateRunsheetCount]);

  // Return nothing if showRecords is false
  if (showRecords) return null;

  // If showRecords is true, render the runsheet records and UI
  return (
    <PageWrapper
      title="Runsheets"
      filters={["search", "branch", "status"]}
      placeholders={{
        search: "Search by Runsheet #",
        branch: "Branch",
        status: "Status",
      }}
      addButtonLabel="Add Runsheet"
      onAddClick={() => navigate("/add-runsheet")}
      showAddButton={true}
      onSearch={(value) => setSearchTerm(value)}
      onBranchChange={(value) => setBranch(value)}
      onStatusChange={(value) => setStatus(value)}
      statusOptions={["Open", "Closed"]}
    >
      <TableComponent
        columns={[
          "runsheet",
          "driver",
          "vehicle",
          "startTime",
          "finishTime",
          "restTime",
          "status",
          "addedBy",
          "branch",
        ]}
        data={runsheetsData.filter((item) => 
          item.runsheet.toLowerCase().includes(searchTerm.toLowerCase()) &&
          (branch === "" || item.branch === branch) &&
          (status === "" || item.status === status)
        )}
        editPageUrl="/edit-runsheet"
        pageSpecificIcons={faFileExcel}
      />
    </PageWrapper>
  );
};

export default RunsheetPage;
