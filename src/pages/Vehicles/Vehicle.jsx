import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import TableComponent from "../../components/Table/TableComponent";

import {  faTruck } from '@fortawesome/free-solid-svg-icons'; 

const VehiclePage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [branch, setBranch] = useState("");
  const [status, setStatus] = useState("");
  const navigate = useNavigate();

  // Sample data for vehicles - replace with actual data source
  const vehiclesData = [
    {
      id: 1,
      vehicle: "V001",
      plate: "ABC123",
      branch: "Sydney",
      status: "Active",
      vehicleType: "Truck",
     
    },
    {
      id: 2,
      vehicle: "V002",
      plate: "XYZ789",
      branch: "Brisbane",
      status: "Not Active",
      vehicleType: "Trailer",
      
    },
    {
      id: 1,
      vehicle: "V001",
      plate: "ABC123",
      branch: "Sydney",
      status: "Active",
      vehicleType: "Truck",
     
    },
    {
      id: 2,
      vehicle: "V002",
      plate: "XYZ789",
      branch: "Brisbane",
      status: "Not Active",
      vehicleType: "Trailer",
      
    },
    {
      id: 1,
      vehicle: "V001",
      plate: "ABC123",
      branch: "Sydney",
      status: "Active",
      vehicleType: "Truck",
     
    },
    {
      id: 2,
      vehicle: "V002",
      plate: "XYZ789",
      branch: "Brisbane",
      status: "Not Active",
      vehicleType: "Trailer",
      
    },
    {
      id: 1,
      vehicle: "V001",
      plate: "ABC123",
      branch: "Sydney",
      status: "Active",
      vehicleType: "Truck",
     
    },
    {
      id: 2,
      vehicle: "V002",
      plate: "XYZ789",
      branch: "Brisbane",
      status: "Not Active",
      vehicleType: "Trailer",
      
    },
    {
      id: 1,
      vehicle: "V001",
      plate: "ABC123",
      branch: "Sydney",
      status: "Active",
      vehicleType: "Truck",
     
    },
    {
      id: 2,
      vehicle: "V002",
      plate: "XYZ789",
      branch: "Brisbane",
      status: "Not Active",
      vehicleType: "Trailer",
      
    },
    {
      id: 1,
      vehicle: "V001",
      plate: "ABC123",
      branch: "Sydney",
      status: "Active",
      vehicleType: "Truck",
     
    },
    {
      id: 2,
      vehicle: "V002",
      plate: "XYZ789",
      branch: "Brisbane",
      status: "Not Active",
      vehicleType: "Trailer",
      
    },
  ];

  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  const handleBranchChange = (value) => {
    setBranch(value);
  };

  const handleStatusChange = (value) => {
    setStatus(value);
  };

  // Filtering data based on search term, branch, and status
  const filteredData = vehiclesData.filter((item) => {
    const matchesSearch = item.vehicle.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBranch = branch ? item.branch === branch : true; 
    const matchesStatus = status ? item.status === status : true;
    return matchesSearch && matchesBranch && matchesStatus;
  });

  return (
    <PageWrapper
      title="Vehicles"
      filters={["search", "branch", "status"]}
      placeholders={{ search: "Search by Vehicle #", branch: "Branch", status: "Status" }}
      addButtonLabel="Add Vehicle"
      onAddClick={() => navigate("/add-vehicle")}
      showAddButton={true}
      onSearch={handleSearch}
      onBranchChange={handleBranchChange}
      onStatusChange={handleStatusChange}
      statusOptions={["Active", "Not Active"]}
    >
      <TableComponent
        columns={[
          "vehicle", 
          "plate",        
          "branch",        
          "status",  
          "vehicleType",   
      
          
        ]}
        data={filteredData} 
        editPageUrl="/edit-vehicle"
        pageSpecificIcons={faTruck} 
      />
    </PageWrapper>
  );
};

export default VehiclePage;
