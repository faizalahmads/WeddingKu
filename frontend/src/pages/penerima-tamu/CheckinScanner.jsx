import { Html5QrcodeScanner } from "html5-qrcode";
import { useEffect, useState, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../assets/css/Scanner.css";
import {
  IoPersonAddOutline,
  IoSearchOutline,
  IoCloseOutline,
  IoPersonOutline,
} from "react-icons/io5";

import AdminLayout from "../../components/AdminLayout";
import ModalCheckinTamu from "../../components/modals/ModalCheckinTamu";

const CheckinScanner = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [autoTriggered, setAutoTriggered] = useState(false);

  const scannerRef = useRef(null);
  const [valid, setValid] = useState(null);
  const [totalHadir, setTotalHadir] = useState(0);
  const [search, setSearch] = useState("");
  const [checkingIn, setCheckingIn] = useState(false);
  const [checkinSuccess, setCheckinSuccess] = useState(false);
  const [showSouvenir, setShowSouvenir] = useState(false);
  const [results, setResults] = useState([]);
  const [selectedGuest, setSelectedGuest] = useState(null);
  const [invitationId, setInvitationId] = useState(null);
  const code = searchParams.get("code");

  useEffect(() => {
    const validateToken = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/checkin/validate-token?token=${token}`,
        );

        if (res.data.valid) {
          setValid(true);
          setInvitationId(res.data.invitation_id);
          fetchTotal(res.data.invitation_id);
        } else {
          setValid(false);
        }
      } catch {
        setValid(false);
      }
    };

    if (token) validateToken();
    else setValid(false);
  }, [token]);

  const fetchTotal = async (invitationId) => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/checkin/total/${invitationId}`,
      );
      setTotalHadir(res.data.total);
    } catch (err) {
      console.log(err);
    }
  };

  const qrRef = useRef(null);

  const handleManualCheckin = async (guest) => {
    const checkedIn = Number(guest.is_checked_in) === 1;

    if (checkedIn) {
      return;
    }

    try {
      setCheckingIn(true);
      setCheckinSuccess(false);

      await axios.post(`${import.meta.env.VITE_API_URL}/api/checkin/scan`, {
        token,
        guest_code: guest.code,
      });

      // =========================
      // UPDATE DATA SEARCH
      // =========================
      setResults((prevResults) =>
        prevResults.map((item) =>
          item.id === guest.id
            ? {
                ...item,
                is_checked_in: 1,
              }
            : item,
        ),
      );

      // =========================
      // UPDATE SELECTED GUEST
      // =========================
      setSelectedGuest((prev) =>
        prev
          ? {
              ...prev,
              is_checked_in: 1,
            }
          : prev,
      );

      // =========================
      // UPDATE TOTAL HADIR
      // =========================
      if (invitationId) {
        await fetchTotal(invitationId);
      }

      // =========================
      // TAMPILKAN SUCCESS
      // =========================
      setCheckinSuccess(true);

      // =========================
      // TUTUP MODAL
      // =========================
      setTimeout(() => {
        setSelectedGuest(null);
        setCheckinSuccess(false);

        try {
          scannerRef.current?.resume();
        } catch (err) {
          console.log(err);
        }
      }, 1200);
    } catch (err) {
      console.error("Check-in error:", err);

      alert(err.response?.data?.message || "Gagal check-in");
    } finally {
      setCheckingIn(false);
    }
  };

  useEffect(() => {
    if (!valid || !invitationId || scannerRef.current) return;

    const scanner = new Html5QrcodeScanner(
      "reader",
      {
        fps: 10,
        qrbox: 250,
      },
      false,
    );

    scannerRef.current = scanner;

    scanner.render(
      async (decodedText) => {
        try {
          // Stop scanner sementara setelah QR berhasil dibaca
          await scanner.pause(true);

          const res = await axios.get(
            `${import.meta.env.VITE_API_URL}/api/checkin/guest-detail`,
            {
              params: {
                token,
                guest_code: decodedText,
              },
            },
          );

          setSelectedGuest(res.data.data);
        } catch (err) {
          alert(err.response?.data?.message || "Tamu tidak ditemukan");

          // Jalankan scanner kembali
          try {
            scanner.resume();
          } catch {}
        }
      },
      () => {},
    );

    return () => {
      scanner.clear().catch(() => {});
      scannerRef.current = null;
    };
  }, [valid, invitationId, token]);

  const handleCloseModal = () => {
    setSelectedGuest(null);

    try {
      scannerRef.current?.resume();
    } catch {}
  };

  const handleSearch = async (value) => {
    setSearch(value);

    if (value.length < 2) {
      setResults([]);
      return;
    }

    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/checkin/search`,
        {
          params: {
            token: token,
            name: value,
          },
        },
      );

      setResults(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  if (valid === null) return <div className="text-center mt-5">Loading...</div>;

  if (!valid)
    return (
      <div className="text-center mt-5 text-danger">
        Token tidak valid / expired
      </div>
    );

  return (
    <div className="scanner-wrapper">
      <AdminLayout role="penerima_tamu">
        {/* CONTENT */}
        <div className="container text-center scanner-content">
          <div className="total-hadir">
            <IoPersonAddOutline className="total-hadir-icon" />
            <span>Total Hadir: {totalHadir}</span>
          </div>

          <h1 className="scan-title">Scan Guest QR Code</h1>

          {/* Scanner Placeholder */}
          <div className="scanner-box">
            <div id="reader" ref={qrRef}></div>
          </div>

          {/* Search Manual */}
          <div className="search-wrapper">
            <div className="search-box">
              <IoSearchOutline className="search-icon" />

              <input
                type="text"
                className="search-input"
                placeholder="Cari Nama Tamu"
                value={search}
                onChange={(e) => handleSearch(e.target.value)}
              />

              {search && (
                <button
                  type="button"
                  className="search-clear"
                  onClick={() => handleSearch("")}
                >
                  <IoCloseOutline />
                </button>
              )}
            </div>

            {results.length > 0 && (
              <div className="guest-results">
                {results.map((guest) => {
                  const checkedIn = Number(guest.is_checked_in) === 1;

                  return (
                    <button
                      key={guest.id}
                      type="button"
                      className={`guest-result-item ${
                        checkedIn ? "checked-in" : ""
                      }`}
                      onClick={() => setSelectedGuest(guest)}
                    >
                      <div className="guest-result-info">
                        <div className="guest-result-icon">
                          <IoPersonOutline />
                        </div>

                        <div className="guest-result-text">
                          <span className="guest-result-name">
                            {guest.name}
                          </span>

                          <span className="guest-result-status-label">
                            Status Kehadiran
                          </span>
                        </div>
                      </div>

                      <span
                        className={`guest-status ${
                          checkedIn ? "hadir" : "belum-hadir"
                        }`}
                      >
                        {checkedIn ? "Sudah Hadir" : "Belum Hadir"}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          <ModalCheckinTamu
            show={!!selectedGuest}
            guest={selectedGuest}
            onClose={handleCloseModal}
            onCheckin={handleManualCheckin}
            checkingIn={checkingIn}
            checkinSuccess={checkinSuccess}
            showSouvenir={showSouvenir}
          />
        </div>
      </AdminLayout>

      <footer className="scanner-footer">Powered by WeKu</footer>
    </div>
  );
};

export default CheckinScanner;
