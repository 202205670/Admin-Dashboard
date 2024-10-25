import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import EditForm from "../../components/EditForm/EditForm"; // Use EditForm

const EditDriver = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  
  const driverFields = [
    { label: 'First Name', type: 'text', name: 'firstName' },
    { label: 'Last Name', type: 'text', name: 'lastName' },
    { label: 'Phone Number', type: 'text', name: 'phone' },
    { label: 'Email', type: 'email', name: 'email' },
    {
      label: 'Branch', type: 'select', name: 'branch', options: ['Sydney', 'Brisbane', 'Melbourne'],
    },
    { label: 'Address', type: 'text', name: 'address' },
  ];

  const handleSubmit = (formData) => {
    console.log('Updated Driver Form Data:', formData);
    // Here you can implement the API integration for updating driver data
  };

  const handleCancel = () => {
    navigate('/drivers'); // Navigate to Driver List page
  };

  const title = "Edit Driver"; // Set the title

  return (
    <PageWrapper
      showAddButton={false}
      filters={[]}
      title={""}
    >
      <EditForm
        title={title}
        fields={driverFields} // Pass the fields without placeholders
        statusLabel="Active" 
        showStatusCheckbox={true} 
        onSubmit={handleSubmit}
        onCancel={handleCancel}  // Pass handleCancel function
      />
    </PageWrapper>
  );
};

export default EditDriver;
