import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/css/Footer.css";

function Footer() {
  return (
    <footer className="weku-footer d-flex justify-content-between align-items-center px-5 py-3 bg-white shadow-sm">
      {/* Logo */}
      <div className="weku-logo-footer">WeKu</div>

      {/* Copyright text */}
      <div className="weku-copyright">
        © 2026 WeKu Premium Guest Management. All rights reserved.
      </div>

      {/* Links */}
      <div className="d-flex gap-4">
        <a href="#" className="weku-link text-decoration-underline">
          Privacy Policy
        </a>
        <a href="#" className="weku-link text-decoration-underline">
          Terms of Service
        </a>
        <a href="#" className="weku-link text-decoration-underline">
          Contact Us
        </a>
      </div>
    </footer>
  );
}

export default Footer;