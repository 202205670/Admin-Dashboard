import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import PageWrapper from "../../components/PageWrapper/PageWrapper";
import "./dashboard.css";
import DriversPage from "../Drivers/DriverList";
import EmployeesPage from "../Employees/EmployeesPage";
import ConsignmentsPage from "../Consignments/ConsignmentsPage";
import RunsheetPage from "../Runsheets/RunsheetsPage";
import VehiclePage from "../Vehicles/Vehicle";

import axiosInstance from "../../server/axios.instance";
import TableComponent from "../../components/Table/TableComponent";
import { useNavigate } from "react-router-dom";

// Define active and inactive colors
const COLORS = ["#EDCB54", "#FFECAB"];

const Dashboard = () => {
  const [driverCounts, setDriverCounts] = useState({ active: 0, inactive: 0 });
  const [runsheetsData, setRunsheetsData] = useState([]);
  const [loading, setLoading] = useState(true);


  const navigate = useNavigate();
  const [employeeCounts, setEmployeeCounts] = useState({
    active: 0,
    inactive: 0,
  });
  const [consignmentCounts, setConsignmentCounts] = useState({
    active: 0,
    inactive: 0,
  });
  const [runsheetCounts, setRunsheetCounts] = useState({
    active: 0,
    inactive: 0,
  });
  const [vehicleCounts, setVehicleCounts] = useState({
    active: 0,
    inactive: 0,
  });

  const generateChartData = (active, inactive) => [
    { name: "Active", value: active },
    { name: "Not Active", value: inactive },
  ];

  useEffect(() => {
    const fetchData = async () => {
      const response = await axiosInstance.get("/admin/runsheet/today");
      console.log(response.data.data)
      const transformedData = response?.data?.data?.map((runsheet) => ({
        id: runsheet.id,
        status: runsheet.statusId === 1 ? " Open" : "Closed ",
        branchName: runsheet.branch.name,
        driverName:`${runsheet.driver?.firstName || "Unknown"} ${
          runsheet.driver?.lastName || "Unknown"
        }`,
        vehicle: runsheet.vehicle?.plateNumber || "Unknown Vehicle",
        startTime: runsheet.vehicle?.startTime
        ? `${new Date(runsheet.vehicle.startTime).toLocaleDateString(
            "en-GB"
          )} ${new Date(runsheet.vehicle.startTime).toLocaleTimeString(
            "en-US",
            { hour: "2-digit", minute: "2-digit", hour12: false }
          )}`
        : "-", // Fallback for missing startTime
      finishTime: runsheet.vehicle?.finishTime
        ? `${new Date(runsheet.vehicle.finishTime).toLocaleDateString(
            "en-GB"
          )} ${new Date(runsheet.vehicle.finishTime).toLocaleTimeString(
            "en-US",
            { hour: "2-digit", minute: "2-digit", hour12: false }
          )}`
        : "-", // Current date as fallback for finishTime
      restTime: runsheet.vehicle?.restTime
        ? `${new Date(runsheet.vehicle.restTime).toLocaleDateString(
            "en-GB"
          )} ${new Date(runsheet.vehicle.finishTime).toLocaleTimeString(
            "en-US",
            { hour: "2-digit", minute: "2-digit", hour12: false }
          )}`
        : "-", // Current date as fallback for finishTime
    }));
     

      setRunsheetsData(transformedData);
      setLoading(false);
    };

    fetchData();
  }, []);

  const handleRowClick = (id) => {
    navigate(`/runsheetDetailPage/${id}`);
  };

  console.log(runsheetsData);

  return (
    <PageWrapper title="Dashboard" showAddButton={false}>
      <div className="dashboard-container">
        {/* Driver Status */}
        <div className="dashboard-box">
          <div className="Informationpie">
            <h2>Drivers</h2>
            <p>
              {" "}
              Active: <span className="status-dot active-dot"></span>
              {driverCounts.active}
            </p>
            <p>
              {" "}
              Not Active: <span className="status-dot inactive-dot"></span>{" "}
              {driverCounts.inactive}
            </p>
          </div>
          <PieChart width={160} height={150}>
            <Pie
              data={generateChartData(
                driverCounts.active,
                driverCounts.inactive
              )}
            >
              {generateChartData(
                driverCounts.active,
                driverCounts.inactive
              ).map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>
        <DriversPage updateDriverCount={setDriverCounts} showRecords={true} />

        {/* Employee Status */}
        <div className="dashboard-box">
          <div className="Informationpie">
            <h2>Employees</h2>
            <p>
              {" "}
              Active: <span className="status-dot active-dot"></span>
              {employeeCounts.active}
            </p>
            <p>
              {" "}
              Not Active: <span className="status-dot inactive-dot"></span>{" "}
              {employeeCounts.inactive}
            </p>
          </div>
          <PieChart width={160} height={150}>
            <Pie
              data={generateChartData(
                employeeCounts.active,
                employeeCounts.inactive
              )}
            >
              {generateChartData(
                employeeCounts.active,
                employeeCounts.inactive
              ).map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>
        <EmployeesPage
          updateEmployeeCount={setEmployeeCounts}
          showRecords={true}
        />

        {/* Consignment Status */}
        <div className="dashboard-box">
          <div className="Informationpie">
            <h2>Consignments</h2>
            <p>
              Active: <span className="status-dot active-dot"></span>{" "}
              {consignmentCounts.active}
            </p>
            <p>
              Not Active: <span className="status-dot inactive-dot"></span>{" "}
              {consignmentCounts.inactive}
            </p>
          </div>
          <PieChart width={160} height={150}>
            <Pie
              data={generateChartData(
                consignmentCounts.active,
                consignmentCounts.inactive
              )}
            >
              {generateChartData(
                consignmentCounts.active,
                consignmentCounts.inactive
              ).map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>
        <ConsignmentsPage
          updateConsignmentCount={setConsignmentCounts}
          showRecords={true}
        />

        {/* Runsheet Status */}
        <div className="dashboard-box">
          <div className="Informationpie">
            <h2>Runsheets</h2>
            <p>
              {" "}
              Open: <span className="status-dot active-dot"></span>
              {runsheetCounts.active}
            </p>
            <p>
              {" "}
              Closed: <span className="status-dot inactive-dot"></span>{" "}
              {runsheetCounts.inactive}
            </p>
          </div>
          <PieChart width={160} height={150}>
            <Pie
              data={generateChartData(
                runsheetCounts.active,
                runsheetCounts.inactive
              )}
            >
              {generateChartData(
                runsheetCounts.active,
                runsheetCounts.inactive
              ).map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>
        <RunsheetPage
          updateRunsheetCount={setRunsheetCounts}
          showRecords={true}
        />

        {/* Vehicle Status */}
        <div className="dashboard-box">
          <div className="Informationpie">
            <h2>Vehicle</h2>
            <p>
              Active: <span className="status-dot active-dot"></span>
              {vehicleCounts.active}
            </p>
            <p>
              Not Active: <span className="status-dot inactive-dot"></span>{" "}
              {vehicleCounts.inactive}
            </p>
          </div>
          <PieChart width={160} height={150}>
            <Pie
              data={generateChartData(
                vehicleCounts.active,
                vehicleCounts.inactive
              )}
            >
              {generateChartData(
                vehicleCounts.active,
                vehicleCounts.inactive
              ).map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>

        <VehiclePage updateVehicleCount={setVehicleCounts} showRecords={true} />
      </div>
      <TableComponent
        columns={[
          "id",
          "branchName",
          "driverName",
          "vehicle",
          "startTime",
          "finishTime",
          "restTime",
          "status",
        ]}
        data={runsheetsData}
        editPageUrl="/edit-runsheet"
        loading={loading}
        isRunsheetPage={true}
        onRowClick={handleRowClick}
      />
    </PageWrapper>
  );
};

export default Dashboard;
