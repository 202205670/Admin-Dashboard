import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { faFileExcel } from '@fortawesome/free-solid-svg-icons';
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import TableComponent from "../../components/Table/TableComponent"; 

const RunsheetPage = ({ updateRunsheetCount, showRecords }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [branch, setBranch] = useState("");
  const [status, setStatus] = useState("");
  const [runsheetsData, setRunsheetsData] = useState([
    {
      id: 1,
      runsheet: "12321",
      driver: "Ahmad Ahmad",
      vehicle: "x285",
      startTime: "08:00 AM",
      finishTime: "10:00 PM",
      restTime: "7:00 PM",
      status: "Open",
      addedBy: "Bassam",
      branch: "Sydney",
    },
    {
      id: 2,
      runsheet: "12322",
      driver: "John Doe",
      vehicle: "y456",
      startTime: "09:00 AM",
      finishTime: "06:00 PM",
      restTime: "5:00 PM",
      status: "Closed",
      addedBy: "Ali",
      branch: "Melbourne",
    },
    {
      id: 3,
      runsheet: "12323",
      driver: "Sara Smith",
      vehicle: "z789",
      startTime: "07:00 AM",
      finishTime: "05:00 PM",
      restTime: "4:00 PM",
      status: "Open",
      addedBy: "Maya",
      branch: "Brisbane",
    },
    {
      id: 3,
      runsheet: "12323",
      driver: "Sara Smith",
      vehicle: "z789",
      startTime: "07:00 AM",
      finishTime: "05:00 PM",
      restTime: "4:00 PM",
      status: "Open",
      addedBy: "Maya",
      branch: "Brisbane",
    },
    {
      id: 3,
      runsheet: "12323",
      driver: "Sara Smith",
      vehicle: "z789",
      startTime: "07:00 AM",
      finishTime: "05:00 PM",
      restTime: "4:00 PM",
      status: "Open",
      addedBy: "Maya",
      branch: "Brisbane",
    },
    {
      id: 3,
      runsheet: "12323",
      driver: "Sara Smith",
      vehicle: "z789",
      startTime: "07:00 AM",
      finishTime: "05:00 PM",
      restTime: "4:00 PM",
      status: "Open",
      addedBy: "Maya",
      branch: "Brisbane",
    },
    {
      id: 3,
      runsheet: "12323",
      driver: "Sara Smith",
      vehicle: "z789",
      startTime: "07:00 AM",
      finishTime: "05:00 PM",
      restTime: "4:00 PM",
      status: "Open",
      addedBy: "Maya",
      branch: "Brisbane",
    },
  ]);

  const activeCount = runsheetsData.filter(item => item.status === "Open").length;
  const inactiveCount = runsheetsData.filter(item => item.status === "Closed").length;

  useEffect(() => {
    if (typeof updateRunsheetCount === "function") {
      updateRunsheetCount({ active: activeCount, inactive: inactiveCount });
    }
  }, [activeCount, inactiveCount, updateRunsheetCount]);

  if (showRecords) return null;

  // Handle row click to navigate to the detail page
  const handleRowClick = (id) => {
    navigate(`/runsheetDetailPage/${id}`);
  };

  return (
    <PageWrapper
      title="Runsheets"
      filters={["search", "branch", "status"]}
      placeholders={{
        search: "Search by Runsheet #",
        branch: "Branch",
        status: "Status",
      }}
      addButtonLabel="Add Runsheet"
      onAddClick={() => navigate("/add-runsheet")}
      showAddButton={true}
      onSearch={(value) => setSearchTerm(value)}
      onBranchChange={(value) => setBranch(value)}
      onStatusChange={(value) => setStatus(value)}
      statusOptions={["Open", "Closed"]}
      isRunsheetPage={true}
    >
      <TableComponent
        columns={[
          "runsheet",
          "driver",
          "vehicle",
          "startTime",
          "finishTime",
          "restTime",
          "status",
          "addedBy",
          "branch",
        ]}
        data={runsheetsData.filter((item) => 
          item.runsheet.toLowerCase().includes(searchTerm.toLowerCase()) &&
          (branch === "" || item.branch === branch) &&
          (status === "" || item.status === status)
        )}
        editPageUrl="/edit-runsheet"
        pageSpecificIcons={faFileExcel}
        isRunsheetPage={true} 
        onRowClick={handleRowClick}
      />
    </PageWrapper>
  );
};

export default RunsheetPage;
