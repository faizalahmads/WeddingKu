import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const UndanganSaya = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [hasInvitation, setHasInvitation] = useState(false);
  const [themes, setThemes] = useState([]);

  const adminId = localStorage.getItem("admin_id");

  useEffect(() => {
    const fetchData = async () => {
      if (!adminId) {
        alert("Anda belum login sebagai admin!");
        navigate("/login");
        return;
      }

      try {
        // Cek apakah admin sudah punya undangan
        const res = await axios.get(`http://192.168.16.1:5000/api/admin/${adminId}`);
        if (res.data && res.data.id) {
          setHasInvitation(true);
        } else {
          setHasInvitation(false);
        }
      } catch (err) {
        if (err.response && err.response.status === 404) {
          setHasInvitation(false);
        } else {
          console.error("Gagal memeriksa undangan admin:", err);
          alert("Terjadi kesalahan server. Silakan coba lagi.");
        }
      }

      try {
        // Ambil daftar tema dari endpoint API
        const themesRes = await axios.get("http://192.168.16.1:5000/themes");
        setThemes(themesRes.data);
      } catch (err) {
        console.error("Gagal memuat daftar tema:", err);
        alert("Gagal memuat daftar tema dari server!");
      }

      setLoading(false);
    };

    fetchData();
  }, [adminId, navigate]);

  const handleSelectTheme = (id) => {
    localStorage.setItem("selectedTheme", id);
    navigate("/admin/manage-invite");
  };

  const handleEditInvitation = (invitationId) => {
    navigate(`/admin/edit-invite/${invitationId}`);
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
        {hasInvitation ? (
          <div>
            <h2 className="mb-4">Undangan Anda Sudah Dibuat</h2>
            <button
              className="btn btn-success"
              onClick={() => handleEditInvitation(adminId)}
            >
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
                      style={{
                        height: "250px",
                        objectFit: "cover",
                        width: "100%",
                      }}
                    />
                    <div className="card-body">
                      <h4>{theme.name}</h4>
                      <p>{theme.description}</p>
                      <button
                        className="btn btn-info me-2"
                        onClick={() => navigate(`/preview/${theme.id}`)}
                      >
                        Preview Fullscreen
                      </button>
                      <button
                        className="btn btn-primary"
                        onClick={() => handleSelectTheme(theme.id)}
                      >
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
