import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import TableComponent from "../../components/Table/TableComponent"; // Ensure this path is correct
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTruck } from '@fortawesome/free-solid-svg-icons'; // Consignment icon

const ConsignmentsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [status, setStatus] = useState("");
  const navigate = useNavigate();

  // Sample data for consignments - replace with actual data source
  const consignmentsData = [
    { id: 1, consig: "C001", customer: "Customer A", runsheet: "R001", source: "Source A", destination: "Destination A", timeIn: "08:00", timeOut: "10:00", priority: "1", status: "Active", type: "Type A" },
    { id: 2, consig: "C002", customer: "Customer B", runsheet: "R002", source: "Source B", destination: "Destination B", timeIn: "09:00", timeOut: "11:00", priority: "2", status: "Not Active", type: "Type B" },
    { id: 1, consig: "C001", customer: "Customer A", runsheet: "R001", source: "Source A", destination: "Destination A", timeIn: "08:00", timeOut: "10:00", priority: "1", status: "Active", type: "Type A" },
    { id: 2, consig: "C002", customer: "Customer B", runsheet: "R002", source: "Source B", destination: "Destination B", timeIn: "09:00", timeOut: "11:00", priority: "2", status: "Not Active", type: "Type B" },
    { id: 1, consig: "C001", customer: "Customer A", runsheet: "R001", source: "Source A", destination: "Destination A", timeIn: "08:00", timeOut: "10:00", priority: "1", status: "Active", type: "Type A" },
    { id: 2, consig: "C002", customer: "Customer B", runsheet: "R002", source: "Source B", destination: "Destination B", timeIn: "09:00", timeOut: "11:00", priority: "2", status: "Not Active", type: "Type B" },
    { id: 1, consig: "C001", customer: "Customer A", runsheet: "R001", source: "Source A", destination: "Destination A", timeIn: "08:00", timeOut: "10:00", priority: "1", status: "Active", type: "Type A" },
    { id: 2, consig: "C002", customer: "Customer B", runsheet: "R002", source: "Source B", destination: "Destination B", timeIn: "09:00", timeOut: "11:00", priority: "2", status: "Not Active", type: "Type B" },
    { id: 1, consig: "C001", customer: "Customer A", runsheet: "R001", source: "Source A", destination: "Destination A", timeIn: "08:00", timeOut: "10:00", priority: "1", status: "Active", type: "Type A" },
    { id: 2, consig: "C002", customer: "Customer B", runsheet: "R002", source: "Source B", destination: "Destination B", timeIn: "09:00", timeOut: "11:00", priority: "2", status: "Not Active", type: "Type B" },
    { id: 1, consig: "C001", customer: "Customer A", runsheet: "R001", source: "Source A", destination: "Destination A", timeIn: "08:00", timeOut: "10:00", priority: "1", status: "Active", type: "Type A" },
    { id: 2, consig: "C002", customer: "Customer B", runsheet: "R002", source: "Source B", destination: "Destination B", timeIn: "09:00", timeOut: "11:00", priority: "2", status: "Not Active", type: "Type B" },
    
  ];

  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  const handleStatusChange = (value) => {
    setStatus(value);
  };

  // Filtering data based on search term and status
  const filteredData = consignmentsData.filter((item) => {
    const matchesSearch = item.consig.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = status ? item.status.toLowerCase() === status.toLowerCase() : true; 
    return matchesSearch && matchesStatus;
  });

  return (
    <PageWrapper
      title="Consignments"
      filters={["search", "status"]}
      placeholders={{ search: "Search by Consignment #", status: "Status" }}
      addButtonLabel="Add Consignment"
      onAddClick={() => navigate("/add-consignment")}
      showAddButton={true}
      onSearch={handleSearch}
      onStatusChange={handleStatusChange}
      statusOptions={["Active", "Not Active"]}
    >
      <TableComponent
        columns={[
          "consig", // Updated to consig#
          "customer",
          "runsheet", // Updated to runsheet#
          "source",
          "destination",
          "timeIn",
          "timeOut",
          "priority",
          "status",
          "type",
        ]}
        data={filteredData} // Use filtered data for the table
        editPageUrl="/edit-consignment"
        pageSpecificIcons={faTruck}
      />
    </PageWrapper>
  );
};

export default ConsignmentsPage;
