import React, { useState, useEffect } from "react";
import axios from "axios";
import swal from "sweetalert";
import { FiSearch, FiFilter, FiPhone, FiMapPin, FiCalendar, FiUser, FiCheckCircle, FiXCircle } from "react-icons/fi";

const BookingsTable = () => {
  const [bookings, setBookings] = useState([]);
  const [technicians, setTechnicians] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const [bookingsRes, techsRes] = await Promise.all([
        axios.get("http://localhost:5100/api/bookings"),
        axios.get("http://localhost:5100/api/careers")
      ]);

      setBookings(bookingsRes.data.bookings);

      if (bookingsRes.data.bookings.length > 0) {
        setSelectedBooking(bookingsRes.data.bookings[0]);
      }

      if (techsRes.data && techsRes.data.success) {
        const hiredTechs = techsRes.data.applications.filter(a => a.status === "hired");
        setTechnicians(hiredTechs);
      }
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredBookings = bookings.filter((booking) => {
    const searchMatch =
      booking.name.toLowerCase().includes(search.toLowerCase()) ||
      booking.phone.includes(search) ||
      booking.problem.toLowerCase().includes(search.toLowerCase());

    const statusMatch =
      status === "All" || booking.status === status;

    return searchMatch && statusMatch;
  });

  const updateBooking = async (id, updates) => {
    try {
      await axios.patch(
        `http://localhost:5100/api/bookings/${id}`,
        updates
      );
      swal({
        title:"Success!",
        text:"Booking updated successfully!",
        icon:"success",
        button:"OK",
      });
      fetchData();
    } catch (error) {
      console.log(error);
      swal({
        title:"Error!",
        text:"Booking not updated!",
        icon:"error",
        button:"OK",
      });
    }
  };

  const getStatusColor = (statusText) => {
    switch (statusText) {
      case "pending": return "bg-amber-500/10 text-amber-400 border-amber-500/20";
      case "assigned": return "bg-blue-500/10 text-blue-400 border-blue-500/20";
      case "completed": return "bg-green-500/10 text-green-400 border-green-500/20";
      case "cancelled": return "bg-rose-500/10 text-rose-400 border-rose-500/20";
      default: return "bg-gray-500/10 text-gray-400 border-gray-500/20";
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 space-y-4">
        <svg className="animate-spin h-8 w-8 text-primary-maroon" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <span className="text-xs text-text-dark/65 font-bold">Loading Bookings...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6 font-sans">
      
      {/* Search and Filters */}
      <div className="bg-card-bg p-5 rounded-2xl border border-border-subtle shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
        
        {/* Search */}
        <div className="relative w-full md:max-w-xs">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search bookings..."
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
          {["All", "pending", "assigned", "completed", "cancelled"].map((s) => (
            <button
              key={s}
              onClick={() => setStatus(s)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer capitalize ${
                status === s
                  ? "bg-primary-maroon text-white"
                  : "bg-bg-ivory text-text-dark border border-border-subtle hover:bg-gray-100"
              }`}
            >
              {s}
            </button>
          ))}
        </div>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">

        {/* Left Side: Table */}
        <div className="bg-card-bg rounded-3xl border border-border-subtle shadow-md overflow-hidden lg:col-span-2">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-border-subtle text-left border-collapse">
              <thead className="bg-bg-ivory/70 text-xs font-bold text-text-dark/75 uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-4.5">Client Details</th>
                  <th className="px-6 py-4.5">Technician</th>
                  <th className="px-6 py-4.5">Status</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-border-subtle text-sm text-text-dark">
                {filteredBookings.map((booking) => (
                  <tr
                    key={booking._id}
                    onClick={() => setSelectedBooking(booking)}
                    className={`hover:bg-bg-ivory/20 cursor-pointer transition-colors ${
                      selectedBooking && selectedBooking._id === booking._id ? "bg-primary-maroon/5 font-semibold" : ""
                    }`}
                  >
                    <td className="px-6 py-4.5">
                      <div className="font-bold text-text-dark">{booking.name}</div>
                      <div className="text-xs text-text-dark/50 font-mono">{booking.phone}</div>
                    </td>
                    <td className="px-6 py-4.5 text-xs text-text-dark/80 font-bold">
                      {booking.technician || "System Assigned"}
                    </td>
                    <td className="px-6 py-4.5">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold border uppercase tracking-wider capitalize ${getStatusColor(booking.status)}`}>
                        {booking.status}
                      </span>
                    </td>
                  </tr>
                ))}
                {filteredBookings.length === 0 && (
                  <tr>
                    <td colSpan="3" className="px-6 py-12 text-center text-text-dark/65 font-medium">
                      No service bookings found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Side: Details Panel */}
        <div>
          {selectedBooking && (
            <div className="bg-card-bg rounded-3xl border border-border-subtle shadow-md p-6 space-y-6 sticky top-6">
              <div className="text-center space-y-2 border-b border-border-subtle pb-6">
                <span className="text-[10px] font-bold uppercase tracking-wider text-text-dark/40">Booking Summary</span>
                <h3 className="text-base font-extrabold text-text-dark">{selectedBooking.name}</h3>
                <span className={`inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-[10px] font-extrabold border uppercase tracking-wider capitalize ${getStatusColor(selectedBooking.status)}`}>
                  {selectedBooking.status}
                </span>
              </div>

              {/* Client Details */}
              <div className="space-y-3">
                <h4 className="font-extrabold text-text-dark/70 uppercase tracking-wider text-[10px]">Client Details</h4>
                <div className="space-y-2.5 bg-bg-ivory p-3.5 rounded-2xl border border-border-subtle text-xs">
                  <div className="flex items-center gap-2"><FiPhone className="text-primary-maroon" /> {selectedBooking.phone}</div>
                  <div className="flex items-start gap-2"><FiMapPin className="text-primary-maroon mt-0.5 shrink-0" /> <span className="leading-relaxed">{selectedBooking.address}</span></div>
                  {selectedBooking.createdAt && (
                    <div className="flex items-center gap-2"><FiCalendar className="text-primary-maroon" /> Booked {new Date(selectedBooking.createdAt).toLocaleDateString()}</div>
                  )}
                </div>
              </div>

              {/* Problem */}
              <div className="space-y-2.5">
                <h4 className="font-extrabold text-text-dark/70 uppercase tracking-wider text-[10px]">Reported Problem</h4>
                <div className="p-3 bg-bg-ivory border border-border-subtle rounded-2xl text-xs text-text-dark/85 leading-relaxed">
                  {selectedBooking.problem}
                </div>
              </div>

              {/* Technician Allocation */}
              <div className="space-y-3">
                <h4 className="font-extrabold text-text-dark/70 uppercase tracking-wider text-[10px] flex items-center gap-1"><FiUser /> Assigned Technician</h4>
                <div className="flex flex-col gap-2">
                  <select
                    className="w-full bg-bg-ivory border border-border-subtle text-xs font-bold rounded-2xl p-3 outline-none focus:ring-1 focus:ring-primary-maroon/35 cursor-pointer"
                    value={selectedBooking.technician || "System Assigned"}
                    onChange={(e) => updateBooking(selectedBooking._id, { technician: e.target.value, status: "assigned" })}
                  >
                    <option value="System Assigned">System Assigned</option>
                    {technicians.map((t) => (
                      <option key={t._id} value={t.fullName}>{t.fullName}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-4 border-t border-border-subtle flex gap-2">
                <button
                  className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-green-600 hover:bg-green-700 text-white font-bold text-xs rounded-xl cursor-pointer transition-colors shadow-sm"
                  onClick={() =>
                    updateBooking(selectedBooking._id, { status: "completed" })
                  }
                >
                  <FiCheckCircle /> Complete
                </button>

                <button
                  className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl cursor-pointer transition-colors shadow-sm"
                  onClick={() =>
                    updateBooking(selectedBooking._id, { status: "cancelled" })
                  }
                >
                  <FiXCircle /> Cancel
                </button>
              </div>
            </div>
          )}
        </div>

      </div>

    </div>
  );
};

export default BookingsTable;