import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const ModalTambahTamu = ({
  show,
  handleClose,
  handleSubmit,
  isEdit = false,
  dataEdit = {},
}) => {
  const [namaTamu, setNamaTamu] = useState("");
  const [kategori, setKategori] = useState("");
  const [cppCpw, setCppCpw] = useState("");

  useEffect(() => {
    if (isEdit && dataEdit) {
      setNamaTamu(dataEdit.name || "");
      setKategori(dataEdit.category || "");
      setCppCpw(dataEdit.type || "");
    } else {
      setNamaTamu("");
      setKategori("");
      setCppCpw("");
    }
  }, [isEdit, dataEdit]);

  const submitForm = (e) => {
    e.preventDefault();
    handleSubmit({ namaTamu, kategori, cppCpw, id: dataEdit?.id });
  };

  return (
    <div
      className={`modal fade ${show ? "show d-block modal-fade-in" : ""}`}
      tabIndex="-1"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div
        className="modal-dialog modal-dialog-centered modal-dialog-scrollable"
        style={{
          width: "100%",
          maxWidth: "600px",
        }}
      >
        <div className="modal-content rounded-3">
          {/* Header */}
          <div
            className="modal-header"
            style={{ background: "white", borderBottom: "2px solid #D1D1D1" }}
          >
            <h5 className="modal-title fw-bold">
              {isEdit ? "Edit Tamu" : "Tambah Tamu"}
            </h5>
            <button
              type="button"
              className="btn-close"
              onClick={handleClose}
            ></button>
          </div>

          {/* Body */}
          <form onSubmit={submitForm}>
            <div className="modal-body" style={{ background: "#EFF3F8" }}>
              {/* Nama Tamu */}
              <div className="mb-3">
                <label className="form-label-modal fw-bold mb-1">
                  Nama Tamu <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Masukkan nama tamu"
                  value={namaTamu}
                  onChange={(e) => setNamaTamu(e.target.value)}
                  required
                />
              </div>

              {/* Kategori */}
              <div className="mb-3">
                <label className="form-label-modal fw-bold mb-1">
                  Kategori Tamu <span className="text-danger">*</span>
                </label>
                <select
                  className="form-select"
                  value={kategori}
                  onChange={(e) => setKategori(e.target.value)}
                  required
                >
                  <option value="">Pilih kategori</option>
                  <option value="VIP">VIP</option>
                  <option value="Reguler">Reguler</option>
                </select>
              </div>

              {/* CPP / CPW */}
              <div className="mb-3">
                <label className="form-label-modal fw-bold mb-1">
                  CPP / CPW <span className="text-danger">*</span>
                </label>
                {isEdit && dataEdit.type === "Tamu Tambahan" ? (
                  <input
                    type="text"
                    className="form-control"
                    value="Tamu Tambahan"
                    readOnly
                    style={{
                      backgroundColor: "#E9ECEF",
                      color: "#6C757D",
                      cursor: "not-allowed",
                    }}
                  />
                ) : (
                  <select
                    className="form-select"
                    value={cppCpw}
                    onChange={(e) => setCppCpw(e.target.value)}
                    required
                  >
                    <option value="">Pilih salah satu</option>
                    <option value="CPP">CPP</option>
                    <option value="CPW">CPW</option>
                  </select>
                )}
              </div>
            </div>

            {/* Footer */}
            <div
              className="modal-footer"
              style={{ background: "white", borderTop: "2px solid #D1D1D1" }}
            >
              <button
                type="submit"
                className="btn fw-bold"
                style={{ background: "#0B5AFD", color: "white", borderRadius: 15 }}
              >
                {isEdit ? "Simpan Perubahan" : "Tambah"}
              </button>
              <button
                type="button"
                className="btn fw-bold"
                style={{ background: "#FD0B0B", color: "white", borderRadius: 15 }}
                onClick={handleClose}
              >
                Close
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ModalTambahTamu;
