  import React, { useEffect, useState } from "react";
  import { useNavigate } from 'react-router-dom'; // Import useNavigate
  import PageWrapper from "../../components/PageWrapper/PageWrapper";
  import AddForm from "../../components/AddForm/AddForm";
  import axiosInstance from '../../server/axios.instance'

  const AddConsignment = () => {
    const navigate = useNavigate(); // Initialize useNavigate
    const [customerOptions, setCustomerOptions] = useState([]);
    const [runsheetOptions, setRunsheetOptions] = useState([]);
    const [sourceOptions, setSourceOptions] = useState([]);
    const [destinationOptions, setDestinationOptions] = useState([]);

    useEffect(() => {
      const fetchOptions = async () => {
        try {
          const customerResponse = await axiosInstance.get("/admin/consignment/customers");
          setCustomerOptions(
            customerResponse.data.customers.map((customer) => ({
              label: customer.name,
              value: customer.id,
            }))
          );
  
          const runsheetResponse = await axiosInstance.get("/admin/runsheet");
          setRunsheetOptions(
            runsheetResponse.data.runsheets.map((runsheet) => ({
              label: `Runsheet# ${runsheet.id}`,
              value: runsheet.id,
            }))
          );
  
          const locationResponse = await axiosInstance.get("/admin/branch/address");
          setSourceOptions(
            locationResponse.data.address.map((location) => ({
              label: location.city,
              value: location.id,
            }))
          );
          setDestinationOptions(
            locationResponse.data.address.map((location) => ({
              label: location.city,
              value: location.id,
            }))
          );
        } catch (error) {
          console.error("Error fetching options:", error);
        }
      };
  
      fetchOptions();
    }, []);

    // Define the fields for the Add Consignment form
    const consignmentFields = [
      { label: "Consignment #", type: "text", name: "consignmentNo" },
      { label: "Customer", type: "select", name: "customerId", options: customerOptions },
      { label: "Runsheet", type: "select", name: "runsheetId", options: runsheetOptions },
      { label: "Source", type: "select", name: "sourceId", options: sourceOptions },
      { label: "Destination", type: "select", name: "destinationId", options: destinationOptions },
      { label: "Consignment Type", type: "select", name: "typeId", options: [{label:"Delivery",value:1}, {label:"Pickup",value:2}] },
      { label: "Description", type: "textarea", name: "description" },
      { label: "Priority", type: "number", name: "priority" },
    ];

    const handleSubmit = async (formData) => {
      try {
        console.log(formData)
        const response = await axiosInstance.post("/admin/consignment", formData);
        console.log("Consignment created:", response.data);
        navigate("/consignments");
      } catch (error) {
        console.error("Error creating consignment:", error);
      }
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
