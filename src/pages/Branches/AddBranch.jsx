import React from "react";
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import AddForm from "../../components/AddForm/AddForm";

const AddBranch = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  // Define the fields for the Add Branch form
  const branchFields = [
    { label: 'Branch Name', type: 'text', name: 'plateNumber' },
    { label: 'Address', type: 'text', name: 'address', style: { width: '100%' } }, // Add specific style here
  ];

  // Handle form submission
  const handleSubmit = (formData) => {
    console.log('Branch Form Data:', formData);
    // Implement API integration for form submission here
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
      
        onSubmit={handleSubmit}
        onCancel={handleCancel}  // Pass handleCancel function
      />
    </PageWrapper>
  );
};

export default AddBranch;
