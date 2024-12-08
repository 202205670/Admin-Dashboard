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
  const [loading, setLoading] = useState(true);

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
      const transformedData = response.data?.consignments.map(
        (consignment) => ({
          id: consignment?.id,
          consignmentNo: consignment.consignmentNo,
          customer: consignment.customer.name,
          runsheet: consignment.runsheet.id,
          source: consignment.source.city,
          destination: consignment.destination.city,
          timeIn: consignment.timeIn
            ? `${new Date(consignment.timeIn).toLocaleDateString(
                "en-GB"
              )} ${new Date(consignment.timeIn).toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
              })}`
            : "-", // Fallback for missing timein
          timeOut: consignment.timeOut
            ? `${new Date(consignment.timeOut).toLocaleDateString(
                "en-GB"
              )} ${new Date(consignment.timeIn).toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
              })}`
            : "-",
          priority: consignment.priority,
          status: consignment.statusId === 1 ? "Active" : "Not Active",
          type: consignment.typeId === 1 ? "Delivery" : "Pick-Up",
        })
      );
      setConsignmentsData(transformedData);
      setLoading(false);
    };

    fetchData();
  }, []);

  // Return nothing if showRecords is false
  if (showRecords) return null;

  const filteredConsignments = consignmentsData.filter((consignment) => {
    const matchesSearch = searchTerm
      ? consignment.consignmentNo
          .toString()
          .toLowerCase()
          .includes(searchTerm?.toLowerCase())
      : true;

    const matchesStatus =
      status === "Reset" || !status ? true : consignment.status === status;

    return matchesSearch && matchesStatus;
  });

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
      statusOptions={["Reset", "Active", "Not Active"]}
    >
      <TableComponent
        columns={[
          // "id",
          "consignmentNo",
          "customer",
          "runsheet",
          "source",
          "destination",
          "timeIn",
          "timeOut",
          "priority",
          "status",
          "type",
        ]}
        data={filteredConsignments}
        loading={loading}
        editPageUrl="/edit-consignment"
        pageSpecificIcons={faTruck}
      />
    </PageWrapper>
  );
};

export default ConsignmentsPage;
