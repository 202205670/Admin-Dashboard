import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import TableComponent from "../../components/Table/TableComponent"; // Ensure this is correctly imported
import useStatusCount from "../../hooks/useStatusCount"; // Ensure the hook is correctly imported
import axiosInstance from "../../server/axios.instance";

const DriversPage = ({ updateDriverCount, showRecords }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [branch, setBranch] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [driversData, setDriversData] = useState([]);

  // Calculate active and inactive counts
  const { activeCount, inactiveCount } = useStatusCount(driversData);

  useEffect(() => {
    if (typeof updateDriverCount === "function") {
      updateDriverCount({ active: activeCount, inactive: inactiveCount });
    }
  }, [activeCount, inactiveCount, updateDriverCount]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axiosInstance.get("/admin/drivers");
      setDriversData(response.data?.drivers);
    };

    fetchData();
  }, []);

  // Return nothing if showRecords is false
  if (showRecords) return null;

  if (loading) return <div>Loading...</div>;

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
    >
      <TableComponent
        columns={[
          "id",
          "userId",
          "email",
          "firstName",
          "lastName",
          "addressId",
        ]}
        data={driversData}
        editPageUrl="/edit-driver"
        pageSpecificIcons={faUser}
      />
    </PageWrapper>
  );
};

export default DriversPage;
