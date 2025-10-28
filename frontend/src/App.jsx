import React from "react";
import { BrowserRouter as Router, Routes, Route, useParams } from "react-router-dom";
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
// import PreviewInvitation from "./pages/admin/PreviewInvitation.jsx";
// import PreviewUndangan from "./pages/admin/PreviewUndangan.jsx";
import ManageInvite from "./pages/admin/ManageInvite.jsx";
import UndanganManagement from "./pages/admin/UndanganManagement.jsx";
import EditInvite from "./pages/admin/EditInvite.jsx";
import PreviewTema from "./pages/admin/PreviewTema.jsx";
// import SelectTheme from "./pages/admin/SelectTheme.jsx";



function InviteWrapper() {
  const { code } = useParams();
  return <InvitePage code={code} />;
}

function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/undangan/:code" element={<InviteWrapper />} /> */}
        {/* Halaman publik */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Halaman yang butuh login */}
        <Route element={<ProtectedRoute />}>
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/data-tamu" element={<DataTamu />} />
          <Route path="/admin/undangan-saya" element={<UndanganSaya />} />
          {/* <Route path="/preview-undangan/:code" element={<PreviewUndangan />} /> */}
          <Route path="/admin/manage-invite" element={<ManageInvite />} />
          {/* File sama dengan undangan-management */}
          <Route path="/admin/undangan-management" element={<UndanganManagement />} />
          <Route path="/admin/edit-invite/:id" element={<EditInvite />} />
          <Route path="/undangan/:slug" element={<Undangan />} />
          <Route path="/:slug" element={<Undangan />} />
          <Route path="/preview-undangan/:id" element={<PreviewTema/>} />
          {/* Contoh untuk undangan QR */}
          <Route path="/invite/:code" element={<InvitePage />} />
          {/* <Route path="/admin/pilih-tema" element={<SelectTheme />} /> */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
