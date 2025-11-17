import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const UndanganSaya = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [invitation, setInvitation] = useState(null);
  const [themes, setThemes] = useState([]);

  const adminId = localStorage.getItem("admin_id");

  useEffect(() => {
    const fetch = async () => {
      if (!adminId) {
        alert("Anda belum login sebagai admin!");
        navigate("/login");
        return;
      }

      try {
        const res = await axios.get(`http://localhost:5000/api/invitations/admin/${adminId}`);
        setInvitation(res.data);
      } catch (err) {
        // kalau 404 berarti belum ada undangan -> biarkan null
        if (err.response && err.response.status !== 404) {
          console.error(err);
          alert("Gagal memeriksa undangan admin.");
        }
      }

      try {
        const themesRes = await axios.get("http://localhost:5000/themes");
        setThemes(themesRes.data || []);
      } catch (err) {
        console.error("Gagal memuat tema:", err);
        setThemes([]);
      }

      setLoading(false);
    };

    fetch();
  }, [adminId, navigate]);

  const handleSelectTheme = async (themeId) => {
    if (!adminId) {
      alert("Admin belum login.");
      navigate("/login");
      return;
    }

    const ok = window.confirm("Apakah Anda yakin memilih tema ini? Tema tidak dapat diubah setelah dipilih.");
    if (!ok) return;

    try {
      const res = await axios.post("http://localhost:5000/api/invitations", {
        admin_id: adminId,
        theme_id: themeId,
      });

      if (res.data && res.data.success) {
        const invId = res.data.invitation_id;
        navigate(`/admin/manage-invite/:invitationId`);
      } else {
        alert("Gagal membuat undangan.");
      }
    } catch (err) {
      console.error(err);
      alert("Gagal membuat undangan.");
    }
  };

  const handleEditInvitation = (invId) => {
    navigate(`/admin/manage-invite/${invId}`);
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Memeriksa undangan...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="d-flex flex-column min-vh-100 bg-latar">
      <Navbar />
      <div className="container my-5 text-center">
        {invitation ? (
          <div>
            <h2 className="mb-4">Anda memiliki undangan</h2>
            <button className="btn btn-success" onClick={() => handleEditInvitation(invitation.id)}>
              Lanjut ke Edit Undangan
            </button>
          </div>
        ) : (
          <>
            <h2 className="mb-4">Pilih Tema Undangan</h2>
            <div className="row">
              {themes.map((theme) => (
                <div className="col-md-6 mb-4" key={theme.id}>
                  <div className="card shadow-sm p-3">
                    <img
                      src={theme.preview_image}
                      alt={theme.name}
                      className="card-img-top"
                      style={{ height: "250px", objectFit: "cover", width: "100%" }}
                    />
                    <div className="card-body">
                      <h4>{theme.name}</h4>
                      <p>{theme.description}</p>
                      <button className="btn btn-info me-2" onClick={() => navigate(`/preview/${theme.id}`)}>
                        Preview Fullscreen
                      </button>
                      <button className="btn btn-primary" onClick={() => handleSelectTheme(theme.id)}>
                        Pilih Tema Ini
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default UndanganSaya;