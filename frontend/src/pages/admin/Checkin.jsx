import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../assets/css/Checkin.css";
import AdminLayout from "../../components/AdminLayout";
import Footer from "../../components/Footer";
import ModalConfirm from "../../components/modals/ModalConfirm";
import Url from "../../assets/icons/url.svg";
import UrlAbu from "../../assets/icons/url-abu.svg";

const Checkin = () => {
  const [showGenerateModal, setShowGenerateModal] = useState(false);
  const [showDeactivateModal, setShowDeactivateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showDeleteExpiredModal, setShowDeleteExpiredModal] = useState(false);
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

  const deleteExpiredLinks = async () => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/checkin/links-expired/${invitationId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      await fetchLinks();
    } catch (err) {
      console.error("Gagal menghapus link expired:", err);
      alert("Gagal menghapus link expired");
    }
  };

  const deleteHistory = async (id) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/checkin/links/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      // refresh daftar history
      await fetchLinks();
    } catch (err) {
      console.error("Gagal menghapus history check-in:", err);
      alert("Gagal menghapus history check-in");
    }
  };

  const copyToClipboard = async (text, successMessage) => {
    if (!text) {
      alert("Tidak ada data yang bisa disalin");
      return;
    }

    try {
      // Clipboard API modern
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        // Fallback untuk browser yang tidak mendukung clipboard API
        const textarea = document.createElement("textarea");

        textarea.value = text;
        textarea.style.position = "fixed";
        textarea.style.left = "-999999px";
        textarea.style.top = "-999999px";

        document.body.appendChild(textarea);

        textarea.focus();
        textarea.select();

        const successful = document.execCommand("copy");

        document.body.removeChild(textarea);

        if (!successful) {
          throw new Error("Copy gagal");
        }
      }

      alert(successMessage);
    } catch (err) {
      console.error("Gagal copy:", err);
      alert("Gagal menyalin. Silakan copy secara manual.");
    }
  };

  const getTokenFromLink = (link) => {
    try {
      const url = new URL(link, window.location.origin);

      return url.searchParams.get("token") || "-";
    } catch (err) {
      console.error("Gagal membaca token:", err);
      return "-";
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100 bg-light">
      <AdminLayout role="admin">
        <div className="container py-5">
          <div className="d-flex justify-content-start mb-4">
            <button
              className="btn btn-blue px-4 py-2 fw-semibold"
              onClick={() => setShowGenerateModal(true)}
            >
              Generate Link <img src={Url} alt="url" className="ms-2" />
            </button>

            <button
              className="btn btn-outline-danger px-4 py-2 ms-2 fw-semibold"
              onClick={() => setShowDeleteExpiredModal(true)}
            >
              Hapus Semua Expired
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
                      Token: <b>{getTokenFromLink(item.link)}</b>
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
                    <div className="d-flex align-items-center gap-3">
                      {isActive && (
                        <>
                          {/* SALIN LINK */}
                          <button
                            type="button"
                            className="btn btn-link text-primary fw-semibold p-0"
                            onClick={() =>
                              copyToClipboard(
                                item.link,
                                "Link berhasil disalin!",
                              )
                            }
                          >
                            Salin Link
                          </button>

                          {/* SALIN TOKEN */}
                          <button
                            type="button"
                            className="btn btn-link text-success fw-semibold p-0"
                            onClick={() => {
                              const linkToken = getTokenFromLink(item.link);

                              if (!linkToken || linkToken === "-") {
                                alert("Token tidak ditemukan");
                                return;
                              }

                              copyToClipboard(
                                linkToken,
                                "Token berhasil disalin!",
                              );
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
                        </>
                      )}

                      {/* HAPUS */}
                      <button
                        className="btn btn-link text-danger fw-semibold p-0"
                        onClick={() => {
                          setSelectedLinkId(item.id);
                          setShowDeleteModal(true);
                        }}
                      >
                        Hapus
                      </button>
                    </div>
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

        <ModalConfirm
          show={showDeleteModal}
          title="Hapus History Check-in"
          message="Apakah Anda yakin ingin menghapus history link check-in ini? Data yang sudah dihapus tidak dapat dikembalikan."
          confirmText="Hapus"
          showExpiry={false}
          onConfirm={async () => {
            setShowDeleteModal(false);

            await deleteHistory(selectedLinkId);

            setSelectedLinkId(null);
          }}
          onClose={() => {
            setShowDeleteModal(false);
            setSelectedLinkId(null);
          }}
        />

        <ModalConfirm
          show={showDeleteExpiredModal}
          title="Hapus Semua Link Expired"
          message="Apakah Anda yakin ingin menghapus semua link check-in yang sudah expired? Data yang dihapus tidak dapat dikembalikan."
          confirmText="Hapus Semua"
          showExpiry={false}
          onConfirm={async () => {
            setShowDeleteExpiredModal(false);
            await deleteExpiredLinks();
          }}
          onClose={() => setShowDeleteExpiredModal(false)}
        />
      </AdminLayout>

      <Footer />
    </div>
  );
};

export default Checkin;
