import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import AddForm from "../../components/AddForm/AddForm";
import axiosInstance from "../../server/axios.instance"; // Adjust the path to your axios instance
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
const AddDriver = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const [branchOptions, setBranchOptions] = useState([]);
  const [addressOptions, setAddressOptions] = useState([]);
  const [isSubmitting,setIsSubmitting] = useState(false)

  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const response = await axiosInstance.get("/admin/branch"); // Adjust endpoint as needed
        const branches = response.data.branches.map((branch) => ({
          label: branch.name,
          value: branch.id,
        }));
        setBranchOptions(branches);
      } catch (error) {
        console.error("Error fetching branches:", error);
      }
    };

    const fetchAddresses = async () => {
      try {
        const response = await axiosInstance.get("/admin/branch/address"); 
        const addresses = response?.data.address.map((addr) => ({
          label: addr.city, // Assuming fullAddress is available
          value: addr.id,
        }));
        setAddressOptions(addresses);
      } catch (error) {
        console.error("Error fetching addresses:", error);
      }
    };

    fetchBranches();
    fetchAddresses();
  }, []);

  const driverFields = [
    { label: "Username", type: "text", name: "username" },
    { label: "First Name", type: "text", name: "firstName" },
    { label: "Last Name", type: "text", name: "lastName" },
    { label: "Phone Number", type: "text", name: "phoneNumber" },
    { label: "Email", type: "email", name: "email" },
    {
      label: "Branch",
      type: "select",
      name: "branchId",
      options: branchOptions,
    },
    {
      label: "Address",
      type: "select",
      name: "addressId",
      options: addressOptions,
    },
    {
      label: "Status",
      type: "checkbox",
      name: "active",
    },
  ];

  const handleSubmit = async (formData) => {
    try {
      const payload = {
        ...formData,
        userType: 2, // Ensure userType is set to 2 for Driver
        password: "12345678910"
      };
      const response = await axiosInstance.post("/auth/register", payload); // Adjust endpoint if needed
        navigate("/drivers"); // Redirect to driver list
        toast.success("Driver added successfully!"); // Success feedback
    } catch (error) {
      toast.error("Error creating Driver", error);
  
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

  const handleCancel = () => {
    navigate('/drivers'); // Navigate to Driver List page
  };

  const title = "Create New Driver"; // Set the title

  return (
    <PageWrapper
      showAddButton={false}
      filters={[]}
      title={""}
    >
      <AddForm 
        title={title}
        fields={driverFields}
        setIsSubmitting={setIsSubmitting}
        isSubmitting={isSubmitting}
        statusLabel="Active" 
        onSubmit={handleSubmit}
        onCancel={handleCancel}  // Pass handleCancel function
      />
    </PageWrapper>
  );
};

export default AddDriver;
