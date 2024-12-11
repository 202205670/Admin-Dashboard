import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom'; // Import useNavigate
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import EditForm from "../../components/EditForm/EditForm"; // Import EditForm
import axiosInstance from '../../server/axios.instance'
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
const EditEmployee = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const { id } = useParams(); // Get the driver ID from the URL
  
  const [branchOptions, setBranchOptions] = useState([]);
  const [addressOptions, setAddressOptions] = useState([]);
  const [employeeData, setEmployeeData] = useState(null);
  const [isSubmitting,setIsSubmitting] = useState(false)


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
    {
      label: "Status",
      type: "checkbox",
      name: "active",
    },
  ];

  useEffect(() => {

    const fetchEmployeeData = async () => {
      try {
        const response = await axiosInstance.get(`/admin/employee/${id}`);
        setEmployeeData({
          username: response.data.employee.user.username,
          firstName:  response.data.employee.firstName,
          lastName:  response.data.employee.lastName,
          phoneNumber:  response.data.employee.phoneNumber,
          email: response.data.employee.email,
          branchId:response.data.employee.branchId,
          addressId:response.data.employee.addressId,
          active: response.data.employee.statusId === 1 ? true : false
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
    fetchEmployeeData()
  }, []);

  const handleSubmit = async (formData) => {
    try {
      await axiosInstance.put(`/admin/employee/${id}`, formData);
      setIsSubmitting(false)
      navigate("/employees"); // Redirect to the Driver List page
      toast.success("Employee edited successfully!"); // Success feedback
    } catch (error) {
      toast.error("Error updating Employee:", error);
    }
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
      {employeeData &&  <EditForm
        title={title}
        fields={employeeFields}  
        statusLabel="Active"
        initialValues={employeeData}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        setIsSubmitting={setIsSubmitting}
        isSubmitting={isSubmitting}
      />}
     
    </PageWrapper>
  );
};

export default EditEmployee;
