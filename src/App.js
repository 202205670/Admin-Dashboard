import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout"; // Import layout

import './App.css';
import LoginPage from './pages/LoginPage/LoginPage';

import Dashboard from "./pages/Dashboard/Dashboard";

import DriverList from "./pages/Drivers/DriverList";
import AddDriver from "./pages/Drivers/AddDriver";
import EditDriver from "./pages/Drivers/EditDriver";


import Employees from "./pages/Employees/EmployeesPage";
import AddEmployee from "./pages/Employees/AddEmployee";
import EditEmployee from "./pages/Employees/EditEmployee";

import Consignments from "./pages/Consignments/ConsignmentsPage";
import AddConsignment from "./pages/Consignments/AddConsignment";
import EditConsignment from "./pages/Consignments/EditConsignment";

import Runsheets from "./pages/Runsheets/RunsheetsPage";
import RunsheetDetailPage from "./pages/Runsheets/RunsheetDetailPage";
import AddRunsheet from "./pages/Runsheets/AddRunsheet";
import EditRunsheet from "./pages/Runsheets/EditRunsheet";

import Branches from "./pages/Branches/BranchesPage";
import AddBranch from "./pages/Branches/AddBranch";
import EditBranch from "./pages/Branches/EditBranch";

import Vehicles from "./pages/Vehicles/Vehicle";
import AddVehicle from "./pages/Vehicles/AddVehicle";
import EditVehicle from"./pages/Vehicles/EditVehicle";

function App() {
  return (
    <Router>
 
      <Layout >  
     
        <Routes>
       { <Route path="/" element={<LoginPage />} /> }
          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/drivers" element={<DriverList />} />
          <Route path="/add-driver" element={<AddDriver />} />
          <Route path="/edit-driver/:id" element={<EditDriver />} />

          <Route path="/employees" element={<Employees />} />
          <Route path="/add-employee" element={<AddEmployee />} />
          <Route path="/edit-employee/:id" element={<EditEmployee/>} />

          <Route path="/consignments" element={<Consignments />} />
          <Route path="/add-consignment" element={<AddConsignment />} />
          <Route path="/edit-consignment/:id" element={<EditConsignment/>} />

          <Route path="/runsheets" element={<Runsheets />} />
          <Route path="/runsheetDetailPage/:id" element={<RunsheetDetailPage />} />

          <Route path="/add-runsheet" element={<AddRunsheet />} />
          
          <Route path="/edit-runsheet/:id" element={<EditRunsheet/>} />

          <Route path="/branches" element={<Branches />} />
          <Route path="/add-branch" element={<AddBranch />} />
          <Route path="/edit-branch/:id" element={<EditBranch/>} />

          <Route path="/vehicles" element={<Vehicles />} />
          <Route path="/add-vehicle" element={<AddVehicle />} />
          <Route path="/edit-vehicle/:id" element={<EditVehicle/>} />

        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
