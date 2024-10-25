import React from "react";
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import AddForm from "../../components/AddForm/AddForm";

const AddEmployee = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const employeeFields = [
    { label: 'First Name', type: 'text', name: 'firstName' },
    { label: 'Last Name', type: 'text', name: 'lastName' },
    { label: 'Email', type: 'email', name: 'email' },
    {
      label: 'Branch', type: 'select', name: 'branch',
      options: ['Sydney', 'Brisbane', 'Melbourne'],
    },
    { label: 'Address', type: 'text', name: 'address' },
  ];

  const handleSubmit = (formData) => {
    console.log('Employee Form Data:', formData);
    // You can implement the API integration for form submission here
  };

  const handleCancel = () => {
    navigate('/employees'); // Navigate to Employee List page
  };

  const title = "Create New Employee"; // Set the title

  return (
    <PageWrapper
      showAddButton={false}
      filters={[]}
      title={""}
    >
      <AddForm 
        title={title}
        fields={employeeFields}  
        statusLabel="Active" 
        showStatusCheckbox={true} 
        onSubmit={handleSubmit}
        onCancel={handleCancel}  
      />
    </PageWrapper>
  );
};

export default AddEmployee;
