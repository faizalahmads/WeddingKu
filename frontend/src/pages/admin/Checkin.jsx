import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../assets/css/Checkin.css";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ModalConfirm from "../../components/modals/ModalConfirm";
import Url from "../../assets/icons/url.svg";
import UrlAbu from "../../assets/icons/url-abu.svg";

const Checkin = () => {
  const [showGenerateModal, setShowGenerateModal] = useState(false);
  const [showDeactivateModal, setShowDeactivateModal] = useState(false);
  const [selectedLinkId, setSelectedLinkId] = useState(null);
  const [links, setLinks] = useState([]);
  const invitationId = 1;

  const token = localStorage.getItem("token");

  const fetchLinks = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/checkin/links/${invitationId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setLinks(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchLinks();
  }, []);

  const [expiryType, setExpiryType] = useState("tomorrow_2359");

  const generateLink = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/checkin/generate-link`,
        {
          invitation_id: invitationId,
          expiry_type: expiryType,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      fetchLinks();
    } catch (err) {
      console.error(err);
    }
  };

  const deactivateLink = async (id) => {
    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/checkin/deactivate/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      fetchLinks();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100 bg-light">
      <Navbar role="admin" />

      <div className="container py-5">
        <div className="d-flex justify-content-start mb-4">
          <button
            className="btn btn-blue px-4 py-2 fw-semibold"
            onClick={() => setShowGenerateModal(true)}
          >
            Generate Link <img src={Url} alt="url" className="ms-2" />
          </button>
        </div>

        <div className="links-scroll">
          {links.map((item) => {
            const isExpired = new Date(item.expired_at) < new Date();
            const isActive = item.is_active > 0 && !isExpired;

            return (
              <div
                key={item.id}
                className="card shadow-sm border-0 mb-4 checkin-card"
              >
                <div className="card-body">
                  <div className="d-flex align-items-center mb-3">
                    <img src={UrlAbu} alt="url" className="me-2" />
                    <span className="text-break link-text">{item.link}</span>
                  </div>

                  <p className="mt-2 text-muted small">
                    Token: <b>{new URL(item.link).searchParams.get("token")}</b>
                  </p>

                  {/* Badge */}
                  <span
                    className={`badge rounded-pill px-3 py-2 fs-6 ${
                      isActive ? "bg-success" : "bg-danger"
                    }`}
                  >
                    {isActive ? "Aktif" : "Expired"}
                  </span>

                  <p className="mt-3 mb-2 fw-semibold text-muted">
                    Expired :{" "}
                    {new Date(item.expired_at).toLocaleString("id-ID", {
                      timeZone: "Asia/Jakarta",
                    })}
                  </p>

                  {/* Tombol hanya muncul jika benar-benar aktif */}
                  {isActive && (
                    <div className="d-flex gap-3">
                      {/* SALIN LINK */}
                      <button
                        className="btn btn-link text-primary fw-semibold p-0"
                        onClick={() => {
                          const textArea = document.createElement("textarea");
                          textArea.value = item.link;
                          document.body.appendChild(textArea);
                          textArea.select();
                          document.execCommand("copy");
                          document.body.removeChild(textArea);
                          alert("Link berhasil disalin!");
                        }}
                      >
                        Salin Link
                      </button>

                      {/* 🔥 SALIN TOKEN */}
                      <button
                        className="btn btn-link text-success fw-semibold p-0"
                        onClick={() => {
                          try {
                            const url = new URL(item.link);
                            const token = url.searchParams.get("token");

                            if (!token) {
                              alert("Token tidak ditemukan");
                              return;
                            }

                            const textArea = document.createElement("textarea");
                            textArea.value = token;
                            document.body.appendChild(textArea);
                            textArea.select();
                            document.execCommand("copy");
                            document.body.removeChild(textArea);

                            alert("Token berhasil disalin!");
                          } catch (err) {
                            alert("Gagal mengambil token");
                          }
                        }}
                      >
                        Salin Token
                      </button>

                      {/* NONAKTIFKAN */}
                      <button
                        className="btn btn-link text-danger fw-semibold p-0"
                        onClick={() => {
                          setSelectedLinkId(item.id);
                          setShowDeactivateModal(true);
                        }}
                      >
                        Nonaktifkan
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        <ModalConfirm
          show={showGenerateModal}
          title="Generate Link Baru"
          message="Apakah Anda yakin ingin membuat link check-in baru? Link sebelumnya akan dinonaktifkan."
          confirmText="Generate"
          expiryType={expiryType}
          setExpiryType={setExpiryType}
          showExpiry={true} // ✅ tampilkan
          onConfirm={async () => {
            setShowGenerateModal(false);
            await generateLink();
          }}
          onClose={() => setShowGenerateModal(false)}
        />

        <ModalConfirm
          show={showDeactivateModal}
          title="Nonaktifkan Link"
          message="Apakah Anda yakin ingin menonaktifkan link ini?"
          confirmText="Ya"
          showExpiry={false} // ❌ tidak tampil
          onConfirm={async () => {
            setShowDeactivateModal(false);
            await deactivateLink(selectedLinkId);
          }}
          onClose={() => setShowDeactivateModal(false)}
        />
      </div>

      <Footer />
    </div>
  );
};

export default Checkin;
