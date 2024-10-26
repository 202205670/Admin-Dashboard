import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import AddForm from "../../components/AddForm/AddForm";
import { faTrash, faEdit, faTruck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const AddRunsheet = () => {
  const navigate = useNavigate();
  const [consignments, setConsignments] = useState([]);
  const [newConsignment, setNewConsignment] = useState({
    consignmentNumber: "",
    type: "",
    priority: "",
  });

  // Fields for Runsheet section
  const runsheetFields = [
    { label: "Runsheet#", type: "text", name: "Runsheet#" },
    { label: "Driver", type: "text", name: "driver" },
    { label: "Vehicle", type: "text", name: "vehicle" },
    { label: "Branch", type: "select", name: "branch", options: ["Sydney", "Melbourne", "Brisbane"] },
    { label: "Start Time", type: "time", name: "startTime" },
    { label: "Finish Time", type: "time", name: "finishTime" },
    { label: "Rest Time", type: "text", name: "restTime" },
  ];

  // Fields for Assign Consignment section
  const consignmentFields = [
    {
      label: "Consignment #",
      type: "text",
      name: "consignmentNumber",
      value: newConsignment.consignmentNumber,
      onChange: (e) => setNewConsignment({ ...newConsignment, consignmentNumber: e.target.value }),
    },
    {
      label: "Type",
      type: "select",
      name: "type",
      options: ["Delivery", "Pickup"],
      value: newConsignment.type,
      onChange: (e) => setNewConsignment({ ...newConsignment, type: e.target.value }),
    },
    {
      label: "Priority",
      type: "text",
      name: "priority",
      value: newConsignment.priority,
      onChange: (e) => setNewConsignment({ ...newConsignment, priority: e.target.value }),
    },
  ];

  const handleAddRunsheet = (data) => {
    console.log("Runsheet Data Submitted:", data);
    navigate("/runsheets");
  };

  const handleCancelRunsheet = () => {
    navigate("/runsheets");
  };

  const handleAssignConsignment = () => {
    if (newConsignment.consignmentNumber && newConsignment.type && newConsignment.priority) {
      setConsignments([...consignments, newConsignment]);
      setNewConsignment({ consignmentNumber: "", type: "", priority: "" });
    }
  };

  // Consignments table columns with specific names
  const consignmentColumns = [
    { Header: "Truck", accessor: "truckIcon", Cell: () => <FontAwesomeIcon icon={faTruck} /> },
    { Header: "Consignment #", accessor: "consignmentNumber" },
    { Header: "Type", accessor: "type" },
    { Header: "Priority", accessor: "priority" },
    {
      Header: "Actions",
      accessor: "actions",
      Cell: () => (
        <>
          <FontAwesomeIcon icon={faEdit} className="edit-icon" />
          <FontAwesomeIcon icon={faTrash} className="delete-icon" />
        </>
      ),
    },
  ];

  return (
    <PageWrapper showAddButton={false}>
      <AddForm
        title="Create New Runsheet"
        fields={runsheetFields}
        statusLabel="Closed"
        showStatusCheckbox={true}
        secondTitle="Assign Consignment"
        secondFields={consignmentFields}
        tableData={consignments}
        tableColumns={consignmentColumns}
        onSubmit={handleAddRunsheet}
        onCancel={handleCancelRunsheet}
      />
    </PageWrapper>
  );
};

export default AddRunsheet;
