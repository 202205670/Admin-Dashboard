import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom'; // Import useNavigate and useParams
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import EditForm from "../../components/EditForm/EditForm";
import axiosInstance from '../../server/axios.instance'
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
const EditBranch = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const { id } = useParams(); // Get branch ID from URL parameters
  const [branchData, setBranchData] = useState(null);
  const [addressOptions, setAddressOptions] = useState([]);
  const [isSubmitting,setIsSubmitting] = useState(false)


  useEffect(() => {
    const fetchBranchData = async () => {
      try {
        const response = await axiosInstance.get(`/admin/branch/single/${id}`);
        setBranchData({
          name: response.data.branche.name,
          addressId:response.data.branche.addressId,
        });
      } catch (error) {
        console.error("Error fetching vehicle data:", error);
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

    fetchAddresses();
    fetchBranchData()
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
      await axiosInstance.put(`/admin/branch/${id}`, formData);
  
      // Redirect to the Branch List page on success
      navigate("/branches");
      toast.success("Branch edited successfully!"); // Success feedback
    } catch (error) {
      setIsSubmitting(false); // Reset submitting state
  
      // Check if the error is due to a duplicate name
      if (error.response && error.response.status === 400) {
        const errorMessage = error.response.data?.message || "Duplicate branch name detected!";
        toast.error(errorMessage); // Show error feedback
      } else {
        toast.error("An error occurred while updating the branch. Please try again."); // General error
      }
  
      console.error("Error updating Branch:", error);
    }
  };

  // Handle cancellation
  const handleCancel = () => {
    navigate('/branches'); 
  };

  const title = "Edit Branch"; // Set the title

  return (
    <PageWrapper
      showAddButton={false}
      filters={[]}
      title={""} // Set the title to be displayed
    >
      {branchData &&  <EditForm 
        title={title}
        fields={branchFields}
        initialValues={branchData}
        onSubmit={handleSubmit}
        onCancel={handleCancel}  // Pass handleCancel function
        initialData={{}} // No initial data is provided, as requested
        setIsSubmitting={setIsSubmitting}
        isSubmitting={isSubmitting}
      />}
     
    </PageWrapper>
  );
};

export default EditBranch;
