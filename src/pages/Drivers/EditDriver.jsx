import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"; // Import useNavigate
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import EditForm from "../../components/EditForm/EditForm"; // Use EditForm
import axiosInstance from '../../server/axios.instance';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
const EditDriver = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const { id } = useParams(); // Get the driver ID from the URL
  const [branchOptions, setBranchOptions] = useState([]);
  const [addressOptions, setAddressOptions] = useState([]);
  const [driverData, setDriverData] = useState(null);
  const [isSubmitting,setIsSubmitting] = useState(false)


  useEffect(() => {
    const fetchDriverData = async () => {
      try {
        const response = await axiosInstance.get(`/admin/drivers/${id}`);
        setDriverData({
          username: response.data.driver.user.username,
          firstName:  response.data.driver.firstName,
          lastName:  response.data.driver.lastName,
          phoneNumber:  response.data.driver.phoneNumber,
          email: response.data.driver.email,
          branchId:response.data.driver.branchId,
          addressId:response.data.driver.addressId,
          active: response.data.driver.statusId === 1 ? true : false
        });
      } catch (error) {
        console.error("Error fetching driver data:", error);
      }
    };

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
    fetchDriverData()
  }, []);

  const driverFields = [
    { label: "Username", type: "text", name: "username" },
    { label: "First Name", type: "text", name: "firstName" },
    { label: "Last Name", type: "text", name: "lastName" },
    { label: "Phone Number", type: "text", name: "phoneNumber" },
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
    {
      label: "Status",
      type: "checkbox",
      name: "active",
    },
  ];

  const handleSubmit = async (formData) => {
    try {
      await axiosInstance.put(`/admin/drivers/${id}`, formData);
      setIsSubmitting(false)
      navigate("/drivers"); // Redirect to the Driver List page
      toast.success("Driver edited successfully!"); // Success feedback
    } catch (error) {
      toast.error("Error updating driver:", error);
      
    }
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
      {driverData &&  <EditForm
        title={title}
        fields={driverFields} // Pass the fields without placeholders
        initialValues={driverData}
        statusLabel="Active" 
        onSubmit={handleSubmit}
        onCancel={handleCancel}  // Pass handleCancel function
        setIsSubmitting={setIsSubmitting}
        isSubmitting={isSubmitting}
      /> }
    
    </PageWrapper>
  );
};

export default EditDriver;
