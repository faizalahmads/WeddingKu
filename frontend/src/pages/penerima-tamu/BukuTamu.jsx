import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar";
import ModalTambahTamu from "../../components/modals/ModalTambahTamu"
import "bootstrap/dist/css/bootstrap.min.css";
import ModalConfirm from "../../components/modals/ModalConfirm";

const BukuTamu = () => {
  const token = localStorage.getItem("token");

  const [isEdit, setIsEdit] = useState(false);
  const [dataEdit, setDataEdit] = useState(null);
  const [showTambahModal, setShowTambahModal] = useState(false);
  const [guests, setGuests] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedGuest, setSelectedGuest] = useState(null);
  const [confirmType, setConfirmType] = useState(""); // "checkin" | "cancel"

  const fetchGuests = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/checkin/guest-list`,
        {
          params: {
            search,
            filter,
            page,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setGuests(res.data.data);
      setTotal(res.data.total);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchGuests();
  }, [search, filter, page]);

  const handleCheckin = async (guest) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/checkin/manual`,
        { guest_id: guest.id },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      fetchGuests();
    } catch (err) {
      alert("Gagal check-in");
    }
  };

  const handleCancel = async (guest) => {
    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/checkin/cancel/${guest.id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } },
      );
      fetchGuests();
    } catch (err) {
      alert("Gagal batalkan");
    }
  };

  const handleTambahTamu = async (data) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/checkin/add-and-checkin`,
        {
          name: data.namaTamu,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      setShowTambahModal(false);
      fetchGuests();
    } catch (err) {
      alert("Gagal menambahkan tamu");
    }
  };

  const confirmCheckin = async () => {
    if (!selectedGuest) return;

    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/checkin/manual`,
        { guest_id: selectedGuest.id },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      setShowConfirmModal(false);
      setSelectedGuest(null);
      fetchGuests();
    } catch (err) {
      alert(err.response?.data?.message || "Gagal check-in");
    }
  };

  const handleConfirmAction = async () => {
    if (!selectedGuest) return;

    try {
      if (confirmType === "checkin") {
        await axios.post(
          `${import.meta.env.VITE_API_URL}/api/checkin/manual`,
          { guest_id: selectedGuest.id },
          { headers: { Authorization: `Bearer ${token}` } },
        );
      }

      if (confirmType === "cancel") {
        await axios.put(
          `${import.meta.env.VITE_API_URL}/api/checkin/cancel/${selectedGuest.id}`,
          {},
          { headers: { Authorization: `Bearer ${token}` } },
        );
      }

      setShowConfirmModal(false);
      setSelectedGuest(null);
      setConfirmType("");
      fetchGuests();
    } catch (err) {
      alert(err.response?.data?.message || "Gagal proses");
    }
  };

  return (
    <div className="bg-light min-vh-100">
      <Navbar role="penerima_tamu" />

      <div className="container py-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="fw-bold mb-0">Buku Tamu</h5>

          <button
            className="btn btn-primary"
            onClick={() => setShowTambahModal(true)}
          >
            + Tambah Tamu
          </button>
        </div>
        {/* FILTER */}
        <div className="d-flex gap-3 mb-3">
          <button
            className={`btn ${filter === "all" ? "btn-primary" : "btn-outline-primary"}`}
            onClick={() => setFilter("all")}
          >
            Semua
          </button>

          <button
            className={`btn ${filter === "hadir" ? "btn-success" : "btn-outline-success"}`}
            onClick={() => setFilter("hadir")}
          >
            Hadir
          </button>

          <button
            className={`btn ${filter === "belum" ? "btn-danger" : "btn-outline-danger"}`}
            onClick={() => setFilter("belum")}
          >
            Belum Hadir
          </button>
        </div>

        {/* SEARCH */}
        <input
          type="text"
          className="form-control mb-3"
          placeholder="Cari Nama Tamu"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* TABLE */}
        <div className="table-responsive">
          <table className="table table-bordered align-middle text-center bg-white shadow-sm">
            <thead className="table-light">
              <tr>
                <th>No</th>
                <th>Nama Tamu</th>
                <th>Kategori</th>
                <th>CPP/CPW</th>
                <th>Status</th>
                <th>Aksi</th>
              </tr>
            </thead>

            <tbody>
              {guests.map((guest, index) => (
                <tr key={guest.id}>
                  <td>{index + 1}</td>
                  <td>{guest.name}</td>
                  <td>{guest.category}</td>
                  <td>{guest.type}</td>
                  <td>
                    {guest.is_checked_in ? (
                      <span className="badge bg-success">Hadir</span>
                    ) : (
                      <span className="badge bg-danger">Belum Hadir</span>
                    )}
                  </td>
                  <td>
                    {guest.is_checked_in ? (
                      <button
                        className="btn btn-link text-danger"
                        onClick={() => {
                          setSelectedGuest(guest);
                          setConfirmType("cancel");
                          setShowConfirmModal(true);
                        }}
                      >
                        Batalkan
                      </button>
                    ) : (
                      <button
                        className="btn btn-link text-primary"
                        onClick={() => {
                          setSelectedGuest(guest);
                          setConfirmType("checkin");
                          setShowConfirmModal(true);
                        }}
                      >
                        Check-in
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* TOTAL */}
        <div className="mt-3 text-muted">Total data : {total}</div>
      </div>
      <ModalConfirm
        show={showConfirmModal}
        title={
          confirmType === "checkin"
            ? "Konfirmasi Check-in"
            : "Konfirmasi Pembatalan"
        }
        message={
          confirmType === "checkin"
            ? `Yakin check-in tamu ${selectedGuest?.name}?`
            : `Yakin batalkan kehadiran ${selectedGuest?.name}?`
        }
        confirmText={
          confirmType === "checkin" ? "Ya, Check-in" : "Ya, Batalkan"
        }
        cancelText="Batal"
        onConfirm={handleConfirmAction}
        onClose={() => {
          setShowConfirmModal(false);
          setSelectedGuest(null);
          setConfirmType("");
        }}
      />

      <ModalTambahTamu
        show={showTambahModal}
        handleClose={() => {
          setShowTambahModal(false);
          setIsEdit(false);
          setDataEdit(null);
        }}
        handleSubmit={handleTambahTamu}
        isEdit={isEdit}
        dataEdit={dataEdit}
        simpleMode={true}
      />
    </div>
  );
};

export default BukuTamu;
