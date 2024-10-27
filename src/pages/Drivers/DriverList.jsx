import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import TableComponent from "../../components/Table/TableComponent"; // Ensure this is correctly imported
import useStatusCount from "../../hooks/useStatusCount"; // Ensure the hook is correctly imported

const DriversPage = ({ updateDriverCount, showRecords }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [branch, setBranch] = useState("");
  const [status, setStatus] = useState("");
  const [driversData, setDriversData] = useState([
    // Mock data
    { id: 1, name: "John Doe", email: "john@example.com", phone: "123-456-7890", branch: "Sydney", status: "Active", address: "123 Main St" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", phone: "987-654-3210", branch: "B", status: "Not Active", address: "456 Elm St" },
    { id: 3, name: "Sam Green", email: "sam@example.com", phone: "555-555-5555", branch: "A", status: "Active", address: "789 Oak St" },
    { id: 1, name: "John Doe", email: "john@example.com", phone: "123-456-7890", branch: "A", status: "Active", address: "123 Main St" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", phone: "987-654-3210", branch: "B", status: "Not Active", address: "456 Elm St" },
    { id: 3, name: "Sam Green", email: "sam@example.com", phone: "555-555-5555", branch: "A", status: "Active", address: "789 Oak St" },
    { id: 1, name: "John Doe", email: "john@example.com", phone: "123-456-7890", branch: "A", status: "Active", address: "123 Main St" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", phone: "987-654-3210", branch: "B", status: "Not Active", address: "456 Elm St" },
    { id: 3, name: "Sam Green", email: "sam@example.com", phone: "555-555-5555", branch: "A", status: "Active", address: "789 Oak St" },
    { id: 1, name: "John Doe", email: "john@example.com", phone: "123-456-7890", branch: "A", status: "Active", address: "123 Main St" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", phone: "987-654-3210", branch: "B", status: "Not Active", address: "456 Elm St" },
    { id: 3, name: "Sam Green", email: "sam@example.com", phone: "555-555-5555", branch: "A", status: "Active", address: "789 Oak St" },
    { id: 1, name: "John Doe", email: "john@example.com", phone: "123-456-7890", branch: "A", status: "Active", address: "123 Main St" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", phone: "987-654-3210", branch: "B", status: "Not Active", address: "456 Elm St" },
    { id: 3, name: "Sam Green", email: "sam@example.com", phone: "555-555-5555", branch: "A", status: "Active", address: "789 Oak St" },
  
 
 
 
  ]);

  // Calculate active and inactive counts
  const { activeCount, inactiveCount } = useStatusCount(driversData);

  useEffect(() => {
    if (typeof updateDriverCount === "function") {
      updateDriverCount({ active: activeCount, inactive: inactiveCount });
    }
  }, [activeCount, inactiveCount, updateDriverCount]);

  // Return nothing if showRecords is false
  if (showRecords) return null;

  // If showRecords is true, render the driver records and UI
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
      onSearch={(value) => setSearchTerm(value)}
      onBranchChange={(value) => setBranch(value)}
      onStatusChange={(value) => setStatus(value)}
      statusOptions={["Active", "Not Active"]}
    >
      <TableComponent
        columns={["name", "email", "phone", "branch", "status", "address"]}
        data={driversData.filter(driver => 
          driver.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
          (branch === "" || driver.branch === branch) &&
          (status === "" || driver.status === status)
        )}
        editPageUrl="/edit-driver"
        pageSpecificIcons={faUser}
      />
    </PageWrapper>
  );
};

export default DriversPage;
