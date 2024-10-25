import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { faUser } from "@fortawesome/free-solid-svg-icons"; 
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import TableComponent from "../../components/Table/TableComponent"; 

const DriversPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [branch, setBranch] = useState("");
  const [status, setStatus] = useState("");
  const navigate = useNavigate();

  // Sample data for the table
  const driversData = [
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "123-456-7890",
      branch: "Branch A",
      status: "Active",
      address: "123 Main St",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      phone: "987-654-3210",
      branch: "Branch B",
      status: "Not Active",
      address: "456 Elm St",
    },
    {
      id: 3,
      name: "Michael Brown",
      email: "michael.brown@example.com",
      phone: "555-123-4567",
      branch: "Branch C",
      status: "Active",
      address: "789 Oak St",
    },
    {
      id: 4,
      name: "Emily Davis",
      email: "emily.davis@example.com",
      phone: "555-987-6543",
      branch: "Branch A",
      status: "Inactive",
      address: "101 Maple St",
    },
    {
      id: 5,
      name: "David Wilson",
      email: "david.wilson@example.com",
      phone: "123-555-7890",
      branch: "Branch B",
      status: "Active",
      address: "202 Pine St",
    },
    {
      id: 6,
      name: "Sophia Johnson",
      email: "sophia.johnson@example.com",
      phone: "987-123-6543",
      branch: "Branch C",
      status: "Inactive",
      address: "303 Birch St",
    },
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "123-456-7890",
      branch: "Branch A",
      status: "Active",
      address: "123 Main St",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      phone: "987-654-3210",
      branch: "Branch B",
      status: "Not Active",
      address: "456 Elm St",
    },
    {
      id: 3,
      name: "Michael Brown",
      email: "michael.brown@example.com",
      phone: "555-123-4567",
      branch: "Branch C",
      status: "Active",
      address: "789 Oak St",
    },
    {
      id: 4,
      name: "Emily Davis",
      email: "emily.davis@example.com",
      phone: "555-987-6543",
      branch: "Branch A",
      status: "Inactive",
      address: "101 Maple St",
    },
    {
      id: 5,
      name: "David Wilson",
      email: "david.wilson@example.com",
      phone: "123-555-7890",
      branch: "Branch B",
      status: "Active",
      address: "202 Pine St",
    },
    {
      id: 6,
      name: "Sophia Johnson",
      email: "sophia.johnson@example.com",
      phone: "987-123-6543",
      branch: "Branch C",
      status: "Inactive",
      address: "303 Birch St",
    },
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "123-456-7890",
      branch: "Branch A",
      status: "Active",
      address: "123 Main St",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      phone: "987-654-3210",
      branch: "Branch B",
      status: "Not Active",
      address: "456 Elm St",
    },
    {
      id: 3,
      name: "Michael Brown",
      email: "michael.brown@example.com",
      phone: "555-123-4567",
      branch: "Branch C",
      status: "Active",
      address: "789 Oak St",
    },
    {
      id: 4,
      name: "Emily Davis",
      email: "emily.davis@example.com",
      phone: "555-987-6543",
      branch: "Branch A",
      status: "Inactive",
      address: "101 Maple St",
    },
    {
      id: 5,
      name: "David Wilson",
      email: "david.wilson@example.com",
      phone: "123-555-7890",
      branch: "Branch B",
      status: "Active",
      address: "202 Pine St",
    },
    {
      id: 6,
      name: "Sophia Johnson",
      email: "sophia.johnson@example.com",
      phone: "987-123-6543",
      branch: "Branch C",
      status: "Inactive",
      address: "303 Birch St",
    },
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "123-456-7890",
      branch: "Branch A",
      status: "Active",
      address: "123 Main St",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      phone: "987-654-3210",
      branch: "Branch B",
      status: "Not Active",
      address: "456 Elm St",
    },
    {
      id: 3,
      name: "Michael Brown",
      email: "michael.brown@example.com",
      phone: "555-123-4567",
      branch: "Branch C",
      status: "Active",
      address: "789 Oak St",
    },
    {
      id: 4,
      name: "Emily Davis",
      email: "emily.davis@example.com",
      phone: "555-987-6543",
      branch: "Branch A",
      status: "Inactive",
      address: "101 Maple St",
    },
    {
      id: 5,
      name: "David Wilson",
      email: "david.wilson@example.com",
      phone: "123-555-7890",
      branch: "Branch B",
      status: "Active",
      address: "202 Pine St",
    },
    {
      id: 6,
      name: "Sophia Johnson",
      email: "sophia.johnson@example.com",
      phone: "987-123-6543",
      branch: "Branch C",
      status: "Inactive",
      address: "303 Birch St",
    },
  ];

  const columns = ["name", "email", "phone", "branch", "status", "address"];

  // Filter drivers based on search, branch, and status
  const filteredDrivers = driversData.filter((driver) => {
    const matchesSearchTerm =
      driver.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBranch = branch === "" || driver.branch === branch;
    const matchesStatus = status === "" || driver.status === status;

    return matchesSearchTerm && matchesBranch && matchesStatus;
  });

  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  const handleBranchChange = (value) => {
    setBranch(value);
  };

  const handleStatusChange = (value) => {
    setStatus(value);
  };

  return (
    <PageWrapper
      title="Drivers"
      filters={["search", "branch", "status"]}
      placeholders={{
        search: "Search by Name",
        branch: "Branch",
        status: "Status",
      }}
      addButtonLabel="Add Driver"
      onAddClick={() => navigate("/add-driver")}
      showAddButton={true}
      onSearch={handleSearch}
      onBranchChange={handleBranchChange}
      onStatusChange={handleStatusChange}
      statusOptions={["Active", "Not Active"]}
    >
      <TableComponent
        columns={columns}
        data={filteredDrivers} 
        editPageUrl="/edit-driver" 
        pageSpecificIcons={faUser} 
      />
    </PageWrapper>
  );
};

export default DriversPage;
