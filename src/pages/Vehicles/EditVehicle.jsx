import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom'; // Import useNavigate and useParams
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import EditForm from "../../components/EditForm/EditForm";
import axiosInstance from '../../server/axios.instance'

const EditVehicle = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const { id } = useParams(); // Get vehicle ID from URL parameters
  const [branchOptions, setBranchOptions] = useState([]);
  const [vehicleTypeOptions, setVehicleTypeOptions] = useState([]);
  const [vehicleData, setVehicleData] = useState(null);
 

  useEffect(() => {
    const fetchVehicleData = async () => {
      try {
        const response = await axiosInstance.get(`/admin/vehicle/single/${id}`);
        setVehicleData({
          plateNumber: response.data.vehicle.plateNumber,
          branchId:response.data.vehicle.branchId,
          vehicleTypeId:response.data.vehicle.vehicleTypeId,
          active: response.data.vehicle.statusId === 1 ? true : false
        });
      } catch (error) {
        console.error("Error fetching vehicle data:", error);
      }
    };

    const fetchOptions = async () => {
      try {
        const branchResponse = await axiosInstance.get("/admin/branch");
        setBranchOptions(
          branchResponse?.data?.branches?.map((branch) => ({
            label: branch.name,
            value: branch.id,
          }))
        );

        const vehicleTypeResponse = await axiosInstance.get(
          "/admin/vehicle/type"
        );
        setVehicleTypeOptions(
          vehicleTypeResponse?.data?.vehicleTypes?.map((type) => ({
            label: type.name,
            value: type.id,
          }))
        );
      } catch (error) {
        console.error("Error fetching options:", error);
      }
    };

    fetchOptions();
    fetchVehicleData()
  }, []);

  const vehicleFields = [
    { label: "Plate #", type: "text", name: "plateNumber" },
    {
      label: "Branch",
      type: "select",
      name: "branchId",
      options: branchOptions,
    },
    {
      label: "Vehicle Type",
      type: "select",
      name: "vehicleTypeId",
      options: vehicleTypeOptions,
    },
    {
      label: "Status",
      type: "checkbox",
      name: "active",
    },
  ];

  // Handle form submission
  const handleSubmit = async (formData) => {
    console.log(formData)

    try {
      await axiosInstance.put(`/admin/vehicle/${id}`, formData);
      navigate("/vehicles"); // Redirect to the Driver List page
    } catch (error) {
      console.error("Error updating driver:", error);
    }
  };

  // Handle cancellation
  const handleCancel = () => {
    navigate('/vehicles'); // Navigate to Vehicle List page
  };

  const title = "Edit Vehicle"; // Set the title

  return (
    <PageWrapper
      showAddButton={false}
      filters={[]}
      title={""} // Set the title to be displayed
    >
      {vehicleData && <EditForm 
        title={title}
        fields={vehicleFields}
        initialValues={vehicleData}
        statusLabel="Active"
        onSubmit={handleSubmit}
        onCancel={handleCancel}  // Pass handleCancel function
        initialData={{}} // No initial data is provided, as requested
      />}
      
    </PageWrapper>
  );
};

export default EditVehicle;
