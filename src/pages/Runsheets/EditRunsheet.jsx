import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import EditForm from "../../components/EditForm/EditForm";

const EditRunsheetPage = () => {
  const navigate = useNavigate();

  // Runsheet form data
  const [formData, setFormData] = useState({
    runsheet: "", 
    driver: "", 
    vehicle: "", 
    branch: "Sydney", 
    startTime: "", 
    finishTime: "", 
    restTime: "", 
    status: "Active", 
    vehicleSafety: false,
    driverSafety: false,
    fuelAdded: false,
  });

  // Consignments with default records
  const [consignments, setConsignments] = useState([
    { consignmentNumber: "12345", type: "Delivery", priority: "1" },
    { consignmentNumber: "67890", type: "Pickup", priority: "2" },
  ]);

  // Fields for Runsheet section
  const runsheetFields = [
    { label: "Runsheet#", type: "text", name: "runsheet" },
    { label: "Driver", type: "text", name: "driver" },
    { label: "Vehicle", type: "select", name: "vehicle", options: ["XO121", "XO122", "XO123"] },
    { label: "Type", type: "select", name: "type", options: ["B double", "Trailer", "Truck"] },
    { label: "Branch", type: "select", name: "branch", options: ["Sydney", "Melbourne", "Brisbane"] },
    { label: "Start Time", type: "time", name: "startTime" },
    { label: "Finish Time", type: "time", name: "finishTime" },
    { label: "Rest Time", type: "text", name: "restTime" },
    { label: "Start KM’s", type: "text", name: "startKMs" },
    { label: "Finished KM’s", type: "text", name: "finishedKMs" },
    { label: "Total KM’s", type: "text", name: "totalKMs" },
  ];

  // Fields for Assign Consignment section (limited to three fields)
  const consignmentFields = [
    { label: "Consignment #", type: "text", name: "consignmentNumber" },
    { label: "Type", type: "select", name: "type", options: ["Delivery", "Pickup"] },
    { label: "Priority", type: "text", name: "priority" },
  ];

  // Handle form submission
  const handleFormSubmit = (updatedData) => {
    setFormData(updatedData);
    console.log("Form submitted:", updatedData);
  };

  // Handle assign consignment action
  const handleAssignConsignment = (newConsignment) => {
    setConsignments([...consignments, newConsignment]);
  };

  // Handle delete consignment action
  const handleDeleteConsignment = (index) => {
    setConsignments(consignments.filter((_, i) => i !== index));
  };

  // Cancel editing and navigate back to runsheets
  const handleFormCancel = () => {
    navigate("/runsheets");
  };

  return (
    <PageWrapper showAddButton={false}>
      <EditForm
        title="Edit Runsheet"
        fields={runsheetFields}
        secondTitle="Assign Consignment"
        secondFields={consignmentFields}
        onSubmit={handleFormSubmit}
        onCancel={handleFormCancel}
        onAssignConsignment={handleAssignConsignment}
        consignments={consignments}
        showTable = {true}
        onDeleteConsignment={handleDeleteConsignment}
        isEditRunsheetPage
      />
    </PageWrapper>
  );
};

export default EditRunsheetPage;
