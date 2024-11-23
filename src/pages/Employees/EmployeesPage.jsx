import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import TableComponent from "../../components/Table/TableComponent";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import useStatusCount from "../../hooks/useStatusCount"; // Assuming this hook calculates active/inactive counts
import axiosInstance from "../../server/axios.instance";

const EmployeesPage = ({ updateEmployeeCount, showRecords }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [branch, setBranch] = useState("");
  const [status, setStatus] = useState("");
  const [employeeData, setEmployeeData] = useState([]);

  const { activeCount, inactiveCount } = useStatusCount(employeeData);

  useEffect(() => {
    if (typeof updateEmployeeCount === "function") {
      updateEmployeeCount({ active: activeCount, inactive: inactiveCount });
    }
  }, [activeCount, inactiveCount, updateEmployeeCount]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axiosInstance.get("/admin/employee");
      console.log(response.data?.employees);
      const transformedData = response.data?.employees.map(employee => ({
        email: employee?.email,
        firstName: employee?.firstName,
        lastName: employee?.lastName,
        branch: employee?.branch.name,
        address: employee?.address?.city || "N/A",
        statusId: employee.user.statusId
      }));
      setEmployeeData(transformedData);
      console.log(response.data?.employees);
    };

    fetchData();
  }, []);

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
        columns={[
          // "id",
          // "userId",
          "email",
          "firstName",
          "lastName",
          "branch",
          "address",
          "statusId"
        ]}
        data={employeeData}
        editPageUrl="/edit-employee"
        pageSpecificIcons={faUser}
      />
    </PageWrapper>
  );
};

export default EmployeesPage;
