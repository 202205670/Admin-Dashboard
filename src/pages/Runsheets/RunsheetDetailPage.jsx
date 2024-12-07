import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import TableComponent from "../../components/Table/TableComponent";
import { faTruck } from "@fortawesome/free-solid-svg-icons";
import "./RunsheetDetailPage.css";

import axiosInstance from "../../server/axios.instance";

const RunsheetPage = () => {
  const [consignmentsData, setConsignmentsData] = useState([]);
  const [runSheetDetails, setRunSheetDetails] = useState({});
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const params = useParams();

  const handleEditClick = () => {
    navigate(`/edit-runsheet/${runSheetDetails?.runsheet?.id}`);
  };

  const handleCancelClick = () => {
    navigate("/runsheets"); // Navigate back to the main Runsheet page
  };

  const fetchRunSheetDetails = async () => {
    try {
      const response = await axiosInstance.get(`/admin/runsheet/${params?.id}`);
      setRunSheetDetails(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await axiosInstance.get(
        `/admin/consignment/runsheet/${params?.id}`
      );
      console.log(response.data?.consignments);
      const transformedData = response.data?.consignments.map(
        (consignment) => ({
          id: consignment?.id,
          consignmentNo: consignment.consignmentNo,
          customer: consignment.customer.name,
          runsheet: consignment.runsheet.id,
          source: consignment.source.city,
          destination: consignment.destination.city,
          timeIn: consignment.timeIn
            ? `${new Date(consignment.timeIn).toLocaleDateString(
                "en-GB"
              )} ${new Date(consignment.timeIn).toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
              })}`
            : "-", // Fallback for missing timein
          timeOut: consignment.timeOut
            ? `${new Date(consignment.timeOut).toLocaleDateString(
                "en-GB"
              )} ${new Date(consignment.timeIn).toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
              })}`
            : "-",
          priority: consignment.priority,
          status: consignment.statusId === 1 ? "Active" : "Not Active",
          type: consignment.typeId === 1 ? "Pick-Up" : "Delivery",
        })
      );
      setConsignmentsData(transformedData);
      setLoading(false);
    };

    fetchData();
    fetchRunSheetDetails();
  }, []);

  return (
    <PageWrapper showAddButton={false}>
      <div className="runsheet-details">
        <div>
          <h2>Runsheet Details</h2>
        </div>
        <div className="runsheet-info">
          <div className="info-item">
            <strong>Runsheet:</strong> {runSheetDetails?.runsheet?.id}
          </div>
          <div className="info-item">
            <strong>Driver:</strong>{" "}
            {runSheetDetails?.runsheet?.driver?.firstName}
          </div>
          <div className="info-item">
            <strong>Vehicle:</strong>{" "}
            {runSheetDetails?.runsheet?.vehicle?.plateNumber}
          </div>
          <div className="info-item">
            <strong>Branch:</strong> {runSheetDetails?.runsheet?.branch?.name}
          </div>
        </div>
        <div className="runsheet-info">
          <div className="info-item">
            <strong>Start Time:</strong>{" "}
            {runSheetDetails?.runsheet?.startTime &&
              new Date(runSheetDetails?.runsheet?.startTime)
                .toISOString()
                .split("T")[0]}
          </div>
          <div className="info-item">
            <strong>Finish Time:</strong>{" "}
            {runSheetDetails?.runsheet?.finishTime &&
              new Date(runSheetDetails?.runsheet?.finishTime)
                .toISOString()
                .split("T")[0]}
          </div>
          <div className="info-item">
            <strong>Rest Time:</strong> {runSheetDetails?.runsheet?.restTime}
          </div>
          <label>
            Status:
            <input
              type="checkbox"
              checked={runSheetDetails?.runsheet?.statusId === 1 ? true : false}
              readOnly
            />{" "}
            {runSheetDetails?.runsheet?.statusId === 1 ? "Open" : "Closed"}
          </label>
        </div>
        <div className="runsheet-info">
          {/* <div className="info-item">
            <strong>Start KM’s:</strong>{" "}
            {runSheetDetails?.runsheet?.vehicle?.currentKms}
          </div>
          <div className="info-item">
            <strong>Finished KM’s:</strong>{" "}
            {runSheetDetails?.runsheet?.vehicle?.currentKms}
          </div> */}
          <div className="info-item">
            <strong>Curren KM’s:</strong>{" "}
            {runSheetDetails?.runsheet?.vehicle?.currentKms}
          </div>
        </div>

        <div className="checkboxes">
          <label>
            <input
              type="checkbox"
              checked={runSheetDetails?.runsheet?.vehicleSafety}
              readOnly
            />{" "}
            Vehicle Safety
          </label>
          <label>
            <input
              type="checkbox"
              checked={runSheetDetails?.runsheet?.driverSafety}
              readOnly
            />{" "}
            Driver Safety
          </label>
          <label>
            <input
              type="text"
              value={runSheetDetails?.runsheet?.fuelAdded}
              readOnly
            />{" "}
            Fuel Added
          </label>
        </div>

        <div className="recent-activities">
          <TableComponent
            columns={[
              // "id",
              "consignmentNo",
              "customer",
              "runsheet",
              "source",
              "destination",
              "timeIn",
              "timeOut",
              "priority",
              "status",
              "type",
            ]}
            data={consignmentsData}
            loading={loading}
            editPageUrl="/edit-consignment"
            pageSpecificIcons={faTruck}
          />
        </div>

        <div className="button-group">
          <button className="cancel-button" onClick={handleCancelClick}>
            Cancel
          </button>
          <button className="edit-button" onClick={handleEditClick}>
            Edit
          </button>
        </div>
      </div>
    </PageWrapper>
  );
};

export default RunsheetPage;
