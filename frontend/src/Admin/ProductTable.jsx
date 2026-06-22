import React, { useState } from "react";
import { FiSearch, FiFilter, FiPlus, FiBriefcase, FiTrash2 } from "react-icons/fi";

const initialServices = [
  { id: 1, name: "AC Split General Service", category: "AC Service", price: 599, duration: "1 Hour", status: "Active" },
  { id: 2, name: "AC Split Installation", category: "AC Service", price: 1499, duration: "2.5 Hours", status: "Active" },
  { id: 3, name: "AC Leak Repair & Gas Charging", category: "AC Service", price: 2499, duration: "2 Hours", status: "Active" },
  { id: 4, name: "Single Door Refrigerator Repair", category: "Refrigerator", price: 499, duration: "1.5 Hours", status: "Active" },
  { id: 5, name: "Washing Machine Drum Replacement", category: "Washing Machine", price: 1899, duration: "3 Hours", status: "Active" },
  { id: 6, name: "RO Water Purifier Filter Change", category: "RO Purifier", price: 799, duration: "1 Hour", status: "Active" }
];

const ProductTable = () => {
  const [services, setServices] = useState(initialServices);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");

  const filteredServices = services.filter((s) => {
    const matchesSearch = s.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === "All" || s.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6 font-sans">
      
      {/* Search and Filters */}
      <div className="bg-white p-5 rounded-2xl border border-border-subtle shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
        
        {/* Search */}
        <div className="relative w-full md:max-w-xs">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search services..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="block w-full pl-11 pr-4 py-2.5 border border-border-subtle rounded-2xl bg-bg-ivory text-xs text-text-dark outline-none focus:ring-1 focus:ring-primary-maroon/35 transition-all"
          />
        </div>

        {/* Categories */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <span className="text-xs text-text-dark/70 font-bold flex items-center gap-1.5 mr-2">
            <FiFilter /> Category:
          </span>
          {["All", "AC Service", "Refrigerator", "Washing Machine", "RO Purifier"].map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                categoryFilter === cat
                  ? "bg-primary-maroon text-white"
                  : "bg-bg-ivory text-text-dark border border-border-subtle hover:bg-gray-100"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

      </div>

      {/* Services Table Card */}
      <div className="bg-white rounded-3xl border border-border-subtle shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-border-subtle">
            <thead className="bg-bg-ivory/70 text-left text-xs font-bold text-text-dark/75 uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4.5">Service Details</th>
                <th className="px-6 py-4.5">Category</th>
                <th className="px-6 py-4.5">Price</th>
                <th className="px-6 py-4.5">Duration</th>
                <th className="px-6 py-4.5">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle text-sm text-text-dark">
              {filteredServices.map((service) => (
                <tr key={service.id} className="hover:bg-bg-ivory/30 transition-colors">
                  {/* Service Details */}
                  <td className="px-6 py-4.5 flex items-center gap-3">
                    <div className="h-9 w-9 rounded-xl bg-primary-maroon/10 text-primary-maroon flex items-center justify-center">
                      <FiBriefcase className="h-4.5 w-4.5" />
                    </div>
                    <div>
                      <div className="font-bold text-text-dark">{service.name}</div>
                      <div className="text-xs text-text-dark/50 font-mono">#SRV-{service.id.toString().padStart(3, "0")}</div>
                    </div>
                  </td>
                  {/* Category */}
                  <td className="px-6 py-4.5">
                    <span className="text-xs font-bold bg-bg-ivory px-3 py-1 border border-border-subtle rounded-xl text-text-dark/85">
                      {service.category}
                    </span>
                  </td>
                  {/* Price */}
                  <td className="px-6 py-4.5 font-extrabold text-primary-maroon">
                    ₹{service.price}
                  </td>
                  {/* Duration */}
                  <td className="px-6 py-4.5 text-xs text-text-dark/65 font-medium">
                    {service.duration}
                  </td>
                  {/* Status */}
                  <td className="px-6 py-4.5">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-green-100 text-green-800 border border-green-200">
                      {service.status}
                    </span>
                  </td>
                </tr>
              ))}
              {filteredServices.length === 0 && (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center text-text-dark/65 font-medium">
                    No services found matching your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default ProductTable;
