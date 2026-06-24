import React, { useState, useEffect } from "react";
import axios from "axios";
import { FiUsers, FiCheckCircle, FiClock, FiShield, FiCalendar } from "react-icons/fi";
import socket from "../socket";

const DashboardOverview = () => {
  // State for statistics
  const [stats, setStats] = useState({
    total: 0,
    hired: 0,
    pending: 0,
    bookingsCount: 0,
  });
  const [loading, setLoading] = useState(false);

  // Fetch stats when component loads
  useEffect(() => {
    fetchStats();
  }, []);

  // API Call to get stats data
  const fetchStats = async () => {
    try {
      setLoading(true);
      
      const [careersRes, bookingsRes] = await Promise.all([
        axios.get("http://localhost:5100/api/careers"),
        axios.get("http://localhost:5100/api/bookings"),
      ]);

      const applications = careersRes.data?.applications || [];
      const bookings = bookingsRes.data?.bookings || [];

      // Set the statistics data
      setStats({
        total: applications.length,
        hired: applications.filter((app) => app.status === "hired").length,
        pending: applications.filter((app) => app.status === "pending").length,
        bookingsCount: bookings.filter(
          (booking) => booking.status === "pending" || booking.status === "assigned"
        ).length,
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    socket.on("newBooking", (booking) => {
      console.log("New Booking:", booking);
      
      alert(
        `🔔 New Booking\n\n${booking.name}\n${booking.problem}`
      );

  
      fetchStats();
    });

    return () => {
      socket.off("newBooking");
    };
  }, []);

  // Show loading indicator 
  if (loading) {
    return (
      <div className="flex items-center gap-2 text-xs font-bold text-text-dark/50">
        <svg className="animate-spin h-4 w-4 text-primary-maroon" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <span>Updating Dashboard Data...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Statistics Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Active Bookings" value={stats.bookingsCount} icon={<FiCalendar />} />
        <StatCard title="Total Applicants" value={stats.total} icon={<FiUsers />} />
        <StatCard title="Technicians Hired" value={stats.hired} icon={<FiCheckCircle />} />
        <StatCard title="Pending Review" value={stats.pending} icon={<FiClock />} />
      </div>

      {/* Welcome Banner */}
      <div className="bg-card-bg p-8 rounded-3xl shadow-md border border-border-subtle">
        <h3 className="font-extrabold flex items-center gap-2 text-text-dark text-base tracking-tight">
          <FiShield className="text-primary-maroon" /> Welcome Administrator
        </h3>
        <p className="mt-2 text-xs md:text-sm text-text-dark/60 font-light leading-relaxed">
          Manage service bookings, review technician job registrations, and manage the services catalog options from here.
        </p>
      </div>
    </div>
  );
};

// Reusable StatCard Component
const StatCard = ({ title, value, icon }) => {
  return (
    <div className="bg-card-bg p-6 rounded-2xl border border-border-subtle shadow-sm flex items-center gap-4 hover:shadow-md transition-all duration-200">
      <div className="w-12 h-12 rounded-xl bg-primary-maroon/5 flex items-center justify-center text-primary-maroon text-xl font-bold">
        {icon}
      </div>
      <div>
        <p className="text-[10px] font-bold text-text-dark/45 uppercase tracking-wider">{title}</p>
        <h2 className="text-xl font-extrabold text-text-dark mt-0.5 tracking-tight">{value}</h2>
      </div>
    </div>
  );
};

export default DashboardOverview;
