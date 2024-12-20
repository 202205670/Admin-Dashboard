import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import AddForm from "../../components/AddForm/AddForm";
import axiosInstance from "../../server/axios.instance";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
const AddRunsheet = () => {
  const navigate = useNavigate();

  const [branchOptions, setBranchOptions] = useState([]);
  const [driverOptions, setDriverOptions] = useState([]);
  const [vehicleOptions, setVehicleOptions] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
    
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
            label: `${driver.firstName}`,
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

  const runsheetFields = [
    {
      label: "Driver",
      type: "select",
      name: "driverId",
      options: driverOptions,
    },
    // { label: "Driver", type: "text", name: "driverId" },
    {
      label: "Vehicle",
      type: "select",
      name: "vehicleId",
      options: vehicleOptions,
    },
    { label: "CHEP Account", type: "text", name: "chepAccount" },
    { label: "LOSCAN Account", type: "text", name: "loscanAccount" },
    {
      label: "Branch",
      type: "select",
      name: "branchId",
      options: branchOptions,
    },
    {
      label: "Status",
      type: "checkbox",
      name: "active",
    },
  ];

  const handleAddRunsheet = async (data) => {
    const formData = {
      ...data,
    };
    try {
      const response = await axiosInstance.post("/admin/runsheet", formData);
      console.log("Runsheet created:", response.data);
      setIsSubmitting(false);
      navigate("/runsheets");
      toast.success("Runsheet added successfully!"); // Success feedback
    } catch (error) {
      toast.error("Error creating runsheet:", error);
    }
  };

  return (
    <PageWrapper showAddButton={false}>
      <AddForm
        title="Create New Runsheet "
        fields={runsheetFields}
        // secondTitle="Assign Consignment"
        onSubmit={handleAddRunsheet}
        onCancel={() => navigate("/runsheets")}
        setIsSubmitting={setIsSubmitting}
        isSubmitting={isSubmitting}
        statusLabel="Active" 
        // showTable={true}
        // isAddRunsheetPage={true}
      />
    </PageWrapper>
  );
};

export default AddRunsheet;
