import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import "../assets/css/Navbar.css";

const Navbar = ({ role, onToggleSidebar }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await fetch(`${import.meta.env.VITE_APP_URL}/api/logout`, {
      method: "POST",
      credentials: "include",
    });

    localStorage.clear();
    localStorage.setItem("logoutMessage", "Logout berhasil!");
    navigate("/login");
  };

  const isActive = (...paths) =>
    paths.some((path) => location.pathname.startsWith(path));

  const tabsByRole = {
    admin: [
      { to: "/admin/dashboard", label: "Dashboard" },
      {
        to: "/admin/undangan-saya",
        label: "My Invitation",
        extra: "/admin/manage-invite",
      },
      { to: "/admin/data-tamu", label: "Guest List" },
      { to: "/admin/checkin", label: "Scanner" },
    ],
    super_admin: [
      { to: "/dashboard/super", label: "Dashboard" },
      { to: "/dashboard/tema", label: "Tema" },
      { to: "/dashboard/user", label: "User" },
      { to: "/dashboard/laporan", label: "Laporan" },
      { to: "/dashboard/pengaturan", label: "Pengaturan" },
    ],
    penerima_tamu: [
      { to: `/checkin${location.search}`, label: "Check-in" },
      { to: `/buku-tamu${location.search}`, label: "Buku Tamu" },
    ],
  };

  const tabs = tabsByRole[role] || [];

  return (
    <header className="admin-navbar">
      {/* Hamburger -> toggle SIDEBAR, bukan nav-links sendiri */}
      <button
        className="hamburger-btn"
        onClick={onToggleSidebar}
        aria-label="Toggle sidebar"
        type="button"
      >
        <FaBars size={18} />
      </button>

      <Link to="/admin/dashboard" className="weku-logo text-decoration-none">
        WeKu
      </Link>

      <nav className="nav-tabs-wrapper">
        {tabs.map((tab) => (
          <Link
            key={tab.to}
            to={tab.to}
            className={`nav-tab-item ${
              isActive(tab.to, tab.extra) ? "active" : ""
            }`}
          >
            {tab.label}
          </Link>
        ))}
      </nav>

      <div className="navbar-avatar">
        <button
          className="btn btn-link text-decoration-none fw-bold p-0"
          onClick={handleLogout}
          type="button"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Navbar;
