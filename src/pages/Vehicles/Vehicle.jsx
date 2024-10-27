import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { faTruck } from "@fortawesome/free-solid-svg-icons";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import TableComponent from "../../components/Table/TableComponent"; // Ensure this is correctly imported
import useStatusCount from "../../hooks/useStatusCount"; // Ensure the hook is correctly imported

const VehiclePage = ({ updateVehicleCount, showRecords }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [branch, setBranch] = useState("");
  const [status, setStatus] = useState("");
  const [vehiclesData, setVehiclesData] = useState([
    // Sample data for vehicles - replace with actual data source
    { id: 1, vehicle: "V001", plate: "ABC123", branch: "Sydney", status: "Active", vehicleType: "Truck" },
    { id: 2, vehicle: "V002", plate: "XYZ789", branch: "Brisbane", status: "Not Active", vehicleType: "Trailer" },
    { id: 1, vehicle: "V001", plate: "ABC123", branch: "Sydney", status: "Active", vehicleType: "Truck" },
    { id: 2, vehicle: "V002", plate: "XYZ789", branch: "Brisbane", status: "Not Active", vehicleType: "Trailer" },
    { id: 1, vehicle: "V001", plate: "ABC123", branch: "Sydney", status: "Active", vehicleType: "Truck" },
    { id: 2, vehicle: "V002", plate: "XYZ789", branch: "Brisbane", status: "Not Active", vehicleType: "Trailer" },
    { id: 1, vehicle: "V001", plate: "ABC123", branch: "Sydney", status: "Active", vehicleType: "Truck" },
    { id: 2, vehicle: "V002", plate: "XYZ789", branch: "Brisbane", status: "Not Active", vehicleType: "Trailer" },
    { id: 1, vehicle: "V001", plate: "ABC123", branch: "Sydney", status: "Active", vehicleType: "Truck" },
    { id: 2, vehicle: "V002", plate: "XYZ789", branch: "Brisbane", status: "Not Active", vehicleType: "Trailer" },
    { id: 1, vehicle: "V001", plate: "ABC123", branch: "Sydney", status: "Active", vehicleType: "Truck" },
    { id: 2, vehicle: "V002", plate: "XYZ789", branch: "Brisbane", status: "Not Active", vehicleType: "Trailer" },
    { id: 1, vehicle: "V001", plate: "ABC123", branch: "Sydney", status: "Active", vehicleType: "Truck" },
    { id: 2, vehicle: "V002", plate: "XYZ789", branch: "Brisbane", status: "Not Active", vehicleType: "Trailer" },
    { id: 1, vehicle: "V001", plate: "ABC123", branch: "Sydney", status: "Active", vehicleType: "Truck" },
    { id: 2, vehicle: "V002", plate: "XYZ789", branch: "Brisbane", status: "Not Active", vehicleType: "Trailer" },
    { id: 1, vehicle: "V001", plate: "ABC123", branch: "Sydney", status: "Active", vehicleType: "Truck" },
    { id: 2, vehicle: "V002", plate: "XYZ789", branch: "Brisbane", status: "Not Active", vehicleType: "Trailer" },
    { id: 1, vehicle: "V001", plate: "ABC123", branch: "Sydney", status: "Active", vehicleType: "Truck" },
    { id: 2, vehicle: "V002", plate: "XYZ789", branch: "Brisbane", status: "Not Active", vehicleType: "Trailer" },
    { id: 1, vehicle: "V001", plate: "ABC123", branch: "Sydney", status: "Active", vehicleType: "Truck" },
    { id: 2, vehicle: "V002", plate: "XYZ789", branch: "Brisbane", status: "Not Active", vehicleType: "Trailer" },
   
  ]);

  // Calculate active and inactive counts
  const { activeCount, inactiveCount } = useStatusCount(vehiclesData);

  useEffect(() => {
    if (typeof updateVehicleCount === "function") {
      updateVehicleCount({ active: activeCount, inactive: inactiveCount });
    }
  }, [activeCount, inactiveCount, updateVehicleCount]);

  // Return nothing if showRecords is false
  if (showRecords) return null;

  // If showRecords is true, render the vehicle records and UI
  return (
    <PageWrapper
      title="Vehicles"
      filters={["search", "branch", "status"]}
      placeholders={{ search: "Search by Vehicle #", branch: "Branch", status: "Status" }}
      addButtonLabel="Add Vehicle"
      onAddClick={() => navigate("/add-vehicle")}
      showAddButton={true}
      onSearch={(value) => setSearchTerm(value)}
      onBranchChange={(value) => setBranch(value)}
      onStatusChange={(value) => setStatus(value)}
      statusOptions={["Active", "Not Active"]}
    >
      <TableComponent
        columns={["vehicle", "plate", "branch", "status", "vehicleType"]}
        data={vehiclesData.filter(vehicle =>
          vehicle.vehicle.toLowerCase().includes(searchTerm.toLowerCase()) &&
          (branch === "" || vehicle.branch === branch) &&
          (status === "" || vehicle.status === status)
        )}
        editPageUrl="/edit-vehicle"
        pageSpecificIcons={faTruck}
      />
    </PageWrapper>
  );
};

export default VehiclePage;
