import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import AddForm from "../../components/AddForm/AddForm";
import axiosInstance from '../../server/axios.instance'

const AddRunsheet = () => {
  const navigate = useNavigate();

  const [branchOptions, setBranchOptions] = useState([]);
  const [driverOptions, setDriverOptions] = useState([]);
  const [vehicleOptions, setVehicleOptions] = useState([]);

    // Fetch options for Driver, Vehicle, and Branch from the backend
    useEffect(() => {
      const fetchOptions = async () => {
        try {
          const branchResponse = await axiosInstance.get("/admin/branch");
          setBranchOptions(
            branchResponse.data.branches.map((branch) => ({
              label: branch.name,
              value: branch.id,
            }))
          );
  
          const driverResponse = await axiosInstance.get("/admin/drivers");
          setDriverOptions(
            driverResponse.data.drivers.map((driver) => ({
              label: `${driver.user.username}`,
              value: driver.id,
            }))
          );
  
          const vehicleResponse = await axiosInstance.get("/admin/vehicle");
          setVehicleOptions(
            vehicleResponse.data.vehicles.map((vehicle) => ({
              label: vehicle.plateNumber,
              value: vehicle.id,
            }))
          );
        } catch (error) {
          console.error("Error fetching options:", error);
        }
      };
  
      fetchOptions();
    }, []);

  // Initialize consignments with two default records
  const [consignments, setConsignments] = useState([
    { consignmentNumber: "12345", type: "Delivery", priority: "1" },
    { consignmentNumber: "67890", type: "Pickup", priority: "2" },
  ]);

  const runsheetFields = [
    { label: "Driver", type: "select", name: "driverId", options: driverOptions },
    { label: "Vehicle", type: "select", name: "vehicleId", options: vehicleOptions },
    { label: "CHEP Account", type: "text", name: "chepAccount" },
    { label: "LOSCAN Account", type: "text", name: "loscanAccount" },
    { label: "Branch", type: "select", name: "branchId", options: branchOptions },
  ];


  const handleAddRunsheet = async (data) => {
    const formData = {
      ...data,
      statusId: 1
    }
    try {
      const response = await axiosInstance.post("/admin/runsheet", formData);
      console.log("Runsheet created:", response.data);
      navigate("/runsheets");
    } catch (error) {
      console.error("Error creating runsheet:", error);
    }
  };


  return (
    <PageWrapper showAddButton={false}>
      <AddForm
        title="Add Runsheet"
        fields={runsheetFields}
        // secondTitle="Assign Consignment"
        onSubmit={handleAddRunsheet}
        onCancel={() => navigate("/runsheets")}
        // showTable={true}
        // isAddRunsheetPage={true}
      />
    </PageWrapper>
  );
};

export default AddRunsheet;
