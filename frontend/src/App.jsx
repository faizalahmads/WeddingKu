import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useParams, useNavigate } from "react-router-dom";
import '@fontsource/pacifico';
import '@fontsource/platypi';
import '@fontsource/poppins';
import '@fontsource/pt-sans-caption';
import '@fontsource/playfair-display-sc';

import ProtectedRoute from "./components/ProtectedRoute.jsx";
import InvitePage from "./pages/InvitePage.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Dashboard from "./pages/admin/Dashboard.jsx";
import DataTamu from "./pages/admin/DataTamu.jsx";
import Undangan from "./pages/Undangan.jsx";
import UndanganSaya from "./pages/admin/UndanganSaya.jsx";
import ManageInvite from "./pages/admin/ManageInvite.jsx";
import UndanganManagement from "./pages/admin/UndanganManagement.jsx";
import EditInvite from "./pages/admin/EditInvite.jsx";
import PreviewTema from "./pages/admin/PreviewTema.jsx";

// ==========================
// ✅ Wrapper untuk rute undangan
// ==========================
function InviteWrapper() {
  const { code } = useParams();
  return <InvitePage code={code} />;
}

function AppContent() {
  const navigate = useNavigate();

  useEffect(() => {
    const MAX_IDLE_TIME = 3 * 60 * 60 * 1000; // 3 jam

    const checkIdle = () => {
      const loginTime = localStorage.getItem("loginTime");
      const now = new Date().getTime();
      if (!loginTime) return;

      const diff = now - parseInt(loginTime, 10);

      if (diff > MAX_IDLE_TIME) {
        // Hapus semua data login
        ["token", "role", "isAuthenticated", "admin_id", "loginTime"].forEach(key =>
          localStorage.removeItem(key)
        );
        alert("Sesi Anda telah berakhir karena tidak aktif selama 3 jam.");
        navigate("/login");
      }
    };

    const resetTimer = () => {
      localStorage.setItem("loginTime", new Date().getTime());
    };

    // Deteksi aktivitas
    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("keypress", resetTimer);
    window.addEventListener("click", resetTimer);
    window.addEventListener("scroll", resetTimer);

    const interval = setInterval(checkIdle, 60 * 1000); // cek tiap menit

    return () => {
      clearInterval(interval);
      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("keypress", resetTimer);
      window.removeEventListener("click", resetTimer);
      window.removeEventListener("scroll", resetTimer);
    };
  }, [navigate]);

  return (
    <Routes>
      {/* Halaman publik */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Halaman yang butuh login */}
      <Route element={<ProtectedRoute />}>
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/data-tamu" element={<DataTamu />} />
        <Route path="/admin/undangan-saya" element={<UndanganSaya />} />
        <Route path="/admin/manage-invite" element={<ManageInvite />} />
        <Route path="/admin/undangan-management" element={<UndanganManagement />} />
        <Route path="/admin/edit-invite/:id" element={<EditInvite />} />
        <Route path="/undangan/:slug" element={<Undangan />} />
        <Route path="/:slug" element={<Undangan />} />
        <Route path="/preview/:id" element={<PreviewTema />} />
        <Route path="/preview-undangan/:id" element={<PreviewTema />} />
        <Route path="/invite/:code" element={<InviteWrapper />} />
      </Route>
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
