import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import TableComponent from "../../components/Table/TableComponent"; // Assuming the TableComponent is inside components folder
import { faUser } from '@fortawesome/free-solid-svg-icons'; // Import employee icon
import "./AddEmployee";

const EmployeesPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [branch, setBranch] = useState("");
  const navigate = useNavigate();

  // Example employee data, replace this with actual data from props or API call
  const employees = [
  
    { id: 1, name: "John Doe", email: "john@example.com", branch: "SYDNEY", address: "123 Main St" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", branch: "MELBOURNE", address: "456 Oak St" },
    { id: 3, name: "Emily Davis", email: "emily@example.com", branch: "BRISBANE", address: "789 Pine St" },
    { id: 4, name: "Michael Brown", email: "michael@example.com", branch: "SYDNEY", address: "101 Elm St" },
    { id: 5, name: "Sarah Johnson", email: "sarah@example.com", branch: "MELBOURNE", address: "202 Maple St" },
    { id: 1, name: "John Doe", email: "john@example.com", branch: "SYDNEY", address: "123 Main St" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", branch: "MELBOURNE", address: "456 Oak St" },
    { id: 3, name: "Emily Davis", email: "emily@example.com", branch: "BRISBANE", address: "789 Pine St" },
    { id: 4, name: "Michael Brown", email: "michael@example.com", branch: "SYDNEY", address: "101 Elm St" },
    { id: 5, name: "Sarah Johnson", email: "sarah@example.com", branch: "MELBOURNE", address: "202 Maple St" },
    { id: 1, name: "John Doe", email: "john@example.com", branch: "SYDNEY", address: "123 Main St" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", branch: "MELBOURNE", address: "456 Oak St" },
    { id: 3, name: "Emily Davis", email: "emily@example.com", branch: "BRISBANE", address: "789 Pine St" },
    { id: 4, name: "Michael Brown", email: "michael@example.com", branch: "SYDNEY", address: "101 Elm St" },
    { id: 5, name: "Sarah Johnson", email: "sarah@example.com", branch: "MELBOURNE", address: "202 Maple St" },
  ];

  // Filter logic (update based on your actual filtering needs)
  const filteredEmployees = employees.filter((employee) => {
    return (
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      employee.branch.toLowerCase().includes(branch.toLowerCase())
    );
  });

  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  const handleBranchChange = (value) => {
    setBranch(value);
  };
  

  const columns = ["name", "email", "branch", "address"];

  return (
    <PageWrapper
      title="Employees"
      filters={["search", "branch"]}
      placeholders={{ search: "Search by Name", branch: "Branch" }}
      addButtonLabel="Add Employee"
      onAddClick={() => navigate("/add-employee")}
      showAddButton={true}
      onSearch={handleSearch}
      onBranchChange={handleBranchChange}
    >
      <TableComponent
        columns={columns}
        data={filteredEmployees}
        editPageUrl="/edit-employee"
        pageSpecificIcons={faUser} // Employee icon before each record
      />
    </PageWrapper>
  );
};

export default EmployeesPage;
