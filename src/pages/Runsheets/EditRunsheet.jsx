import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import EditForm from "../../components/EditForm/EditForm";
import axiosInstance from '../../server/axios.instance'
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


const EditRunsheetPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [branchOptions, setBranchOptions] = useState([]);
  const [driverOptions, setDriverOptions] = useState([]);
  const [vehicleOptions, setVehicleOptions] = useState([]);
  const [runsheetData, setRunsheetData] = useState(null);
  const [isSubmitting,setIsSubmitting] = useState(false)
  const [availableConsignment,setAvailableConsignment] = useState([])
  const [selectedConsignments, setSelectedConsignments] = useState([]);


    // Fetch options for Driver, Vehicle, and Branch from the backend
    useEffect(() => {
      const fetchAvailableConsignment = async () => {
        try {
          const response = await axiosInstance.get(`/admin/consignment/available`);
          setAvailableConsignment(
            response?.data?.consignments.map((consignment) => ({
              value: consignment.id, 
              label: consignment.consignmentNo,
            }))
          );
          console.log(availableConsignment)
        } catch (error) {
          console.error("Error fetching consignment data:", error);
        }
        
      };
      const fetchRunsheetData = async () => {
        try {
          const response = await axiosInstance.get(
            `/admin/runsheet/${id}`
          );
          console.log(response.data)
          setRunsheetData({
            driverId: response.data.runsheet.driverId,
            vehicleId: response.data.runsheet.vehicleId,
            chepAccount: response.data.runsheet.chepAccount,
            loscanAccount: response.data.runsheet.loscanAccount,
            branchId: response.data.runsheet.branchId,
            active: response.data.runsheet.statusId === 1 ? true : false,
          });
        } catch (error) {
          console.error("Error fetching vehicle data:", error);
        }
      };
      const fetchOptions = async () => {
        try {
          const branchResponse = await axiosInstance.get("/admin/branch");
          setBranchOptions(
            branchResponse.data.branches.map((branch) => ({
              label: branch.name,
              value: branch.id,
            }))
          );
  
          const driverResponse = await axiosInstance.get("/admin/drivers");
          setDriverOptions(
            driverResponse.data.drivers.map((driver) => ({
              label: `${driver.user.username}`,
              value: driver.id,
            }))
          );
  
          const vehicleResponse = await axiosInstance.get("/admin/vehicle");
          setVehicleOptions(
            vehicleResponse.data.vehicles.map((vehicle) => ({
              label: vehicle.plateNumber,
              value: vehicle.id,
            }))
          );
        } catch (error) {
          console.error("Error fetching options:", error);
        }
      };
      fetchRunsheetData()
      fetchOptions();
      fetchAvailableConsignment()
    }, []);


  const runsheetFields = [
    { label: "Driver", type: "select", name: "driverId", options: driverOptions },
    { label: "Vehicle", type: "select", name: "vehicleId", options: vehicleOptions },
    { label: "CHEP Account", type: "text", name: "chepAccount" },
    { label: "LOSCAN Account", type: "text", name: "loscanAccount" },
    { label: "Branch", type: "select", name: "branchId", options: branchOptions },
    {
      label: "Status",
      type: "checkbox",
      name: "active",
    },
  ];

  const handleConsignmentChange = (selectedOptions) => {
    const values = selectedOptions ? selectedOptions.map(option => option.value) : [];
    setSelectedConsignments(values); // Update the state with selected values
    console.log("Selected Consignments:", values); // Log for debugging
  };

  // Handle form submission
  const handleFormSubmit = async (formData) => {
    console.log(formData)
    const data = {
      ...formData,
      consignments: selectedConsignments
    }
    try {
      await axiosInstance.put(`/admin/runsheet/${id}`, data);
      setIsSubmitting(false)
      navigate("/runsheets"); // Redirect to the Driver List page
      toast.success("Runsheet edited successfully!"); // Success feedback
    } catch (error) {
      toast.error("Error updating Runsheet:", error);
    }
  };


  // Cancel editing and navigate back to runsheets
  const handleFormCancel = () => {
    navigate("/runsheets");
  };

  return (
    <PageWrapper showAddButton={false}>
      {runsheetData && 
      <EditForm
      title="Edit Runsheet"
      fields={runsheetFields}
      initialValues={runsheetData}
      onSubmit={handleFormSubmit}
      onCancel={handleFormCancel}
      setIsSubmitting={setIsSubmitting}
      isSubmitting={isSubmitting}
      availableConsignment={availableConsignment}
      isEditRunsheetPage={true}
      handleConsignmentChange={handleConsignmentChange}
      selectedConsignments={selectedConsignments}
      statusLabel="Active" 
    />}
    </PageWrapper>
  );
};

export default EditRunsheetPage;
