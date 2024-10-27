import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { faTruck } from '@fortawesome/free-solid-svg-icons'; // Consignment icon
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import TableComponent from "../../components/Table/TableComponent"; // Ensure this path is correct
import useStatusCount from "../../hooks/useStatusCount"; // Ensure the hook is correctly imported

const ConsignmentsPage = ({ updateConsignmentCount, showRecords }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [status, setStatus] = useState("");
  const [consignmentsData, setConsignmentsData] = useState([
    // Sample data - replace with actual data source
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
    { id: 1, consig: "C001", customer: "Customer A", runsheet: "R001", source: "Source A", destination: "Destination A", timeIn: "08:00", timeOut: "10:00", priority: "1", status: "Active", type: "Type A" },
    { id: 2, consig: "C002", customer: "Customer B", runsheet: "R002", source: "Source B", destination: "Destination B", timeIn: "09:00", timeOut: "11:00", priority: "2", status: "Not Active", type: "Type B" },
    { id: 1, consig: "C001", customer: "Customer A", runsheet: "R001", source: "Source A", destination: "Destination A", timeIn: "08:00", timeOut: "10:00", priority: "1", status: "Active", type: "Type A" },
    { id: 2, consig: "C002", customer: "Customer B", runsheet: "R002", source: "Source B", destination: "Destination B", timeIn: "09:00", timeOut: "11:00", priority: "2", status: "Not Active", type: "Type B" },
   
  ]);

  // Calculate active and inactive counts
  const { activeCount, inactiveCount } = useStatusCount(consignmentsData);

  useEffect(() => {
    if (typeof updateConsignmentCount === "function") {
      updateConsignmentCount({ active: activeCount, inactive: inactiveCount });
    }
  }, [activeCount, inactiveCount, updateConsignmentCount]);

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
        data={consignmentsData.filter(item =>
          item.consig.toLowerCase().includes(searchTerm.toLowerCase()) &&
          (status === "" || item.status.toLowerCase() === status.toLowerCase())
        )}
        editPageUrl="/edit-consignment"
        pageSpecificIcons={faTruck}
      />
    </PageWrapper>
  );
};

export default ConsignmentsPage;
