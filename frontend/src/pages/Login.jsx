import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/css/App.css";
import Footer from "../components/Footer";
import axios from "axios";
import EyeIcon from "../assets/icons/eye-black.svg";
import EyeOffIcon from "../assets/icons/eye-off-black.svg";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const togglePassword = () => setShowPassword(!showPassword);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await axios.post("http://localhost:5000/auth/login", formData);
      const { token, user } = res.data;

      const now = new Date().getTime(); // waktu login sekarang

      localStorage.setItem("token", token);
      localStorage.setItem("role", user.role);
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("admin_id", user.id);
      localStorage.setItem("loginTime", now); // ⏰ simpan waktu login

      if (user.role === "super_admin") {
        navigate("/dashboard/super");
      } else {
        navigate("/admin/dashboard");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login gagal. Coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <main className="flex-grow-1 d-flex justify-content-center align-items-center">
        <div className="auth-container p-4">
          <h2 className="text-center fw-bold fs-2 auth-title mb-4">Masuk</h2>

          {error && (
            <div className="alert alert-danger py-2 text-center">{error}</div>
          )}

          <form onSubmit={handleSubmit} className="d-flex flex-column gap-4">
            <input
              type="email"
              name="email"
              className="auth-input"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />

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
                onClick={togglePassword}
                style={{ cursor: "pointer" }}
              >
                <img
                  src={showPassword ? EyeOffIcon : EyeIcon}
                  alt="Toggle password visibility"
                  width="20"
                  height="20"
                  className={`eye-icon ${showPassword ? "fade-in" : "fade-out"}`}
                />
              </span>
            </div>

            <div className="text-end">
              <Link
                to="/forgot"
                className="text-danger text-decoration-none small"
              >
                Lupa password?
              </Link>
            </div>

            <button
              type="submit"
              className="btn btn-dark w-100 py-2 fw-semibold"
              disabled={loading}
            >
              {loading ? "Memproses..." : "Masuk"}
            </button>

            <p className="text-center small mt-2">
              Belum ada akun?{" "}
              <Link
                to="/register"
                className="text-danger fw-semibold text-decoration-none"
              >
                Daftar
              </Link>
            </p>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Login;
