import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import TableComponent from "../../components/Table/TableComponent";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import useStatusCount from "../../hooks/useStatusCount"; // Assuming this hook calculates active/inactive counts

const EmployeesPage = ({ updateEmployeeCount, showRecords }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [branch, setBranch] = useState("");
  const [status, setStatus] = useState("");
  
  const employeesData = [
    { id: 1, name: "Alice Johnson", email: "alice@example.com", phone: "555-111-2222", branch: "Sydney", status: "Active", address: "123 Elm St" },
    { id: 2, name: "Bob Brown", email: "bob@example.com", phone: "555-333-4444", branch: "Brisbane", status: "Not Active", address: "456 Oak St" },
    { id: 3, name: "Charlie White", email: "charlie@example.com", phone: "555-555-6666", branch: "Melbourne", status: "Active", address: "789 Pine St" },
    { id: 1, name: "Alice Johnson", email: "alice@example.com", phone: "555-111-2222", branch: "Sydney", status: "Active", address: "123 Elm St" },
    { id: 2, name: "Bob Brown", email: "bob@example.com", phone: "555-333-4444", branch: "Brisbane", status: "Not Active", address: "456 Oak St" },
    { id: 3, name: "Charlie White", email: "charlie@example.com", phone: "555-555-6666", branch: "Melbourne", status: "Active", address: "789 Pine St" },
    { id: 1, name: "Alice Johnson", email: "alice@example.com", phone: "555-111-2222", branch: "Sydney", status: "Active", address: "123 Elm St" },
    { id: 2, name: "Bob Brown", email: "bob@example.com", phone: "555-333-4444", branch: "Brisbane", status: "Not Active", address: "456 Oak St" },
    { id: 3, name: "Charlie White", email: "charlie@example.com", phone: "555-555-6666", branch: "Melbourne", status: "Active", address: "789 Pine St" },
    { id: 1, name: "Alice Johnson", email: "alice@example.com", phone: "555-111-2222", branch: "Sydney", status: "Active", address: "123 Elm St" },
    { id: 2, name: "Bob Brown", email: "bob@example.com", phone: "555-333-4444", branch: "Brisbane", status: "Not Active", address: "456 Oak St" },
    { id: 3, name: "Charlie White", email: "charlie@example.com", phone: "555-555-6666", branch: "Melbourne", status: "Active", address: "789 Pine St" },
  
  ];

  const { activeCount, inactiveCount } = useStatusCount(employeesData);

  useEffect(() => {
    if (typeof updateEmployeeCount === "function") {
      updateEmployeeCount({ active: activeCount, inactive: inactiveCount });
    }
  }, [activeCount, inactiveCount, updateEmployeeCount]);

  if (showRecords) return null;

  return (
    <PageWrapper
      title="Employees"
      filters={["search", "branch", "status"]}
      placeholders={{
        search: "Search by Name",
        branch: "Branch",
        status: "Status",
      }}
      addButtonLabel="Add Employee"
      onAddClick={() => navigate("/add-employee")}
      showAddButton={true}
      onSearch={(value) => setSearchTerm(value)}
      onBranchChange={(value) => setBranch(value)}
      onStatusChange={(value) => setStatus(value)}
      statusOptions={["Active", "Not Active"]}
    >
      <TableComponent
        columns={["name", "email", "phone", "branch", "status", "address"]}
        data={employeesData.filter(employee => 
          employee.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
          (branch === "" || employee.branch === branch) &&
          (status === "" || employee.status === status)
        )}
        editPageUrl="/edit-employee"
        pageSpecificIcons={faUser}
      />
    </PageWrapper>
  );
};

export default EmployeesPage;
