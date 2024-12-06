import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"; // Import useNavigate and useParams
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import EditForm from "../../components/EditForm/EditForm";
import axiosInstance from "../../server/axios.instance";

const EditConsignment = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [customerOptions, setCustomerOptions] = useState([]);
  const [runsheetOptions, setRunsheetOptions] = useState([]);
  const [sourceOptions, setSourceOptions] = useState([]);
  const [destinationOptions, setDestinationOptions] = useState([]);
  const [consignmentData, setConsignmentData] = useState(null);

  useEffect(() => {
    const fetchConsignmentData = async () => {
      try {
        const response = await axiosInstance.get(
          `/admin/consignment/single/${id}`
        );
        setConsignmentData({
          consignmentNo: response.data.consignment.consignmentNo,
          customerId: response.data.consignment.customerId,
          runsheetId: response.data.consignment.runsheetId,
          sourceId: response.data.consignment.sourceId,
          destinationId: response.data.consignment.destinationId,
          typeId: response.data.consignment.typeId,
          description: response.data.consignment.description,
          priority: response.data.consignment.priority,
          active: response.data.consignment.statusId === 1 ? true : false,
        });
      } catch (error) {
        console.error("Error fetching vehicle data:", error);
      }
    };
    const fetchOptions = async () => {
      try {
        const customerResponse = await axiosInstance.get(
          "/admin/consignment/customers"
        );
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

        const locationResponse = await axiosInstance.get(
          "/admin/branch/address"
        );
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

    fetchConsignmentData();
    fetchOptions();
  }, []);

  const consignmentFields = [
    { label: "Consignment #", type: "text", name: "consignmentNo" },
    {
      label: "Customer",
      type: "select",
      name: "customerId",
      options: customerOptions,
    },
    {
      label: "Runsheet",
      type: "select",
      name: "runsheetId",
      options: runsheetOptions,
    },
    {
      label: "Source",
      type: "select",
      name: "sourceId",
      options: sourceOptions,
    },
    {
      label: "Destination",
      type: "select",
      name: "destinationId",
      options: destinationOptions,
    },
    {
      label: "Consignment Type",
      type: "select",
      name: "typeId",
      options: [
        { label: "Delivery", value: 1 },
        { label: "Pickup", value: 2 },
      ],
    },
    { label: "Description", type: "textarea", name: "description" },
    { label: "Priority", type: "number", name: "priority" },
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
      await axiosInstance.put(`/admin/consignment/${id}`, formData);
      navigate("/consignments"); // Redirect to the Driver List page
    } catch (error) {
      console.error("Error updating driver:", error);
    }
  };

  // Handle cancellation
  const handleCancel = () => {
    navigate("/consignments"); // Navigate to Consignment List page
  };

  const title = "Edit Consignment"; // Set the title

  return (
    <PageWrapper
      showAddButton={false}
      filters={[]}
      title={""} // Set the title to be displayed
    >
      {consignmentData && (
        <EditForm
          title={title}
          fields={consignmentFields}
          initialValues={consignmentData}
          statusLabel="Active"
          onSubmit={handleSubmit}
          onCancel={handleCancel} // Pass handleCancel function
          initialData={{}} // No initial data is provided, as requested
        />
      )}
    </PageWrapper>
  );
};

export default EditConsignment;
