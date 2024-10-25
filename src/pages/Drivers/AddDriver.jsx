import React from "react";
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import AddForm from "../../components/AddForm/AddForm";

const AddDriver = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const driverFields = [
    { label: 'First Name', type: 'text', name: 'firstName' },
    { label: 'Last Name', type: 'text', name: 'lastName' },
    { label: 'Phone Number', type: 'text', name: 'phone' },
    { label: 'Email', type: 'email', name: 'email' },
    {
      label: 'Branch', type: 'select', name: 'branch',
      options: ['Sydney', 'Brisbane', 'Melbourne'],
    },
    { label: 'Address', type: 'text', name: 'address' },
  ];

  const handleSubmit = (formData) => {
    console.log('Driver Form Data:', formData);
    // You can implement the API integration for form submission here
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
       
        statusLabel="Active" 
        showStatusCheckbox={true} 
        onSubmit={handleSubmit}
        onCancel={handleCancel}  // Pass handleCancel function
      />
    </PageWrapper>
  );
};

export default AddDriver;
