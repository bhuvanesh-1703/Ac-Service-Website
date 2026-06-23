import React from "react";
import { FiGrid, FiUsers, FiBriefcase, FiSettings, FiLogOut, FiCalendar } from "react-icons/fi";
import { useNavigate, useLocation } from "react-router-dom";

const Sidebar = ({ onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { id: "dashboard", path: "/admin", label: "Dashboard", icon: FiGrid },
    { id: "bookings", path: "/admin/bookings", label: "Service Bookings", icon: FiCalendar },
    { id: "applications", path: "/admin/applications", label: "Job Applications", icon: FiUsers },
    { id: "products", path: "/admin/products", label: "Services Catalog", icon: FiBriefcase },
    { id: "settings", path: "/admin/settings", label: "Settings", icon: FiSettings },
  ];

  return (
    <aside className="w-64 h-screen bg-primary-maroon text-white flex flex-col justify-between fixed left-0 top-0 border-r border-primary-maroon-dark/20 shadow-xl select-none z-30">
      <div>
        {/* Brand Header */}
        <div className="h-20 flex items-center gap-2 px-6 border-b border-primary-maroon-dark bg-primary-maroon-dark/20">
          <FiBriefcase className="h-6 w-6 text-secondary-yellow" />
          <span className="font-extrabold text-lg text-secondary-yellow tracking-wider uppercase font-sans">
            V&V Admin
          </span>
        </div>

        {/* Navigation Links */}
        <nav className="px-4 py-8 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            
            // Check if current path matches the item path
            // For dashboard, we match exactly "/admin" or "/admin/"
            const isActive = item.path === "/admin" 
              ? location.pathname === "/admin" || location.pathname === "/admin/"
              : location.pathname.startsWith(item.path);

            return (
              <button
                key={item.id}
                onClick={() => navigate(item.path)}
                className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-secondary-yellow text-primary-maroon shadow-md shadow-black/10"
                    : "text-white/80 hover:bg-primary-maroon-dark hover:text-white"
                }`}
              >
                <Icon className={`h-4.5 w-4.5 ${isActive ? "text-primary-maroon" : "text-secondary-yellow"}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer Profile & Logout */}
      <div className="p-4 border-t border-primary-maroon-dark bg-primary-maroon-dark/10 space-y-4">
        <button
          onClick={onLogout}
          className="w-full flex items-center justify-center gap-2 py-2.5 border border-secondary-yellow/20 hover:border-secondary-yellow/45 text-secondary-yellow hover:text-white font-bold text-xs rounded-xl transition-all cursor-pointer"
        >
          <FiLogOut className="h-4 w-4" /> Sign Out
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
