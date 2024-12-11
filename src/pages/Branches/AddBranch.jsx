import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import AddForm from "../../components/AddForm/AddForm";
import axiosInstance from "../../server/axios.instance"; // Replace with your axios setup file if any
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const AddBranch = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const [addressOptions, setAddressOptions] = useState([]);
  const [isSubmitting,setIsSubmitting] = useState(false)


  useEffect(() => {
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

    fetchAddresses();
  }, []);

  // Define the fields for the Add Branch form
  const branchFields = [
    { label: "Branch Name", type: "text", name: "name" },
    {
      label: "Address",
      type: "select",
      name: "addressId",
      options: addressOptions,
    },
  ];

  const handleSubmit = async (formData) => {
    setIsSubmitting(true); // Set submitting state to true
    try {
      const response = await axiosInstance.post("/admin/branch", formData); // Adjust endpoint if needed
      
      // Navigate to the Branch List page on success
      navigate("/branches");
      toast.success("Branch added successfully!"); // Success feedback
    } catch (error) {
      setIsSubmitting(false); // Reset submitting state
  
      // Check if the error is due to a duplicate name
      if (error.response && error.response.status === 400) {
        const errorMessage = error.response.data?.message || "Duplicate branch name detected!";
        toast.error(errorMessage); // Show error feedback
      } else {
        toast.error("An error occurred while adding the branch. Please try again."); // General error
      }
  
      toast.error("Error creating Branch", error);
    }
  };

  // Handle cancellation
  const handleCancel = () => {
    navigate('/branches'); // Navigate to Branch List page
  };

  const title = "Create New Branch"; // Set the title

  return (
    <PageWrapper
      showAddButton={false}
      filters={[]}
      title={""}
    >
      <AddForm 
        title={title}
        fields={branchFields}
        setIsSubmitting={setIsSubmitting}
        isSubmitting={isSubmitting}
        onSubmit={handleSubmit}
        onCancel={handleCancel}  // Pass handleCancel function
      />
    </PageWrapper>
  );
};

export default AddBranch;
