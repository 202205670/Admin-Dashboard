import React from "react";
import { useNavigate, useParams } from 'react-router-dom'; // Import useNavigate and useParams
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import EditForm from "../../components/EditForm/EditForm";

const EditConsignment = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const { consignmentId } = useParams(); // Get consignment ID from URL parameters

  // Define the fields for the Edit Consignment form
  const consignmentFields = [
    { label: 'Consignment #', type: 'text', name: 'consignmentNumber' },
    { label: 'Customer', type: 'text', name: 'customer' },
    { label: 'Runsheet', type: 'text', name: 'runsheet' },
    { label: 'Source', type: 'text', name: 'source' },
    { label: 'Destination', type: 'text', name: 'destination' },
    { label: 'Time In', type: 'time', name: 'timeIn' }, // Time input for Time In
    { label: 'Time Out', type: 'time', name: 'timeOut' }, // Time input for Time Out
    { 
      label: 'Priority', 
      type: 'text', 
      name: 'priority', 
    },
    { 
      label: 'Consignment Type', 
      type: 'select', 
      name: 'consignmentType', 
      options: ['Delivery', 'Pickup'], // Options for Consignment Type
    },
    { label: 'Description', type: 'textarea', name: 'description' },
  ];

  // Handle form submission
  const handleSubmit = (formData) => {
    console.log('Updated Consignment Data:', formData);
    // Implement the API integration for form submission here
  };

  // Handle cancellation
  const handleCancel = () => {
    navigate('/consignments'); // Navigate to Consignment List page
  };

  const title = "Edit Consignment"; // Set the title

  return (
    <PageWrapper
      showAddButton={false}
      filters={[]}
      title={""} // Set the title to be displayed
    >
      <EditForm 
        title={title}
        fields={consignmentFields}
        statusLabel="Active" 
        showStatusCheckbox={true} 
        onSubmit={handleSubmit}
        onCancel={handleCancel}  // Pass handleCancel function
        initialData={{}} // No initial data is provided, as requested
      />
    </PageWrapper>
  );
};

export default EditConsignment;
