import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import ExcelJS from "exceljs";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../assets/css/App.css";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import ModalTambahTamu from "../../components/modals/ModalTambahTamu";
import ModalImportTamu from "../../components/modals/ModalImportTamu";
import Pagination from "../../components/Pagination";
import TrashIcon from "../../assets/icons/trash-red.svg";
import EditIcon from "../../assets/icons/edit-green.svg";
import EyeIcon from "../../assets/icons/eye-blue.svg";
import Swal from "sweetalert2";
import Papa from "papaparse";

const DataTamu = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [dataEdit, setDataEdit] = useState(null);
  const [tamu, setTamu] = useState([]);
  
  const [search, setSearch] = useState("");
    useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [xlsxPreview, setXlsxPreview] = useState([]);
  const [showXlsxModal, setShowXlsxModal] = useState(false);
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

  
  // 🧹 Hapus tamu
  const handleDeleteClick = (id) => {
    Swal.fire({
      title: "Yakin hapus tamu ini?",
      text: "Data yang dihapus tidak dapat dikembalikan!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/api/guests/${id}`, { method: "DELETE" })
          .then((res) => {
            if (!res.ok) throw new Error("Gagal hapus tamu");
            setTamu((prev) => prev.filter((t) => t.id !== id));
            Swal.fire("Terhapus!", "Data tamu berhasil dihapus.", "success");
          })
          .catch((err) => {
            Swal.fire("Error!", "Terjadi kesalahan saat hapus data.", "error");
            console.error(err);
          });
      }
    });
  };

  // ✏️ Edit tamu
  const handleEditClick = (item) => {
    setDataEdit(item);
    setIsEdit(true);
    setShowModal(true);
  };

  // ✅ Simpan Tambah/Edit
  const handleTambahTamu = (data) => {
    const adminId = localStorage.getItem("admin_id");

    const url = isEdit
      ? `http://localhost:5000/api/guests/${data.id}`
      : "http://localhost:5000/api/guests";

    const method = isEdit ? "PUT" : "POST";

    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: data.namaTamu,
        category: data.kategori,
        type: data.cppCpw,
        admin_id: adminId,
      }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Gagal menyimpan data tamu");
        return res.json();
      })
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Berhasil!",
          text: isEdit ? "Data tamu berhasil diperbarui." : "Data tamu berhasil ditambahkan.",
          timer: 1500,
          showConfirmButton: false,
        });
        // Refresh data
        fetch(`http://localhost:5000/api/guests/${adminId}`)
          .then((res) => res.json())
          .then((data) => setTamu(data));

        setShowModal(false);
        setIsEdit(false);
        setDataEdit(null);
      })
      .catch((err) => {
        Swal.fire("Error!", "Terjadi kesalahan saat menyimpan data.", "error");
        console.error(err);
      });
  };

  const handleImportXLSX = async (e) => {
    const file = e.target.files[0];
    if (!file) return Swal.fire("Batal", "Import dibatalkan.", "info");

    const validTypes = [
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "application/vnd.ms-excel",
    ];
    if (!validTypes.includes(file.type)) {
      Swal.fire("Error!", "Format file harus XLSX atau XLS.", "error");
      return;
    }

    Swal.fire({
      title: "Membaca file...",
      text: "Harap tunggu sebentar.",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });

    try {
      const data = await file.arrayBuffer();
      const workbook = XLSX.read(data);
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);

      Swal.close();

      if (jsonData.length === 0) {
        Swal.fire("Kosong!", "Tidak ada data di dalam file.", "warning");
        return;
      }

      // ✅ Simpan hasil ke state untuk preview
      setXlsxPreview(jsonData);
      setShowXlsxModal(true);
    } catch (err) {
      Swal.close();
      Swal.fire("Error!", "Gagal membaca file XLSX.", "error");
      console.error(err);
    }
  };

  const handleConfirmImport = async () => {
    console.log("Konfirmasi Import diklik");
    const adminId = localStorage.getItem("admin_id");

    try {
      const response = await fetch("http://localhost:5000/api/guests/import-xlsx", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ admin_id: adminId, guests: xlsxPreview }),
      });

      if (!response.ok) throw new Error("Gagal mengimpor XLSX");

      Swal.fire({
        icon: "success",
        title: "Berhasil!",
        text: "Data tamu berhasil diimpor.",
        timer: 1500,
        showConfirmButton: false,
      });

      // Refresh data
      const res = await fetch(`http://localhost:5000/api/guests/${adminId}`);
      const data = await res.json();
      setTamu(data);
      setShowXlsxModal(false);
    } catch (error) {
      Swal.fire("Error!", "Terjadi kesalahan saat mengimpor data.", "error");
      console.error(error);
    }
  };

  const handleDownloadTemplate = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Tamu");

    worksheet.addRow(["name", "category", "type"]);

    const categoryOptions = ["VIP", "Reguler"];
    const typeOptions = ["CPP", "CPW"];

    for (let i = 2; i <= 100; i++) {
      worksheet.getCell(`B${i}`).dataValidation = {
        type: "list",
        allowBlank: true,
        formulae: [`"${categoryOptions.join(",")}"`],
        showErrorMessage: true,
        errorTitle: "Kategori tidak valid",
        error: "Pilih dari daftar yang tersedia",
      };
      worksheet.getCell(`C${i}`).dataValidation = {
        type: "list",
        allowBlank: true,
        formulae: [`"${typeOptions.join(",")}"`],
      };
    }

    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "template_tamu.xlsx";
    link.click();
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
          <div className="d-flex justify-content-between mb-2">
            <button
              className="btn btn-success fw-semibold"
              onClick={() => setShowModal(true)}
            >
              Tambah Tamu
            </button>

            {/* ✅ Tombol Import XLSX */}
            <div>
              <input
                type="file"
                accept=".xlsx,.xls"
                id="import-xlsx"
                style={{ display: "none" }}
                onChange={handleImportXLSX}
              />
              <button
                className="btn btn-primary me-2 fw-semibold"
                onClick={() => document.getElementById("import-xlsx").click()}
              >
                Import XLSX
              </button>

              {/* ✅ Tombol Download Template XLSX */}
              <button
                className="btn btn-outline-secondary fw-semibold"
                onClick={handleDownloadTemplate}
              >
                Download Template XLSX
              </button>
            </div>
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
                        <button 
                          className="btn btn-sm me-2"
                          onClick={() => handleDeleteClick(item.id)}>
                          <img src={TrashIcon} alt="hapus" />
                        </button>
                        <button 
                          className="btn btn-sm me-2"
                          onClick={() => handleEditClick(item)}>
                          <img src={EditIcon} alt="edit" />
                        </button>
                        <a
                          href={`http://localhost:5173/undangan/${item.groom_name}-${item.bride_name}?to=${item.name}/${item.code}`}
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
          handleClose={() => {
            setShowModal(false);
            setIsEdit(false);
            setDataEdit(null);
          }}
          handleSubmit={handleTambahTamu}
          isEdit={isEdit}
          dataEdit={dataEdit}
        />

        <ModalImportTamu
          show={showXlsxModal}
          handleClose={() => setShowXlsxModal(false)}
          xlsxPreview={xlsxPreview}
          handleImportXLSX={handleConfirmImport}
        />
      </div>

      <Footer />
    </div>
  );
};

export default DataTamu;
