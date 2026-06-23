import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import Header from "./Header";
import ProductTable from "./ProductTable";
import JobApplicationsTable from "./JobApplicationsTable";
import BookingsTable from "./BookingsTable";
import { FiUsers, FiCheckCircle, FiClock, FiShield, FiBriefcase, FiCalendar } from "react-icons/fi";
import Adminlogin from "./Validation/Login";

const AdminDashboard = ({ onLogout }) => {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Adminlogin />;
  }
  const [activeTab, setActiveTab] = useState("dashboard");
  const [stats, setStats] = useState({
    total: 0,
    hired: 0,
    pending: 0,
    bookingsCount: 0
  });
  const [loading, setLoading] = useState(false);

  const fetchStats = async () => {
    setLoading(true);
    try {
      const [careersRes, bookingsRes] = await Promise.all([
        axios.get("http://localhost:5100/api/careers"),
        axios.get("http://localhost:5100/api/bookings")
      ]);
      
      let totalApps = 0;
      let hiredTechs = 0;
      let pendingApps = 0;
      let activeBookings = 0;

      if (careersRes.data && careersRes.data.success) {
        const apps = careersRes.data.applications;
        totalApps = apps.length;
        hiredTechs = apps.filter(a => a.status === "hired").length;
        pendingApps = apps.filter(a => a.status === "pending").length;
      }

      if (bookingsRes.data && bookingsRes.data.success) {
        // active bookings are pending or assigned
        activeBookings = bookingsRes.data.bookings.filter(b => b.status === "assigned" || b.status === "pending").length;
      }

      setStats({
        total: totalApps,
        hired: hiredTechs,
        pending: pendingApps,
        bookingsCount: activeBookings
      });
    } catch (err) {
      console.error("Fetch Stats Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, [activeTab]);

  const getPageTitle = () => {
    if (activeTab === "dashboard") {
      return "Service Metrics & System Overview";
    } else if (activeTab === "bookings") {
      return "Service Bookings Dispatcher";
    } else if (activeTab === "applications") {
      return "Technician Job Applications";
    } else if (activeTab === "products") {
      return "Service Catalog Management";
    } else if (activeTab === "settings") {
      return "System Settings";
    } else {
      return "V&V Administration";
    }
  };

  const renderActiveTab = () => {
    if (activeTab === "dashboard") {
      return (
        <div className="space-y-6">
          {/* KPI Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Card 1: Active Bookings */}
            <div className="bg-white p-6 rounded-3xl border border-border-subtle shadow-md flex items-center gap-4 hover:shadow-lg transition-shadow">
              <div className="h-12 w-12 rounded-2xl bg-primary-maroon/10 text-primary-maroon flex items-center justify-center text-xl font-bold">
                <FiCalendar />
              </div>
              <div>
                <span className="block text-[10px] text-text-dark/50 font-bold uppercase tracking-wider">Active Bookings</span>
                <span className="text-2xl font-extrabold text-text-dark">{stats.bookingsCount}</span>
              </div>
            </div>

            {/* Card 2: Total Apps */}
            <div className="bg-white p-6 rounded-3xl border border-border-subtle shadow-md flex items-center gap-4 hover:shadow-lg transition-shadow">
              <div className="h-12 w-12 rounded-2xl bg-bg-ivory text-primary-maroon border border-border-subtle flex items-center justify-center text-xl font-bold">
                <FiUsers />
              </div>
              <div>
                <span className="block text-[10px] text-text-dark/50 font-bold uppercase tracking-wider">Total Applicants</span>
                <span className="text-2xl font-extrabold text-text-dark">{stats.total}</span>
              </div>
            </div>

            {/* Card 3: Hired */}
            <div className="bg-white p-6 rounded-3xl border border-border-subtle shadow-md flex items-center gap-4 hover:shadow-lg transition-shadow">
              <div className="h-12 w-12 rounded-2xl bg-green-100 text-green-700 flex items-center justify-center text-xl font-bold">
                <FiCheckCircle />
              </div>
              <div>
                <span className="block text-[10px] text-text-dark/50 font-bold uppercase tracking-wider">Technicians Hired</span>
                <span className="text-2xl font-extrabold text-text-dark">{stats.hired}</span>
              </div>
            </div>

            {/* Card 4: Pending Review */}
            <div className="bg-white p-6 rounded-3xl border border-border-subtle shadow-md flex items-center gap-4 hover:shadow-lg transition-shadow">
              <div className="h-12 w-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center text-xl font-bold">
                <FiClock />
              </div>
              <div>
                <span className="block text-[10px] text-text-dark/50 font-bold uppercase tracking-wider">Pending Review</span>
                <span className="text-2xl font-extrabold text-text-dark">{stats.pending}</span>
              </div>
            </div>

          </div>

          {/* Quick Summary Info */}
          <div className="bg-white p-8 rounded-3xl border border-border-subtle shadow-md space-y-4">
            <h3 className="text-lg font-bold text-text-dark flex items-center gap-2">
              <FiShield className="text-primary-maroon" /> Welcome, Administrator
            </h3>
            <p className="text-sm text-text-dark/65 leading-relaxed font-medium">
              Use the navigation menu on the left to manage customer service requests, check incoming technician applications, inspect your service catalog, and customize operational settings. Service bookings requested through the WhatsApp AI assistant will immediately appear under the **Service Bookings** tab, matching them to preferred technicians based on your hiring database.
            </p>
          </div>
        </div>
      );
    } else if (activeTab === "bookings") {
      return <BookingsTable />;
    } else if (activeTab === "applications") {
      return <JobApplicationsTable />;
    } else if (activeTab === "products") {
      return <ProductTable />;
    } else if (activeTab === "settings") {
      return (
        <div className="bg-white p-8 rounded-3xl border border-border-subtle shadow-md max-w-xl space-y-6">
          <h3 className="text-base font-extrabold text-text-dark">Operational Configuration</h3>
          
          <div className="space-y-4 text-xs font-medium text-text-dark/75">
            <div className="flex flex-col gap-2">
              <label className="font-bold text-[10px] uppercase tracking-wider text-text-dark/55">Technician Auto-Assign Limit</label>
              <input type="number" defaultValue={5} className="w-full bg-bg-ivory border border-border-subtle rounded-2xl py-3 px-4 outline-none focus:ring-1 focus:ring-primary-maroon/35" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-bold text-[10px] uppercase tracking-wider text-text-dark/55">Emergency Service Premium Rate (₹)</label>
              <input type="number" defaultValue={250} className="w-full bg-bg-ivory border border-border-subtle rounded-2xl py-3 px-4 outline-none focus:ring-1 focus:ring-primary-maroon/35" />
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-bold text-[10px] uppercase tracking-wider text-text-dark/55">Notification Dispatch Email</label>
              <input type="email" defaultValue="admin@vvservices.com" className="w-full bg-bg-ivory border border-border-subtle rounded-2xl py-3 px-4 outline-none focus:ring-1 focus:ring-primary-maroon/35" />
            </div>
          </div>

          <button className="px-6 py-3 bg-primary-maroon hover:bg-primary-maroon-dark text-white font-bold text-xs rounded-xl shadow-md cursor-pointer transition-colors">
            Save Settings
          </button>
        </div>
      );
    } else {
      return null;
    }
  };

  return (
    <div className="min-h-screen bg-bg-ivory flex">
      {/* Fixed Sidebar */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} onLogout={onLogout} />

      {/* Main Body */}
      <div className="flex-1 ml-64 min-h-screen flex flex-col">
        <Header title={getPageTitle()} />
        <main className="flex-1 p-8 max-w-7xl w-full mx-auto">
          {renderActiveTab()}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
