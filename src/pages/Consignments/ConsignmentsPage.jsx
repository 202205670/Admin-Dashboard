import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { faTruck } from "@fortawesome/free-solid-svg-icons"; // Consignment icon
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import TableComponent from "../../components/Table/TableComponent"; // Ensure this path is correct
import useStatusCount from "../../hooks/useStatusCount"; // Ensure the hook is correctly imported
import axiosInstance from "../../server/axios.instance";

const ConsignmentsPage = ({ updateConsignmentCount, showRecords }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [status, setStatus] = useState("");
  const [consignmentsData, setConsignmentsData] = useState([]);

  // Calculate active and inactive counts
  const { activeCount, inactiveCount } = useStatusCount(consignmentsData);

  useEffect(() => {
    if (typeof updateConsignmentCount === "function") {
      updateConsignmentCount({ active: activeCount, inactive: inactiveCount });
    }
  }, [activeCount, inactiveCount, updateConsignmentCount]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axiosInstance.get("/admin/consignment");
      setConsignmentsData(response.data?.consignments);
    };

    fetchData();
  }, []);

  // Return nothing if showRecords is false
  if (showRecords) return null;

  // If showRecords is true, render the consignment records and UI
  return (
    <PageWrapper
      title="Consignments"
      filters={["search", "status"]}
      placeholders={{ search: "Search by Consignment #", status: "Status" }}
      addButtonLabel="Add Consignment"
      onAddClick={() => navigate("/add-consignment")}
      showAddButton={true}
      onSearch={(value) => setSearchTerm(value)}
      onStatusChange={(value) => setStatus(value)}
      statusOptions={["Active", "Not Active"]}
    >
      <TableComponent
        columns={[
          "id",
          "consignmentNo",
          "customerId",
          "runsheetId",
          "sourceId",
          "destinationId",
          "timeIn",
          "timeOut",
          "statusId",
          "typeId",
        ]}
        data={consignmentsData}
        editPageUrl="/edit-consignment"
        pageSpecificIcons={faTruck}
      />
    </PageWrapper>
  );
};

export default ConsignmentsPage;
