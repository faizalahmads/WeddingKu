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

import ErrorBoundary from "./components/ErrorBoundary.jsx";
import ToastWrapper from "./components/ToastContainer.jsx";
import NotFound from "./pages/errors/NotFound.jsx";
import NetworkError from "./pages/errors/NetworkError.jsx";
import { toast } from "react-toastify";

function InviteWrapper() {
  const { code } = useParams();
  return <InvitePage code={code} />;
}

function AppContent() {
  const navigate = useNavigate();

  useEffect(() => {
    const MAX_IDLE_TIME = 3 * 60 * 60 * 1000;
    let idleTimer = null;

    const resetTimer = () => {
      localStorage.setItem("loginTime", Date.now().toString());
    };

    const checkIdle = () => {
      const loginTime = localStorage.getItem("loginTime");
      if (!loginTime) return;
      const diff = Date.now() - parseInt(loginTime, 10);

      if (diff > MAX_IDLE_TIME) {
        ["token", "role", "isAuthenticated", "admin_id", "loginTime"].forEach((k) =>
          localStorage.removeItem(k)
        );
        toast.warning("Sesi Anda telah berakhir karena tidak aktif selama 3 jam.");
        navigate("/login");
      }
    };

    const events = ["mousemove", "keypress", "click", "scroll"];
    events.forEach((ev) => window.addEventListener(ev, resetTimer));

    idleTimer = setInterval(checkIdle, 60 * 1000);

    return () => {
      clearInterval(idleTimer);
      events.forEach((ev) => window.removeEventListener(ev, resetTimer));
    };
  }, [navigate]);

  return (
    <>
      <ToastWrapper />
      <Routes>
        {/* Halaman publik */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Halaman error umum */}
        <Route path="/404" element={<NotFound />} />
        <Route path="/network-error" element={<NetworkError />} />

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

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <AppContent />
      </Router>
    </ErrorBoundary>
  );
}

export default App;
