import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const ModalTambahTamu = ({
  show,
  handleClose,
  handleSubmit,
  isEdit = false,
  dataEdit = {},
  simpleMode = false,
}) => {
  const [namaTamu, setNamaTamu] = useState("");
  const [kategori, setKategori] = useState("");
  const [cppCpw, setCppCpw] = useState("");

  useEffect(() => {
    if (show) {
      if (isEdit && dataEdit) {
        setNamaTamu(dataEdit.name || "");
        setKategori(dataEdit.category || "");
        setCppCpw(dataEdit.type || "");
      } else {
        setNamaTamu("");
        setKategori("");
        setCppCpw("");
      }

      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [show, isEdit, dataEdit]);

  if (!show) return null;

  const submitForm = (e) => {
    e.preventDefault();
    handleSubmit({ namaTamu, kategori, cppCpw, id: dataEdit?.id });
  };

  return (
    <>
      {/* BACKDROP */}
      <div
        className="modal-backdrop fade show"
        style={{ zIndex: 1040 }}
        onClick={handleClose}
      />

      {/* MODAL */}
      <div
        className="modal show d-block"
        tabIndex="-1"
        style={{ zIndex: 1050 }}
      >
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content rounded-4 shadow">
            {/* HEADER */}
            <div className="modal-header border-0 pb-2">
              <h5 className="modal-title fw-bold">
                {isEdit ? "Edit Tamu" : "Tambah Tamu"}
              </h5>
              <button
                type="button"
                className="btn-close"
                onClick={handleClose}
              />
            </div>

            <form onSubmit={submitForm}>
              {/* BODY */}
              <div className="modal-body">
                {/* Nama */}
                <div className="mb-3">
                  <label className="fw-semibold mb-2">
                    Nama Tamu <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Masukkan nama tamu"
                    value={namaTamu}
                    onChange={(e) => setNamaTamu(e.target.value)}
                    autoFocus
                    required
                  />
                </div>

                {!simpleMode && (
                  <>
                    {/* Kategori */}
                    <div className="mb-3">
                      <label className="fw-semibold mb-2">
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
                      <label className="fw-semibold mb-2">
                        CPP / CPW <span className="text-danger">*</span>
                      </label>

                      {isEdit && dataEdit.type === "Tamu Tambahan" ? (
                        <input
                          type="text"
                          className="form-control"
                          value="Tamu Tambahan"
                          readOnly
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
                  </>
                )}
              </div>

              {/* FOOTER */}
              <div className="modal-footer border-0 pt-0">
                <button
                  type="submit"
                  className="btn btn-primary w-100 fw-semibold"
                >
                  {isEdit ? "Simpan Perubahan" : "Tambah"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalTambahTamu;
