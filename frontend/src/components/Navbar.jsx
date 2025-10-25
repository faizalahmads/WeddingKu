import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Logo from "../assets/icons/Logo.svg";
import "../assets/css/Navbar.css";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  const handleLogout = async () => {
    await fetch("http://localhost:5000/api/logout", {
      method: "POST",
      credentials: "include",
    });

    localStorage.clear();
    localStorage.setItem("logoutMessage", "Logout berhasil!");
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;

  const getNavbarClass = () => {
    switch (role) {
      case "super_admin":
        return "navbar-super-admin";
      case "admin":
        return "navbar-admin";
      case "penerima_tamu":
        return "navbar-tamu";
      default:
        return "navbar-default";
    }
  };

  return (
    <nav className={`navbar navbar-expand-lg border-bottom shadow-sm py-3 ${getNavbarClass()}`}>
      <div className="navbar-wrapper d-flex align-items-center justify-content-start gap-4 w-100">
        {/* Logo */}
        <Link to="/" className="navbar-logo"> <img src={Logo} alt="Wedding Ku" className="img-fluid" />
        </Link>
        {/* Menu berdasarkan role */}
        <div className="navbar-links d-flex align-items-center gap-3">
          {role === "super_admin" && (
            <>
              <Link to="/dashboard/super" className={`nav-item ${isActive("/dashboard/super") ? "active" : ""}`}>
                <div className="nav-text">Dashboard</div>
              </Link>
              <Link to="/dashboard/tema" className={`nav-item ${isActive("/dashboard/tema") ? "active" : ""}`}>
                <div className="nav-text">Tema</div>
              </Link>
              <Link to="/dashboard/user" className={`nav-item ${isActive("/dashboard/user") ? "active" : ""}`}>
                <div className="nav-text">User</div>
              </Link>
              <Link to="/dashboard/laporan" className={`nav-item ${isActive("/dashboard/laporan") ? "active" : ""}`}>
                <div className="nav-text">Laporan</div>
              </Link>
              <Link to="/dashboard/pengaturan" className={`nav-item ${isActive("/dashboard/pengaturan") ? "active" : ""}`}>
                <div className="nav-text">Pengaturan</div>
              </Link>
            </>
          )}

          {role === "admin" && (
            <>
              <Link to="/admin/dashboard" className={`nav-item ${isActive("/admin/dashboard") ? "active" : ""}`}>
                <div className="nav-text">Dashboard</div>
              </Link>
              <Link to="/admin/undangan-saya" className={`nav-item ${isActive("/admin/undangan-saya") ? "active" : ""}`}>
                <div className="nav-text">Undangan Saya</div>
              </Link>
              <Link to="/admin/data-tamu" className={`nav-item ${isActive("/admin/data-tamu") ? "active" : ""}`}>
                <div className="nav-text">Data Tamu</div>
              </Link>
              <Link to="/admin/buku-tamu" className={`nav-item ${isActive("/admin/buku-tamu") ? "active" : ""}`}>
                <div className="nav-text">Buku Tamu</div>
              </Link>
              <Link to="/admin/checkin" className={`nav-item ${isActive("/admin/checkin") ? "active" : ""}`}>
                <div className="nav-text">Check-in</div>
              </Link>
            </>
          )}

          {role === "penerima_tamu" && (
            <>
              <Link to="/checkin" className={`nav-item ${isActive("/checkin") ? "active" : ""}`}>
                <div className="nav-text">Check-in</div>
              </Link>
              <Link to="/daftar-hadir" className={`nav-item ${isActive("/daftar-hadir") ? "active" : ""}`}>
                <div className="nav-text">Daftar Hadir</div>
              </Link>
            </>
          )}
        </div>

        {/* Logout */}
        <button
          className="btn btn-link text-decoration-none fw-bold ms-auto logout-btn"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
