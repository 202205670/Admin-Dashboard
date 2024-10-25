import React from "react";
import { useNavigate, useParams } from 'react-router-dom'; // Import useNavigate and useParams
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import EditForm from "../../components/EditForm/EditForm";

const EditBranch = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const { branchId } = useParams(); // Get branch ID from URL parameters

  // Define the fields for the Edit Branch form
  const branchFields = [
    { label: 'Branch Name', type: 'text', name: 'plateNumber' },
    { label: 'Address', type: 'text', name: 'address', style: { width: '100%' } }, // Specific style for address field
  ];

  // Handle form submission
  const handleSubmit = (formData) => {
    console.log('Updated Branch Data:', formData);
    navigate('/branches'); 
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
      <EditForm 
        title={title}
        fields={branchFields}
        onSubmit={handleSubmit}
        onCancel={handleCancel}  // Pass handleCancel function
        initialData={{}} // No initial data is provided, as requested
      />
    </PageWrapper>
  );
};

export default EditBranch;
