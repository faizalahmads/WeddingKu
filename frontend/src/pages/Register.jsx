import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/css/App.css";
import Footer from "../components/Footer";
import axios from "axios";
import EyeIcon from "../assets/icons/eye-black.svg";
import EyeOffIcon from "../assets/icons/eye-off-black.svg";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "admin",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Password dan konfirmasi tidak sama.");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/auth/register", formData);
      alert("Registrasi berhasil! Silakan login.");
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Terjadi kesalahan saat registrasi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <main className="flex-grow-1 d-flex justify-content-center align-items-center">
        <div className="auth-container p-4">
          <h2 className="text-center fw-bold fs-2 auth-title">Daftar</h2>

          {/* Pesan error */}
          {error && (
            <div className="alert alert-danger py-2 text-center">{error}</div>
          )}

          <form onSubmit={handleSubmit} className="d-flex flex-column gap-4">
            {/* Nama */}
            <input
              type="text"
              name="name"
              className="auth-input"
              placeholder="Nama lengkap"
              value={formData.name}
              onChange={handleChange}
              required
            />

            {/* Email */}
            <input
              type="email"
              name="email"
              className="auth-input"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            {/* Password */}
            <div className="position-relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                className="auth-input"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <span
                className="position-absolute end-0 top-50 translate-middle-y me-2 eye-toggle"
                onClick={() => setShowPassword(!showPassword)}
                style={{ cursor: "pointer" }}
              >
                <img
                  src={showPassword ? EyeOffIcon : EyeIcon}
                  alt="Toggle password"
                  width="20"
                  height="20"
                  className={`eye-icon ${showPassword ? "fade-in" : "fade-out"}`}
                />
              </span>
            </div>

            {/* Konfirmasi Password */}
            <div className="position-relative">
              <input
                type={showConfirm ? "text" : "password"}
                name="confirmPassword"
                className="auth-input"
                placeholder="Ulangi Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
              <span
                className="position-absolute end-0 top-50 translate-middle-y me-2 eye-toggle"
                onClick={() => setShowConfirm(!showConfirm)}
                style={{ cursor: "pointer" }}
              >
                <img
                  src={showConfirm ? EyeOffIcon : EyeIcon}
                  alt="Toggle confirm password"
                  width="20"
                  height="20"
                  className={`eye-icon ${showConfirm ? "fade-in" : "fade-out"}`}
                />
              </span>
            </div>

            {/* Tombol Submit */}
            <button
              type="submit"
              className="btn btn-dark w-100 fw-semibold py-2"
              disabled={loading}
            >
              {loading ? "Mendaftar..." : "Daftar"}
            </button>

            {/* Link ke Login */}
            <p className="text-center small mt-2">
              Sudah memiliki akun?{" "}
              <Link
                to="/login"
                className="text-danger fw-semibold text-decoration-none"
              >
                Login
              </Link>
            </p>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Register;
