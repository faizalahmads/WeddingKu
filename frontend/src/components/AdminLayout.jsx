import { useState, useEffect } from "react";
import Navbar from "../components/Navbar.jsx";
import Sidebar from "../components/Sidebar.jsx";
import "../assets/css/AdminLayout.css";

const BREAKPOINT = 768;

const AdminLayout = ({ children, role }) => {
  // Sidebar defaultnya SELALU tertutup.
  // Di desktop ia memang di-hide total lewat CSS (lihat Sidebar.css),
  // jadi state ini cuma relevan saat layar mobile.
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      // Kalau balik ke desktop, pastikan state direset
      // supaya saat kembali ke mobile nanti, sidebar mulai dari tertutup.
      if (window.innerWidth >= BREAKPOINT) {
        setSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  return (
    <div className="admin-layout">
      <Navbar role={role} onToggleSidebar={toggleSidebar} />

      <div className="admin-body">
        <Sidebar isOpen={sidebarOpen} />

        {/* Backdrop hanya relevan saat sidebar overlay terbuka (mobile) */}
        {sidebarOpen && (
          <div className="sidebar-backdrop" onClick={toggleSidebar} />
        )}

        <main className="admin-content">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
