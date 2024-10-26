  import React from "react";
  import { useNavigate } from 'react-router-dom'; // Import useNavigate
  import PageWrapper from "../../components/PageWrapper/PageWrapper";
  import AddForm from "../../components/AddForm/AddForm";

  const AddConsignment = () => {
    const navigate = useNavigate(); // Initialize useNavigate

    // Define the fields for the Add Consignment form
    const consignmentFields = [
      { label: 'Consignment #', type: 'text', name: 'consignmentNumber' },
      { label: 'Customer', type: 'text', name: 'customer' },
      { label: 'Runsheet', type: 'text', name: 'runsheet' },
      { label: 'Source', type: 'text', name: 'source' },
      { label: 'Destination', type: 'text', name: 'destination' },

      { label: 'Time In', type: 'time', name: 'timeIn' },
      { label: 'Time Out', type: 'time', name: 'timeOut' },

    // { label: 'Time In', type: 'datetime-local', name: 'timeIn' },
    // { label: 'Time Out', type: 'datetime-local', name: 'timeOut' },
      { 
        label: 'Priority', 
        type: 'text', 
        name: 'priority', 
        
      },
      { 
        label: 'Consignment Type', 
        type: 'select', 
        name: 'consignmentType', 
        options: ['Delivery', 'Pickup'], 
      },
      { label: 'Description', type: 'textarea', name: 'description' },
    ];

    // Handle form submission
    const handleSubmit = (formData) => {
      console.log('Consignment Form Data:', formData);
      // You can implement the API integration for form submission here
    };

    // Handle cancellation
    const handleCancel = () => {
      navigate('/consignments'); // Navigate to Consignment List page
    };

    const title = "Create New Consignment"; // Set the title

    return (
      <PageWrapper
        showAddButton={false}
        filters={[]}
        title={""} // Set the title to be displayed
      >
        <AddForm 
          title={title}
          fields={consignmentFields}
          statusLabel="Active" 
          showStatusCheckbox={true} 
          onSubmit={handleSubmit}
          onCancel={handleCancel}  // Pass handleCancel function
        />
      </PageWrapper>
    );
  };

  export default AddConsignment;
