import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../admin/Sidebar";
import Header from "../admin/Header";
import Adminlogin from "../validation/Login";

const AdminLayout = ({ onLogout }) => {
  const location = useLocation();
  const token = localStorage.getItem("token");

  // Check if admin is logged in, else show login page
  if (!token) {
    return <Adminlogin />;
  }

  // Set header title based on current route
  const getPageTitle = () => {
    const path = location.pathname;
    
    if (path.includes("/bookings")) return "Service Bookings";
    if (path.includes("/applications")) return "Job Applications";
    if (path.includes("/products")) return "Services Catalog";
    if (path.includes("/settings")) return "System Settings";
    
    return "Dashboard Overview";
  };

  return (
    <div className="min-h-screen flex bg-bg-ivory text-text-dark">
      {/* Sidebar Navigation */}
      <Sidebar onLogout={onLogout} />

      {/* Main Content Area */}
      <div className="flex-1 ml-64">
        <Header title={getPageTitle()} />
        
        {/* Dynamic nested route components will render inside Outlet */}
        <main className="p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
