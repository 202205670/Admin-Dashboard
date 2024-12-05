import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import AddForm from "../../components/AddForm/AddForm";
import axiosInstance from "../../server/axios.instance"; // Adjust the path to your axios instance

const AddEmployee = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  
  const [branchOptions, setBranchOptions] = useState([]);
  const [addressOptions, setAddressOptions] = useState([]);

  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const response = await axiosInstance.get("/admin/branch"); // Adjust endpoint as needed
        const branches = response.data.branches.map((branch) => ({
          label: branch.name,
          value: branch.id,
        }));
        setBranchOptions(branches);
      } catch (error) {
        console.error("Error fetching branches:", error);
      }
    };

    const fetchAddresses = async () => {
      try {
        const response = await axiosInstance.get("/admin/branch/address"); 
        const addresses = response?.data.address.map((addr) => ({
          label: addr.city, // Assuming fullAddress is available
          value: addr.id,
        }));
        setAddressOptions(addresses);
      } catch (error) {
        console.error("Error fetching addresses:", error);
      }
    };

    fetchBranches();
    fetchAddresses();
  }, []);
  
  const employeeFields = [
    { label: "Username", type: "text", name: "username" },
    { label: "First Name", type: "text", name: "firstName" },
    { label: "Last Name", type: "text", name: "lastName" },
    { label: "Email", type: "email", name: "email" },
    {
      label: "Branch",
      type: "select",
      name: "branchId",
      options: branchOptions,
    },
    {
      label: "Address",
      type: "select",
      name: "addressId",
      options: addressOptions,
    },
  ];

  const handleSubmit = async (formData) => {
    try {
      const payload = {
        ...formData,
        userType: 1, // Ensure userType is set to 2 for Driver
        password: "12345678910"
      };
      const response = await axiosInstance.post("/auth/register", payload); // Adjust endpoint if needed
     
        navigate("/employees"); // Redirect to driver list
    } catch (error) {
      console.error("Error submitting form:", error);
    }
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
