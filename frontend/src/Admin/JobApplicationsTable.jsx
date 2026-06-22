import React, { useState, useEffect } from "react";
import axios from "axios";
import { FiSearch, FiFilter, FiPhone, FiMail, FiCalendar, FiBriefcase, FiCheck, FiX, FiCheckCircle } from "react-icons/fi";

const SPECIALIZATIONS_MAP = {
  ac: "AC Repair & Installation",
  refrigerator: "Refrigerator Servicing",
  washing_machine: "Washing Machine Repair",
  ro_purifier: "RO Water Purifier Servicing"
};

const JobApplicationsTable = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedApp, setSelectedApp] = useState(null);

  const fetchApplications = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get("http://localhost:5100/api/careers");
      if (res.data && res.data.success) {
        setApplications(res.data.applications);
        if (res.data.applications.length > 0) {
          setSelectedApp(res.data.applications[0]);
        }
      }
    } catch (err) {
      console.error("Fetch Applications Error:", err);
      setError("Failed to load applications. Please make sure the backend server is running.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      const res = await axios.patch(`http://localhost:5100/api/careers/${id}/status`, {
        status: newStatus
      });
      if (res.data && res.data.success) {
        // Update local state
        setApplications(prev => prev.map(app => app._id === id ? { ...app, status: newStatus } : app));
        if (selectedApp && selectedApp._id === id) {
          setSelectedApp(prev => ({ ...prev, status: newStatus }));
        }
      }
    } catch (err) {
      console.error("Update Status Error:", err);
      alert("Failed to update status.");
    }
  };

  const filteredApps = applications.filter(app => {
    const matchesSearch = app.fullName.toLowerCase().includes(search.toLowerCase()) || 
                          (app.email && app.email.toLowerCase().includes(search.toLowerCase())) ||
                          app.phone.includes(search);
    const matchesStatus = statusFilter === "All" || app.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    if (status === "pending") {
      return "bg-amber-100 text-amber-800 border-amber-200";
    } else if (status === "reviewed") {
      return "bg-blue-100 text-blue-800 border-blue-200";
    } else if (status === "contacted") {
      return "bg-purple-100 text-purple-800 border-purple-200";
    } else if (status === "rejected") {
      return "bg-rose-100 text-rose-800 border-rose-200";
    } else if (status === "hired") {
      return "bg-green-100 text-green-800 border-green-200";
    } else {
      return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="space-y-6 font-sans">
      
      {/* Search and Filters */}
      <div className="bg-white p-5 rounded-2xl border border-border-subtle shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
        
        {/* Search */}
        <div className="relative w-full md:max-w-xs">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search by name or contact..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="block w-full pl-11 pr-4 py-2.5 border border-border-subtle rounded-2xl bg-bg-ivory text-xs text-text-dark outline-none focus:ring-1 focus:ring-primary-maroon/35 transition-all"
          />
        </div>

        {/* Status Filters */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <span className="text-xs text-text-dark/70 font-bold flex items-center gap-1.5 mr-2">
            <FiFilter /> Status:
          </span>
          {["All", "pending", "reviewed", "contacted", "rejected", "hired"].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer capitalize ${
                statusFilter === status
                  ? "bg-primary-maroon text-white"
                  : "bg-bg-ivory text-text-dark border border-border-subtle hover:bg-gray-100"
              }`}
            >
              {status}
            </button>
          ))}
        </div>

      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 space-y-4">
          <svg className="animate-spin h-8 w-8 text-primary-maroon" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span className="text-xs text-text-dark/65 font-bold">Loading Job Applications...</span>
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 p-6 rounded-2xl text-center text-xs font-semibold text-red-700">
          ⚠️ {error}
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          
          {/* Applications List */}
          <div className="bg-white rounded-3xl border border-border-subtle shadow-md overflow-hidden lg:col-span-2">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-border-subtle">
                <thead className="bg-bg-ivory/70 text-left text-xs font-bold text-text-dark/75 uppercase tracking-wider">
                  <tr>
                    <th className="px-6 py-4.5">Technician</th>
                    <th className="px-6 py-4.5">Exp</th>
                    <th className="px-6 py-4.5">Status</th>
                    <th className="px-6 py-4.5">Applied Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-subtle text-sm text-text-dark">
                  {filteredApps.map((app) => (
                    <tr 
                      key={app._id}
                      onClick={() => setSelectedApp(app)}
                      className={`hover:bg-bg-ivory/20 cursor-pointer transition-colors ${
                        selectedApp && selectedApp._id === app._id ? "bg-primary-maroon/5 font-semibold" : ""
                      }`}
                    >
                      {/* Technician */}
                      <td className="px-6 py-4.5 flex items-center gap-3">
                        <div className="h-9 w-9 rounded-full bg-primary-maroon text-secondary-yellow font-bold text-xs flex items-center justify-center">
                          {app.fullName.substring(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <div className="font-bold text-text-dark">{app.fullName}</div>
                          <div className="text-xs text-text-dark/50">{app.phone}</div>
                        </div>
                      </td>
                      {/* Exp */}
                      <td className="px-6 py-4.5 font-semibold text-text-dark">
                        {app.experience} yrs
                      </td>
                      {/* Status */}
                      <td className="px-6 py-4.5">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase border capitalize tracking-wider ${getStatusColor(app.status)}`}>
                          {app.status}
                        </span>
                      </td>
                      {/* Date */}
                      <td className="px-6 py-4.5 text-xs text-text-dark/55">
                        {new Date(app.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                  {filteredApps.length === 0 && (
                    <tr>
                      <td colSpan="4" className="px-6 py-12 text-center text-text-dark/65 font-medium">
                        No technician applications found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Details Card Panel */}
          {selectedApp && (
            <div className="bg-white rounded-3xl border border-border-subtle shadow-md p-6 space-y-6">
              <div className="text-center space-y-2 border-b border-border-subtle pb-6">
                <div className="h-16 w-16 mx-auto rounded-full bg-primary-maroon text-secondary-yellow flex items-center justify-center font-extrabold text-lg shadow-md border-2 border-secondary-yellow">
                  {selectedApp.fullName.substring(0, 2).toUpperCase()}
                </div>
                <h3 className="text-base font-extrabold text-text-dark">{selectedApp.fullName}</h3>
                <span className={`inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-[10px] font-extrabold border uppercase tracking-wider capitalize ${getStatusColor(selectedApp.status)}`}>
                  {selectedApp.status}
                </span>
              </div>

              {/* Contact info */}
              <div className="space-y-3">
                <h4 className="font-extrabold text-text-dark/70 uppercase tracking-wider text-[10px]">Contact Info</h4>
                <div className="space-y-2.5 bg-bg-ivory p-3.5 rounded-2xl border border-border-subtle text-xs">
                  <div className="flex items-center gap-2"><FiPhone className="text-primary-maroon" /> {selectedApp.phone}</div>
                  {selectedApp.email && (
                    <div className="flex items-center gap-2"><FiMail className="text-primary-maroon" /> {selectedApp.email}</div>
                  )}
                  <div className="flex items-center gap-2"><FiBriefcase className="text-primary-maroon" /> {selectedApp.experience} Years Experience</div>
                </div>
              </div>

              {/* Specializations */}
              <div className="space-y-2.5">
                <h4 className="font-extrabold text-text-dark/70 uppercase tracking-wider text-[10px]">Specializations</h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedApp.specialization.map((spec, i) => (
                    <span key={i} className="text-[10px] font-bold bg-bg-ivory border border-border-subtle text-text-dark/85 px-2.5 py-1 rounded-xl">
                      {SPECIALIZATIONS_MAP[spec] || spec}
                    </span>
                  ))}
                </div>
              </div>

              {/* Notes */}
              {selectedApp.notes && (
                <div className="space-y-2">
                  <h4 className="font-extrabold text-text-dark/70 uppercase tracking-wider text-[10px]">Experience Details</h4>
                  <p className="text-xs text-text-dark/65 leading-relaxed bg-bg-ivory p-3 rounded-2xl border border-border-subtle">
                    {selectedApp.notes}
                  </p>
                </div>
              )}

              {/* Status Action Buttons */}
              <div className="pt-4 border-t border-border-subtle space-y-3">
                <h4 className="font-extrabold text-text-dark/70 uppercase tracking-wider text-[10px]">Review Actions</h4>
                
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => handleStatusUpdate(selectedApp._id, "reviewed")}
                    className="flex items-center justify-center gap-1.5 py-2.5 bg-bg-ivory hover:bg-gray-100 text-text-dark border border-border-subtle font-bold text-xs rounded-xl cursor-pointer transition-colors"
                  >
                    Reviewed
                  </button>
                  <button
                    onClick={() => handleStatusUpdate(selectedApp._id, "contacted")}
                    className="flex items-center justify-center gap-1.5 py-2.5 bg-bg-ivory hover:bg-gray-100 text-text-dark border border-border-subtle font-bold text-xs rounded-xl cursor-pointer transition-colors"
                  >
                    Contacted
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => handleStatusUpdate(selectedApp._id, "hired")}
                    className="flex items-center justify-center gap-1.5 py-2.5 bg-green-600 hover:bg-green-700 text-white font-bold text-xs rounded-xl cursor-pointer transition-colors shadow-sm"
                  >
                    <FiCheckCircle /> Hire
                  </button>
                  <button
                    onClick={() => handleStatusUpdate(selectedApp._id, "rejected")}
                    className="flex items-center justify-center gap-1.5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl cursor-pointer transition-colors shadow-sm"
                  >
                    <FiX /> Reject
                  </button>
                </div>
              </div>

            </div>
          )}

        </div>
      )}

    </div>
  );
};

export default JobApplicationsTable;
