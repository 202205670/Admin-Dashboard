import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import EditForm from "../../components/EditForm/EditForm";
import TableComponent from "../../components/Table/TableComponent";
import { faTruck } from "@fortawesome/free-solid-svg-icons";

const EditRunsheetPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    runsheet: "", // You can set the initial value for Runsheet
    driver: "", // Set initial value for driver
    vehicle: "", // Set initial value for vehicle
    branch: "Sydney", // Default value for branch
    startTime: "", // Set initial value for start time
    finishTime: "", // Set initial value for finish time
    restTime: "", // Set initial value for rest time
    status: "Active", // Set the initial status value
    vehicleSafety: false,
    driverSafety: false,
    fuelAdded: false,
  });

  const runsheetFields = [
    { label: "Runsheet#", type: "text", name: "runsheet", value: formData.runsheet },
    { label: "Driver", type: "text", name: "driver", value: formData.driver },
    { label: "Vehicle", type: "text", name: "vehicle", value: formData.vehicle },
    { label: "Branch", type: "select", name: "branch", options: ["Sydney", "Melbourne", "Brisbane"], value: formData.branch },
    { label: "Start Time", type: "time", name: "startTime", value: formData.startTime },
    { label: "Finish Time", type: "time", name: "finishTime", value: formData.finishTime },
    { label: "Rest Time", type: "text", name: "restTime", value: formData.restTime   },
    
    // Status label to show current status

    { label: " Status  : Open", type: "checkbox", name: "vehicleSafety", checked: formData.vehicleSafety },
    { label: "Vehicle Safety", type: "checkbox", name: "vehicleSafety", checked: formData.vehicleSafety },
    { label: "Driver Safety", type: "checkbox", name: "driverSafety", checked: formData.driverSafety },
    { label: "Fuel Added", type: "checkbox", name: "fuelAdded", checked: formData.fuelAdded },
  ];

  const consignmentsData = [
    { id: 1, consig: "C001", customer: "Customer A", runsheet: "R001", source: "Source A", destination: "Destination A", timeIn: "08:00", timeOut: "10:00", priority: "1", status: "Active", type: "Type A" },
    { id: 2, consig: "C002", customer: "Customer B", runsheet: "R002", source: "Source B", destination: "Destination B", timeIn: "09:00", timeOut: "11:00", priority: "2", status: "Not Active", type: "Type B" },
    { id: 1, consig: "C001", customer: "Customer A", runsheet: "R001", source: "Source A", destination: "Destination A", timeIn: "08:00", timeOut: "10:00", priority: "1", status: "Active", type: "Type A" },
    { id: 2, consig: "C002", customer: "Customer B", runsheet: "R002", source: "Source B", destination: "Destination B", timeIn: "09:00", timeOut: "11:00", priority: "2", status: "Not Active", type: "Type B" },
    { id: 1, consig: "C001", customer: "Customer A", runsheet: "R001", source: "Source A", destination: "Destination A", timeIn: "08:00", timeOut: "10:00", priority: "1", status: "Active", type: "Type A" },
    { id: 2, consig: "C002", customer: "Customer B", runsheet: "R002", source: "Source B", destination: "Destination B", timeIn: "09:00", timeOut: "11:00", priority: "2", status: "Not Active", type: "Type B" },
    { id: 1, consig: "C001", customer: "Customer A", runsheet: "R001", source: "Source A", destination: "Destination A", timeIn: "08:00", timeOut: "10:00", priority: "1", status: "Active", type: "Type A" },
    { id: 2, consig: "C002", customer: "Customer B", runsheet: "R002", source: "Source B", destination: "Destination B", timeIn: "09:00", timeOut: "11:00", priority: "2", status: "Not Active", type: "Type B" },
 

];

  const handleFormSubmit = (updatedData) => {
    // Update the state with the form data
    setFormData(updatedData);
    console.log("Form submitted:", updatedData);
  };

  const handleFormCancel = () => {
    navigate("/runsheets");
  };

  return (
    <PageWrapper showAddButton={false}>
      <EditForm
        title="Edit Runsheet"
        fields={runsheetFields}
        onSubmit={handleFormSubmit}
        onCancel={handleFormCancel}
        tableComponent={
          <TableComponent
            columns={[
              "consig", 
              "customer",
            
              "source",
              "destination",
              "timeIn",
              "timeOut",
              
              "status",
              "type",
            ]}
            data={consignmentsData}
            pageSpecificIcons={faTruck}
            editPageUrl="/edit-consignment"
          />
        }
      />
    </PageWrapper>
  );
};

export default EditRunsheetPage;
