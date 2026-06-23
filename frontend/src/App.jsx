import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

// Layout components
import Navbar from "./Layout/Navbar";
import Footer from "./Layout/Footer";

// Public Pages
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import JoinTeam from "./pages/JoinTeam";
import Login from "./validation/Login";
import Register from "./validation/Register";

// Chat component
import AiChat from "./components/chat/AiChat";

// Admin Layout & Pages
import AdminLayout from "./Layout/AdminLayout";
import DashboardOverview from "./admin/DashboardOverview";
import BookingsTable from "./admin/BookingsTable";
import JobApplicationsTable from "./admin/JobApplicationsTable";
import ProductTable from "./admin/ProductTable";
import SettingsView from "./admin/SettingsView";

import { FiArrowUp } from "react-icons/fi";
import { AnimatePresence, motion } from "framer-motion";

function App() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <div className="relative min-h-screen bg-bg-ivory text-text-dark selection:bg-primary-maroon selection:text-white overflow-x-hidden font-sans">
      
      {!isAdminRoute && <Navbar />}

      <main>
        <Routes>
          {/* Public Customer Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/join-our-team" element={<JoinTeam />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
          
          {/* Protected Admin Routes */}
          <Route path="/admin" element={<AdminLayout onLogout={() => { localStorage.clear(); window.location.href = "/"; }} />}>
            <Route index element={<DashboardOverview />} />
            <Route path="bookings" element={<BookingsTable />} />
            <Route path="applications" element={<JobApplicationsTable />} />
            <Route path="products" element={<ProductTable />} />
            <Route path="settings" element={<SettingsView />} />
          </Route>
        </Routes>
      </main>

      {!isAdminRoute && <Footer />}
      {!isAdminRoute && <AiChat />}

      {/* Scroll to top floating button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            onClick={scrollToTop}
            className="fixed bottom-24 right-7 z-50 w-12 h-12 bg-primary-maroon hover:bg-primary-maroon-dark text-white rounded-full border border-primary-maroon-dark/20 shadow-xl flex items-center justify-center cursor-pointer transform hover:-translate-y-1 transition-all duration-200 focus:outline-none"
            aria-label="Scroll to top"
            id="btn-scroll-to-top"
          >
            <FiArrowUp className="w-5 h-5 font-extrabold text-secondary-yellow" />
          </motion.button>
        )}
      </AnimatePresence>

    </div>
  );
}

export default App;
