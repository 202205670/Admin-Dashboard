import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { faFileExcel } from "@fortawesome/free-solid-svg-icons";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import TableComponent from "../../components/Table/TableComponent";
import axiosInstance from "../../server/axios.instance";

const RunsheetPage = ({ updateRunsheetCount, showRecords }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [branch, setBranch] = useState("");
  const [status, setStatus] = useState("");
  const [runsheetsData, setRunsheetsData] = useState([]);
  const [loading, setLoading] = useState(true);

  // const activeCount = runsheetsData.filter(item => item.status === "Open").length;
  // const inactiveCount = runsheetsData.filter(item => item.status === "Closed").length;

  useEffect(() => {
    if (typeof updateRunsheetCount === "function") {
      updateRunsheetCount({
        active: runsheetsData.length,
        inactive: runsheetsData.length,
      });
    }
  }, [updateRunsheetCount, runsheetsData]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axiosInstance.get("/admin/runsheet");
      console.log(response.data?.runsheets);
      const transformedData = response.data?.runsheets.map(runsheet => ({
        id: runsheet.id,
        status: runsheet.statusId === 1 ? "Active" : "Not Active",
        branchName: runsheet.branch.name,
        driverName: `${runsheet.driver?.firstName || "Unknown"} ${runsheet.driver?.lastName || "Unknown"}`,
        vehicle: runsheet.vehicle?.plateNumber || "Unknown Vehicle",
        startTime: runsheet.vehicle?.startTime
          ? `${new Date(runsheet.vehicle.startTime).toLocaleDateString("en-GB")} ${new Date(runsheet.vehicle.startTime).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false })}`
          : "N/A", // Fallback for missing startTime
        finishTime: runsheet.vehicle?.finishTime
        ? `${new Date(runsheet.vehicle.finishTime).toLocaleDateString("en-GB")} ${new Date(runsheet.vehicle.finishTime).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false })}`

          : `${new Date().toLocaleDateString("en-GB")} ${new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false })}`, // Current date as fallback for finishTime
        restTime: runsheet.vehicle?.restTime
        ? `${new Date(runsheet.vehicle.restTime).toLocaleDateString("en-GB")} ${new Date(runsheet.vehicle.finishTime).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false })}`

          : `${new Date().toLocaleDateString("en-GB")} ${new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false })}`, // Current date as fallback for finishTime
        
      }));
      
      setRunsheetsData(transformedData);
      setLoading(false)
    };

    fetchData();
  }, []);

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
          "id",
          "branchName",
          "driverName",
          "vehicle",
          "startTime",
          "finishTime",
          "restTime",
          "status"
        ]}
        data={runsheetsData}
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
