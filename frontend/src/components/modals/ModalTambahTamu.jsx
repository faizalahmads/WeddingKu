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
  const [nomorTelepon, setNomorTelepon] = useState("");
  const [kategori, setKategori] = useState("");
  const [cppCpw, setCppCpw] = useState("");
  const [souvenir, setSouvenir] = useState("");

  useEffect(() => {
    if (show) {
      if (isEdit && dataEdit) {
        setNamaTamu(dataEdit.name || "");

        setNomorTelepon(
          dataEdit.no_hp ||
          ""
        );

        setKategori(dataEdit.category || "");
        setCppCpw(dataEdit.type || "");
        setSouvenir(dataEdit.souvenir || "");
      } else {
        setNamaTamu("");
        setNomorTelepon("");
        setKategori("");
        setCppCpw("");
        setSouvenir("");
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

  // ========================
  // Submit Form
  // ========================
  const submitForm = (e) => {
    e.preventDefault();

    handleSubmit({
      namaTamu,
      nomorTelepon,
      kategori,
      cppCpw,
      souvenir,
      id: dataEdit?.id,
    });
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
                {/* ========================
                    NAMA TAMU
                ======================== */}
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

                {/* ========================
                    NOMOR TELEPON
                ======================== */}
                <div className="mb-3">
                  <label className="fw-semibold mb-2">Nomor Telepon</label>

                  <input
                    type="tel"
                    className="form-control"
                    placeholder="Contoh: 081234567890"
                    value={nomorTelepon}
                    onChange={(e) => setNomorTelepon(e.target.value)}
                  />
                </div>

                {!simpleMode && (
                  <>
                    {/* ========================
                        KATEGORI
                    ======================== */}
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

                    {/* ========================
                        CPP / CPW
                    ======================== */}
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

                    {/* ========================
                        SOUVENIR
                    ======================== */}
                    <div className="mb-3">
                      <label className="fw-semibold mb-2">Souvenir</label>

                      <select
                        className="form-select"
                        value={souvenir}
                        onChange={(e) => setSouvenir(e.target.value)}
                      >
                        <option value="">Pilih souvenir</option>
                        <option value="Gelas">Gelas</option>
                        <option value="Dompet">Dompet</option>
                        <option value="Tumbler Mug">Tumbler Mug</option>
                        <option value="Tidak Ada">Tidak Ada</option>
                      </select>
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
