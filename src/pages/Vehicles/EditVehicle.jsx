import React from "react";
import { useNavigate, useParams } from 'react-router-dom'; // Import useNavigate and useParams
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import EditForm from "../../components/EditForm/EditForm";

const EditVehicle = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const { vehicleId } = useParams(); // Get vehicle ID from URL parameters

  // Define the options for the Branch select field
  const branchOptions = ['Sydney', 'Brisbane', 'Melbourne'];

  // Define the fields for the Edit Vehicle form
  const vehicleFields = [
    { label: 'Plate #', type: 'text', name: 'plateNumber' },
    {
      label: 'Branch',
      type: 'select', // Change to 'select' for dropdown
      name: 'branch',
      options: branchOptions // Include the options for the select
    },
    { label: 'Vehicle Type', type: 'text', name: 'vehicleType' },
  ];

  // Handle form submission
  const handleSubmit = (formData) => {
    console.log('Updated Vehicle Data:', formData);
    navigate('/vehicles'); // Navigate to Vehicle List page after editing
  };

  // Handle cancellation
  const handleCancel = () => {
    navigate('/vehicles'); // Navigate to Vehicle List page
  };

  const title = "Edit Vehicle"; // Set the title

  return (
    <PageWrapper
      showAddButton={false}
      filters={[]}
      title={""} // Set the title to be displayed
    >
      <EditForm 
        title={title}
        fields={vehicleFields}
        statusLabel="Active"
        showStatusCheckbox={true}
        onSubmit={handleSubmit}
        onCancel={handleCancel}  // Pass handleCancel function
        initialData={{}} // No initial data is provided, as requested
      />
    </PageWrapper>
  );
};

export default EditVehicle;
