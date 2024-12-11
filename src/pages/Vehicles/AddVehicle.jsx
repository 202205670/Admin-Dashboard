import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import AddForm from "../../components/AddForm/AddForm";
import axiosInstance from "../../server/axios.instance";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


const AddVehicle = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const [branchOptions, setBranchOptions] = useState([]);
  const [vehicleTypeOptions, setVehicleTypeOptions] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const branchResponse = await axiosInstance.get("/admin/branch");
        setBranchOptions(
          branchResponse?.data?.branches?.map((branch) => ({
            label: branch.name,
            value: branch.id,
          }))
        );

        const vehicleTypeResponse = await axiosInstance.get(
          "/admin/vehicle/type"
        );
        setVehicleTypeOptions(
          vehicleTypeResponse?.data?.vehicleTypes?.map((type) => ({
            label: type.name,
            value: type.id,
          }))
        );
      } catch (error) {
        console.error("Error fetching options:", error);
      }
    };

    fetchOptions();
  }, []);

  // Define the fields for the Add Vehicle form
  const vehicleFields = [
    { label: "Plate #", type: "text", name: "plateNumber" },
    {
      label: "Branch",
      type: "select",
      name: "branchId",
      options: branchOptions,
    },
    {
      label: "Vehicle Type",
      type: "select",
      name: "vehicleTypeId",
      options: vehicleTypeOptions,
    },
    {
      label: "Status",
      type: "checkbox",
      name: "active",
    },
  ];

  const handleSubmit = async (formData) => {
    try {
      await axiosInstance.post("/admin/vehicle", formData);
      setIsSubmitting(false);
      navigate("/vehicles");
      toast.success("Vehicle added successfully!"); // Success feedback
    } catch (error) {
      toast.error("Error creating vehicle:", error);
  
      if (error.response) {
        toast.error(
          error.response.data.message || "Failed to add vehicle. Please try again."
        );
      } else if (error.request) {
        toast.error("No response from server. Please check your connection.");
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsSubmitting(false); // Reset submitting state
    }
  };

  // Handle cancellation
  const handleCancel = () => {
    navigate("/vehicles"); // Navigate to Vehicle List page
  };

  const title = "Create New Vehicle"; // Set the title

  return (
    <PageWrapper
      showAddButton={false}
      filters={[]}
      title={""} // Set the title to be displayed
    >
      <AddForm
        title={title}
        fields={vehicleFields}
        statusLabel="Active"
        setIsSubmitting={setIsSubmitting}
        isSubmitting={isSubmitting}
        onSubmit={handleSubmit}
        onCancel={handleCancel} // Pass handleCancel function
      />
    </PageWrapper>
  );
};

export default AddVehicle;
