import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import TableComponent from "../../components/Table/TableComponent"; 

import { faFileExcel } from '@fortawesome/free-solid-svg-icons'; 

const RunsheetPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [branch, setBranch] = useState("");
  const [status, setStatus] = useState(""); 
  const navigate = useNavigate();

  // Sample data for runsheets - replace with actual data source
  const runsheetsData = [
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
      branch: "Branch B",
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
  ];

  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  const handleBranchChange = (value) => {
    setBranch(value); // Handle branch search
  };

  const handleStatusChange = (value) => {
    setStatus(value); // Handle status search
  };

  
  const filteredData = runsheetsData.filter((item) => {
    const matchesSearch = item.runsheet.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBranch = branch ? item.branch.toLowerCase() === branch.toLowerCase() : true; // Branch filter
    const matchesStatus = status ? item.status.toLowerCase() === status.toLowerCase() : true; // Status filter

    return matchesSearch && matchesBranch && matchesStatus; // Combined filter
  });

  return (
    <PageWrapper
      title="Runsheets"
      filters={["search", "branch", "status"]} 
      placeholders={{ search: "Search by Runsheet #", branch: "Branch", status: "Status" }} 
      addButtonLabel="Add Runsheet"
      onAddClick={() => navigate("/add-runsheet")}
      showAddButton={true}
      onSearch={handleSearch}
      onBranchChange={handleBranchChange} 
      onStatusChange={handleStatusChange}
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
        data={filteredData} 
        editPageUrl="/edit-runsheet"
        pageSpecificIcons={faFileExcel} 
      />
    </PageWrapper>
  );
};

export default RunsheetPage;
