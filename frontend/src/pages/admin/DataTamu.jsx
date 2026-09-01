import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import ExcelJS from "exceljs";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../assets/css/App.css";
import AdminLayout from "../../components/AdminLayout";
import Footer from "../../components/Footer";
import ModalTambahTamu from "../../components/modals/ModalTambahTamu";
import ModalImportTamu from "../../components/modals/ModalImportTamu";
import QRModal from "../../pages/admin/themes/tema1/components/QRModal";
import Pagination from "../../components/Pagination";
import TrashIcon from "../../assets/icons/trash-red.svg";
import EditIcon from "../../assets/icons/edit-green.svg";
import EyeIcon from "../../assets/icons/eye-blue.svg";
import QRIcon from "../../assets/icons/qr-icon.svg";
import WAIcon from "../../assets/icons/wa-icon.svg";
import Swal from "sweetalert2";
import Papa from "papaparse";

const DataTamu = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [dataEdit, setDataEdit] = useState(null);
  const [tamu, setTamu] = useState([]);

  const [showQR, setShowQR] = useState(false);
  const [selectedGuest, setSelectedGuest] = useState(null);
  
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

    fetch(`${import.meta.env.VITE_API_URL}/api/guests/${adminId}`)
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
        fetch(`${import.meta.env.VITE_API_URL}/api/guests/${id}`, {
          method: "DELETE",
        })
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

  const handleQRClick = (item) => {
    setSelectedGuest(item);
    setShowQR(true);
  };

  const handleShareWhatsApp = (guest) => {
    const guestName = guest.name || "Bapak/Ibu/Saudara/i";

    // =========================
    // Format nomor WhatsApp
    // =========================
    let phone = guest.no_hp ? guest.no_hp.toString().replace(/\D/g, "") : "";

    // 0812xxxx → 62812xxxx
    if (phone.startsWith("0")) {
      phone = "62" + phone.substring(1);
    }

    // =========================
    // Format tanggal
    // =========================
    const weddingDate = guest.wedding_date
      ? new Date(guest.wedding_date).toLocaleDateString("id-ID", {
          weekday: "long",
          day: "2-digit",
          month: "long",
          year: "numeric",
        })
      : "-";

    // =========================
    // Link undangan personal
    // =========================
    const invitationUrl = `${import.meta.env.VITE_APP_URL}/undangan/${guest.groom_name}-${guest.bride_name}?to=${encodeURIComponent(
      guest.name,
    )}/${guest.code}`;

    // =========================
    // Pesan WhatsApp
    // =========================
    const message = `Yth.
Bapak/Ibu/Saudara/i
${guestName}

Assalamu'alaikum Warahmatullahi Wabarakatuh

Dengan memohon rahmat dan ridho Allah SWT, serta tanpa mengurangi rasa hormat, kami bermaksud mengundang Bapak/Ibu/Saudara/i untuk menghadiri acara pernikahan kami.  

Mohon dapat menunjukkan QR Code Reservasi saat memasuki area acara.

Untuk informasi lengkap mengenai acara, silahkan kunjungi link dibawah ini :

${invitationUrl}

Mohon maaf bila terdapat kesalahan dalam penulisan nama dan gelar. Suatu kebahagiaan bagi kami apabila Bapak/Ibu berkenan untuk hadir dan memberikan doa restu.

Wassalamu'alaikum Warahmatullahi Wabarakatuh.

Salam Hangat,
${guest.bride_name || "-"} & ${guest.groom_name || "-"} `;

    // =========================
    // Buka WhatsApp
    // =========================
    const whatsappUrl = phone
      ? `https://wa.me/${phone}?text=${encodeURIComponent(message)}`
      : `https://wa.me/?text=${encodeURIComponent(message)}`;

    window.open(whatsappUrl, "_blank");
  };

  // ✅ Simpan Tambah/Edit
  const handleTambahTamu = (data) => {
    const adminId = localStorage.getItem("admin_id");

    const url = isEdit
      ? `${import.meta.env.VITE_API_URL}/api/guests/${data.id}`
      : `${import.meta.env.VITE_API_URL}/api/guests`;

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
        fetch(`${import.meta.env.VITE_API_URL}/api/guests/${adminId}`)
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
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/guests/import-xlsx`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ admin_id: adminId, guests: xlsxPreview }),
        },
      );

      if (!response.ok) throw new Error("Gagal mengimpor XLSX");

      Swal.fire({
        icon: "success",
        title: "Berhasil!",
        text: "Data tamu berhasil diimpor.",
        timer: 1500,
        showConfirmButton: false,
      });

      // Refresh data
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/guests/${adminId}`,
      );
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
      <AdminLayout role="admin">
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
                        <div className="d-flex justify-content-center gap-1">
                          {/* Hapus */}
                          <button
                            className="btn btn-sm"
                            onClick={() => handleDeleteClick(item.id)}
                            title="Hapus"
                          >
                            <img src={TrashIcon} alt="hapus" />
                          </button>

                          {/* Edit */}
                          <button
                            className="btn btn-sm"
                            onClick={() => handleEditClick(item)}
                            title="Edit"
                          >
                            <img src={EditIcon} alt="edit" />
                          </button>

                          {/* QR */}
                          <button
                            className="btn btn-sm"
                            onClick={() => handleQRClick(item)}
                            title="QR Code"
                          >
                            <img src={QRIcon} alt="QR" />
                          </button>

                          {/* Lihat */}
                          <a
                            href={`${import.meta.env.VITE_APP_URL}/undangan/${item.groom_name}-${item.bride_name}?to=${encodeURIComponent(
                              item.name,
                            )}/${item.code}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-sm"
                            title="Lihat Undangan"
                          >
                            <img src={EyeIcon} alt="lihat" />
                          </a>

                          {/* WhatsApp */}
                          <button
                            type="button"
                            className="btn btn-sm btn-whatsapp"
                            onClick={() => handleShareWhatsApp(item)}
                            title="Share via WhatsApp"
                          >
                            <img src={WAIcon} alt="lihat" />
                          </button>
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
      </AdminLayout>

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

      {selectedGuest && (
        <QRModal
          show={showQR}
          onClose={() => {
            setShowQR(false);
            setSelectedGuest(null);
          }}
          qrValue={selectedGuest.code}
          guestName={selectedGuest.name}
          guestRole={
            selectedGuest.category === "VIP" ? "Executive VIP Invitation" : ""
          }
        />
      )}

      <Footer />
    </div>
  );
};

export default DataTamu;
