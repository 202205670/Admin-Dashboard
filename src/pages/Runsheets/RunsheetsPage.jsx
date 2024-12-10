import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { faFileExcel } from "@fortawesome/free-solid-svg-icons";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import TableComponent from "../../components/Table/TableComponent";
import axiosInstance from "../../server/axios.instance";
import useStatusCount from "../../hooks/useStatusCount";

const RunsheetPage = ({ updateRunsheetCount, showRecords }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [branch, setBranch] = useState("");
  const [status, setStatus] = useState("");
  const [runsheetsData, setRunsheetsData] = useState([]);
  const [loading, setLoading] = useState(true);

  const { activeCount, inactiveCount } = useStatusCount(runsheetsData);

  useEffect(() => {
    if (typeof updateRunsheetCount === "function") {
      updateRunsheetCount({
        active: activeCount,
        inactive: inactiveCount,
      });
    }
  }, [updateRunsheetCount, runsheetsData]);

  //here startTime endTime and restTime should be added to the edit runSheet page
  useEffect(() => {
    const fetchData = async () => {
      const response = await axiosInstance.get("/admin/runsheet");
      const transformedData = response.data?.runsheets.map((runsheet) => ({
        id: runsheet.id,
        status: runsheet.statusId === 1 ? "Active" : "Not Active",
        branchName: runsheet.branch.name,
        driverName: `${runsheet.driver?.firstName || "Unknown"} ${
          runsheet.driver?.lastName || "Unknown"
        }`,
        vehicle: runsheet.vehicle?.plateNumber || "Unknown Vehicle",
        startTime: runsheet?.startTime ?
        new Date(runsheet?.startTime)
          .toISOString()
          .split("T")[0]
          : "-", // Fallback for missing startTime
        finishTime: runsheet?.finishTime ?
        new Date(runsheet?.finishTime)
          .toISOString()
          .split("T")[0]
          : "-", // Current date as fallback for finishTime
          breakTime: runsheet?.breakTime 
          ? Number(runsheet.breakTime) > 1 
            ? `${runsheet.breakTime} mins` 
            : `${runsheet.breakTime} min` 
          : '-', // Current date as fallback for finishTime
              }));

      setRunsheetsData(transformedData);
      setLoading(false);
    };

    fetchData();
  }, []);

  if (showRecords) return null;

  // Handle row click to navigate to the detail page
  const handleRowClick = (id) => {
    navigate(`/runsheetDetailPage/${id}`);
  };

  const filteredRunsheets = runsheetsData.filter((runsheet) => {
    const matchesSearch = searchTerm
      ? runsheet?.id.toString().toLowerCase().includes(searchTerm?.toLowerCase())
      : true;
    
    const matchesStatus =
      status === "Reset" || !status ? true : runsheet.status === status;

    return matchesSearch && matchesStatus;
  });

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
      //statusOptions={["Reset", "Open", "Closed"]}
      statusOptions={["Reset", "Active","Not Active "]}
      isRunsheetPage={true}
    >
      <TableComponent
        columns={[
          "id",
          "branchName",
          "driverName",
          "vehicle",
          "startTime",
          "finishTime",
          "breakTime",
          "status",
        ]}
        data={filteredRunsheets}
        editPageUrl="/edit-runsheet"
        loading={loading}
        pageSpecificIcons={faFileExcel}
        isRunsheetPage={true}
        onRowClick={handleRowClick}
      />
    </PageWrapper>
  );
};

export default RunsheetPage;
