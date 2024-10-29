import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import AddForm from "../../components/AddForm/AddForm";

const AddRunsheet = () => {
  const navigate = useNavigate();

  // Initialize consignments with two default records
  const [consignments, setConsignments] = useState([
    { consignmentNumber: "12345", type: "Delivery", priority: "1" },
    { consignmentNumber: "67890", type: "Pickup", priority: "2" },
  ]);

  // Fields for Runsheet section
  const runsheetFields = [
    { label: "Runsheet#", type: "text", name: "Runsheet#" },
    { label: "Driver", type: "text", name: "driver" },
    { label: "Vehicle", type: "select", options: ["XO121", "XO122", "XO123"] },
    { label: "Type", type: "select", name: "type", options: ["B double", "Trailer", "Truck"] },
    { label: "Branch", type: "select", name: "branch", options: ["Sydney", "Melbourne", "Brisbane"] },
  ];

  // Fields for Assign Consignment section
  const consignmentFields = [
    {
      label: "Consignment #",
      type: "text",
      name: "consignmentNumber",
    },
    {
      label: "Type",
      type: "select",
      name: "type",
      options: ["Delivery", "Pickup"],
    },
    {
      label: "Priority",
      type: "text",
      name: "priority",
    },
  ];

  const handleAddRunsheet = (data) => {
    // Here you would typically send the data to your backend API
    console.log("Adding runsheet:", data);
    navigate("/runsheets");
  };

  const handleAssignConsignment = (newConsignment) => {
    setConsignments([...consignments, newConsignment]);
  };

  const handleDeleteConsignment = (index) => {
    setConsignments(consignments.filter((_, i) => i !== index));
  };

  return (
    <PageWrapper showAddButton={false}>
      <AddForm
        title="Add Runsheet"
        fields={runsheetFields}
        secondTitle="Assign Consignment"
        secondFields={consignmentFields}
        onSubmit={handleAddRunsheet}
        onCancel={() => navigate("/runsheets")}
        onAssignConsignment={handleAssignConsignment} // Pass assign function
        consignments={consignments}
        showTable={true}
        onDeleteConsignment={handleDeleteConsignment} // Pass delete function
        isAddRunsheetPage={true}
      />
    </PageWrapper>
  );
};

export default AddRunsheet;
