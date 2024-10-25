import React from "react";
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import AddForm from "../../components/AddForm/AddForm";

const AddVehicle = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  // Define the options for the Branch select field
  const branchOptions = ['Sydney', 'Brisbane', 'Melbourne'];

  // Define the fields for the Add Vehicle form
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
    console.log('Vehicle Form Data:', formData);
    // Implement API integration for form submission here
  };

  // Handle cancellation
  const handleCancel = () => {
    navigate('/vehicles'); // Navigate to Vehicle List page
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
        showStatusCheckbox={true} 
        onSubmit={handleSubmit}
        onCancel={handleCancel}  // Pass handleCancel function
      />
    </PageWrapper>
  );
};

export default AddVehicle;
  