import { Html5QrcodeScanner } from "html5-qrcode";
import { useEffect, useState, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../assets/css/Scanner.css";
import Navbar from "../../components/Navbar";
import ModalCheckinTamu from "../../components/modals/ModalCheckinTamu";

const CheckinScanner = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [autoTriggered, setAutoTriggered] = useState(false);

  const [valid, setValid] = useState(null);
  const [totalHadir, setTotalHadir] = useState(0);
  const [search, setSearch] = useState("");
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

    if (guest.is_checked_in) {
      alert("Tamu sudah hadir");
      return;
    }

    const confirmCheckin = window.confirm(
      `${guest.name} belum hadir. Lanjutkan check-in?`,
    );

    if (!confirmCheckin) return;

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/checkin/scan`, {
        token: token,
        guest_code: guest.code,
      });

      alert("Check-in berhasil!");

      setSelectedGuest(null);

      window.history.replaceState(
        {},
        document.title,
        `/checkin?token=${token}`,
      );

      if (invitationId) {
        fetchTotal(invitationId);
      }
    } catch (err) {
      alert(err.response?.data?.message || "Gagal check-in");
    }
  };

  useEffect(() => {
    if (!valid || !invitationId || !token || !code || autoTriggered) return;

    const fetchGuestDetail = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/checkin/guest-detail`,
          {
            params: {
              token,
              guest_code: code,
            },
          },
        );

        setSelectedGuest(res.data.data);
        setAutoTriggered(true);
      } catch (err) {
        alert(err.response?.data?.message || "Tamu tidak ditemukan");
      }
    };

    fetchGuestDetail();
  }, [valid, invitationId, token, code, autoTriggered]);

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

  useEffect(() => {
    if (!valid || !invitationId) return;

    const scanner = new Html5QrcodeScanner(
      "reader",
      { fps: 10, qrbox: 250 },
      false,
    );

    scanner.render(
      async (decodedText) => {
        try {
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
        }
      },
      () => {},
    );

    return () => {
      scanner.clear().catch(() => {});
    };
  }, [valid, invitationId]);

  if (valid === null) return <div className="text-center mt-5">Loading...</div>;

  if (!valid)
    return (
      <div className="text-center mt-5 text-danger">
        Token tidak valid / expired
      </div>
    );

  return (
    <div className="scanner-wrapper">
      <Navbar role="penerima_tamu" />

      {/* CONTENT */}
      <div className="container text-center scanner-content">
        <div className="text-start total-hadir">Total Hadir: {totalHadir}</div>

        <h1 className="scan-title">SCAN QR</h1>

        {/* Scanner Placeholder */}
        <div className="scanner-box">
          <div id="reader" ref={qrRef}></div>
        </div>

        {/* Search Manual */}
        <input
          type="text"
          className="form-control search-input"
          placeholder="Cari Nama Tamu"
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
        />

        {results.length > 0 && (
          <div className="list-group mt-3 text-start">
            {results.map((guest) => (
              <button
                key={guest.id}
                className={`list-group-item list-group-item-action d-flex justify-content-between align-items-center ${
                  guest.is_checked_in ? "list-group-item-success" : ""
                }`}
                disabled={guest.is_checked_in}
                onClick={() => setSelectedGuest(guest)}
              >
                <span>{guest.name}</span>
                {Number(guest.is_checked_in) === 1 ? (
                  <span className="badge bg-success">Sudah Hadir</span>
                ) : (
                  <span className="badge bg-danger">Belum Hadir</span>
                )}
              </button>
            ))}
          </div>
        )}

        <ModalCheckinTamu
          show={!!selectedGuest}
          guest={selectedGuest}
          onClose={() => setSelectedGuest(null)}
          onCheckin={handleManualCheckin}
        />
      </div>

      <footer className="scanner-footer">Powered by WeKu</footer>
    </div>
  );
};

export default CheckinScanner;
