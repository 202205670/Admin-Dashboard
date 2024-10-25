import React from "react";
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import EditForm from "../../components/EditForm/EditForm"; // Import EditForm

const EditEmployee = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  const employeeFields = [
    { label: 'First Name', type: 'text', name: 'firstName', placeholder: 'John' },
    { label: 'Last Name', type: 'text', name: 'lastName', placeholder: 'Doe' },
    { label: 'Email', type: 'email', name: 'email', placeholder: 'john.doe@example.com' },
    {
      label: 'Branch', type: 'select', name: 'branch',
      options: ['Sydney', 'Brisbane', 'Melbourne'],
      placeholder: 'Sydney',
    },
    { label: 'Address', type: 'text', name: 'address', placeholder: '123 Main St' },
  ];

  const handleSubmit = (formData) => {
    console.log('Updated Employee Form Data:', formData);
    // You can implement the API integration for form submission here
  };

  const handleCancel = () => {
    navigate('/employees'); // Navigate to Employee List page
  };

  const title = "Edit Employee"; // Set the title

  return (
    <PageWrapper
      showAddButton={false}
      filters={[]}
      title={""}
    >
      <EditForm
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

export default EditEmployee;
