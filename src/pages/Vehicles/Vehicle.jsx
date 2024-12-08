import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { faTruck } from "@fortawesome/free-solid-svg-icons";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import TableComponent from "../../components/Table/TableComponent"; // Ensure this is correctly imported
import useStatusCount from "../../hooks/useStatusCount"; // Ensure the hook is correctly imported
import axiosInstance from "../../server/axios.instance";

const VehiclePage = ({ updateVehicleCount, showRecords }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [branch, setBranch] = useState("");
  const [status, setStatus] = useState("");
  const [vehiclesData, setVehiclesData] = useState([
    // Sample data for vehicles - replace with actual data source
  ]);
  const [loading, setLoading] = useState(true);

  // Calculate active and inactive counts
  const { activeCount, inactiveCount } = useStatusCount(vehiclesData);

  useEffect(() => {
    if (typeof updateVehicleCount === "function") {
      updateVehicleCount({ active: activeCount, inactive: inactiveCount });
    }
  }, [activeCount, inactiveCount, updateVehicleCount]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axiosInstance.get("/admin/vehicle");
      const transformedData = response.data?.vehicles.map((vehicle) => ({
        id: vehicle?.id,
        plateNumber: vehicle.plateNumber,
        branchName: vehicle.branch?.name,
        vehicleTypeName: vehicle.vehicleType?.name,
        status: vehicle.statusId === 1 ? "Active" : "Not Active",
      }));
      setVehiclesData(transformedData);
      setLoading(false);
    };

    fetchData();
  }, []);

  // Return nothing if showRecords is false
  if (showRecords) return null;

  const filteredVehicles = vehiclesData.filter((vehicle) => {
    // Check if search term matches the plate number
    const matchesSearch = searchTerm
      ? vehicle.plateNumber
          ?.toString()
          .toLowerCase()
          .includes(searchTerm?.toLowerCase())
      : true;
  
    // Check if selected branch matches vehicle branch
    const matchesBranch = branch
      ? vehicle.branch?.toLowerCase() === branch.toLowerCase() // Exact match
      : true;
  
    // Check if status matches or is reset
    const matchesStatus =
      status === "Reset" || !status ? true : vehicle.status === status;
  
    // Ensure all conditions are included
    return matchesSearch && matchesBranch && matchesStatus;
  });
  
  

  // If showRecords is true, render the vehicle records and UI
  return (
    <PageWrapper
      title="Vehicles"
      filters={["search", "branch", "status"]}
      placeholders={{
        search: "Search by plate Number ",
        branch: "Branch",
        status: "Status",
      }}
      addButtonLabel="Add Vehicle"
      onAddClick={() => navigate("/add-vehicle")}
      showAddButton={true}
      onSearch={(value) => setSearchTerm(value)}
      onBranchChange={(value) => setBranch(value)}
      onStatusChange={(value) => setStatus(value)}
      statusOptions={["Reset", "Active", "Not Active"]}
    >
      <TableComponent
        columns={[
          "id",
          "plateNumber",
          "branchName",
          "vehicleTypeName",
          "status",
        ]}
        data={filteredVehicles}
        editPageUrl="/edit-vehicle"
        loading={loading}
        pageSpecificIcons={faTruck}
      />
    </PageWrapper>
  );
};

export default VehiclePage;
    