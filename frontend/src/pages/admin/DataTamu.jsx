import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../assets/css/App.css";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ModalTambahTamu from "../../components/modals/ModalTambahTamu";
import Pagination from "../../components/Pagination";
import TrashIcon from "../../assets/icons/trash-red.svg";
import EditIcon from "../../assets/icons/edit-green.svg";
import EyeIcon from "../../assets/icons/eye-blue.svg";
import Swal from "sweetalert2";

const DataTamu = () => {
  const [tamu, setTamu] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const adminId = localStorage.getItem("admin_id");
  const tamuPerPage = 10;

  // 📌 Ambil data tamu dari backend
  useEffect(() => {
    if (!adminId) return;

    fetch(`http://localhost:5000/api/guests/${adminId}`)
      .then((res) => res.json())
      .then((data) => setTamu(data))
      .catch((err) => console.error("Gagal ambil data tamu:", err))
      .finally(() => setIsLoading(false));
  }, [adminId]);

  // 📌 Filter tamu berdasarkan search
  const filteredTamu = tamu.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  
  const handleTambahTamu = (dataBaru) => {
    const adminId = localStorage.getItem("admin_id");

    fetch("http://localhost:5000/api/guests", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: dataBaru.namaTamu,
        category: dataBaru.kategori,
        type: dataBaru.cppCpw,
        admin_id: adminId,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Gagal menambahkan tamu");
        }
        return res.json();
      })
      .then((data) => {
        Swal.fire({
          icon: "success",
          title: "Berhasil!",
          text: "Data tamu berhasil ditambahkan.",
          timer: 1500,
          showConfirmButton: false,
        });

        // ✅ Ambil ulang data terbaru dari backend
        fetch(`http://localhost:5000/api/guests/${adminId}`)
          .then((res) => res.json())
          .then((data) => setTamu(data))
          .catch((err) => console.error("Gagal ambil data tamu:", err));

        setShowModal(false);
      })
      .catch((err) => {
        console.error("Gagal tambah tamu:", err);
        Swal.fire({
          icon: "error",
          title: "Gagal!",
          text: "Terjadi kesalahan saat menambah tamu.",
        });
      });
  };

  if (!adminId) {
    Swal.fire({
      icon: "error",
      title: "Gagal!",
      text: "Admin ID tidak ditemukan. Silakan login ulang.",
    });
    return;
  }

  // 📌 Pagination
  const indexOfLast = currentPage * tamuPerPage;
  const indexOfFirst = indexOfLast - tamuPerPage;
  const currentTamu = filteredTamu.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredTamu.length / tamuPerPage);

  const handlePageChange = (page) => setCurrentPage(page);

  if (isLoading) {
    return <div className="text-center py-5">Loading data...</div>;
  }

  return (
    <div className="d-flex flex-column min-vh-100 bg-latar">
      <Navbar />

      <div className="container mt-5">
        <div className="mb-3">
          {/* Tombol Tambah Tamu di atas */}
          <div className="d-flex justify-content-end mb-2">
            <button 
              className="btn btn-success fw-semibold"
              onClick={() => setShowModal(true)}>
              Tambah Tamu
            </button>
          </div>

          {/* Search bar full width */}
          <div className="w-100">
            <input
              type="text"
              className="form-control"
              placeholder="Cari Nama Tamu"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* 📊 Tabel Data Tamu */}
        <div className="table-responsive shadow-sm">
          <table className="table align-middle table-bordered text-center fixed-table">
            <thead className="table-light">
              <tr>
                <th style={{ width: "7%" }}>No</th>
                <th style={{ width: "38%" }}>Nama Tamu</th>
                <th style={{ width: "20%" }}>Kategori Tamu</th>
                <th style={{ width: "15%" }}>CPP/CPW</th>
                <th style={{ width: "20%" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentTamu.length > 0 ? (
                currentTamu.map((item, index) => (
                  <tr key={item.id}>
                    <td data-label="No">{indexOfFirst + index + 1}</td>
                    <td data-label="Nama Tamu" className="text-truncate">
                      {item.name}
                    </td>
                    <td data-label="Kategori Tamu">{item.category}</td>
                    <td data-label="CPP/CPW">{item.type}</td>
                    <td data-label="Action" className="Action flex-wrap">
                      <div className="d-flex justify-content-center gap-2">
                        <button className="btn btn-sm me-2">
                          <img src={TrashIcon} alt="hapus" />
                        </button>
                        <button className="btn btn-sm me-2">
                          <img src={EditIcon} alt="edit" />
                        </button>
                        <a
                          href={`http://192.168.16.1:5173/undangan/${item.groom_name}-${item.bride_name}?to=${item.name}/${item.code}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-sm"
                        >
                          <img src={EyeIcon} alt="lihat" />
                        </a>

                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center text-muted">
                    Tidak ada data tamu
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>


        {/* 📌 Total data & pagination */}
        <div className="d-flex justify-content-between align-items-center mt-2">
          <span className="text-muted small">
            Total data: {filteredTamu.length}
          </span>
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>

        {/* 📌 Modal Tambah Tamu */}
        <ModalTambahTamu
          show={showModal}
          handleClose={() => setShowModal(false)}
          handleSubmit={handleTambahTamu}
        />
      </div>

      <Footer />
    </div>
  );
};

export default DataTamu;
