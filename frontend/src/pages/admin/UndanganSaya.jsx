import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../assets/css/PilihTema.css";
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
        const res = await axios.get(
          `http://localhost:5000/api/invitations/admin/${adminId}`,
        );
        setInvitation(res.data);
      } catch (err) {
        if (err.response?.status === 404) {
          setInvitation(null); // pastikan null
        } else {
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
        navigate(`/admin/manage-invite/${invId}`);
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
            <button
              className="btn btn-success"
              onClick={() => handleEditInvitation(invitation.id)}
            >
              Lanjut ke Edit Undangan
            </button>
          </div>
        ) : (
          <>
            <h2 className="mb-4">Pilih Tema Undangan</h2>
            <div className="row g-4">
              {themes.map((theme) => (
                <div className="col-lg-3 col-md-6" key={theme.id}>
                  <div className="saas-card">
                    <div className="saas-image-wrapper">
                      <img
                        src={`http://localhost:5000${theme.thumbnail_url}`}
                        alt={theme.name}
                        className="saas-image"
                      />

                      <div className="saas-overlay">
                        <button
                          className="btn btn-light btn-sm me-2"
                          onClick={() => navigate(`/preview/${theme.id}`)}
                        >
                          Preview
                        </button>

                        <button
                          className="btn btn-primary btn-sm"
                          onClick={() => handleSelectTheme(theme.id)}
                        >
                          Gunakan Tema
                        </button>
                      </div>
                    </div>

                    <div className="saas-content">
                      <small className="text-muted">Wedding Template</small>
                      <h5 className="mt-1">{theme.name}</h5>
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