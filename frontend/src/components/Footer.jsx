import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/css/Footer.css";

const Footer = () => {
  const role = localStorage.getItem("role");

  const getFooterClass = () => {
    switch (role) {
      case "super_admin":
        return "footer-super-admin";
      case "admin":
        return "footer-admin";
      case "penerima_tamu":
        return "footer-tamu";
      default:
        return "footer-default";
    }
  };

  return (
    <footer className={`text-center py-3 border-top mt-auto ${getFooterClass()}`}>
      <p className="mb-0 small">
        Powered by <span className="fw-semibold">WeKu</span>
      </p>
    </footer>
  );
};

export default Footer;
