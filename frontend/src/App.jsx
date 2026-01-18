import React from "react";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Dashboard from "./pages/Admin/Dashboard";
import UserDashboard from "./pages/User/UserDashboard";
import Drivers from "./pages/Admin/Drivers";
import Trucks from "./pages/Admin/Trucks";
import Parties from "./pages/Admin/Parties";
import Journeys from "./pages/Admin/Journeys";
import Reports from "./pages/Admin/Reports";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserDashboardLayout from "./pages/User/UserDashboardLayout";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* User routes */}
          <Route path="/user" element={<UserDashboardLayout />}>
            <Route path="dashboard" element={<UserDashboard />} />
            <Route path="trucks" element={<Trucks />} />
            <Route path="journeys" element={<Journeys />} />
          </Route>

          {/* Admin routes */}
          <Route path="/admin" element={<AdminDashboard />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="drivers" element={<Drivers />} />
            <Route path="trucks" element={<Trucks />} />
            <Route path="parties" element={<Parties />} />
            <Route path="journeys" element={<Journeys />} />
            <Route path="report" element={<Reports />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;
