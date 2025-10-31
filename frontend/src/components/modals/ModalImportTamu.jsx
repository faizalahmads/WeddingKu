import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ModalImportTamu = ({ show, handleClose, xlsxPreview, handleImportXLSX }) => {
  const [petals, setPetals] = useState([]);

  // 🌸 Buat kelopak acak setiap kali modal dibuka
  useEffect(() => {
    if (show) {
      const newPetals = Array.from({ length: 10 }).map((_, i) => ({
        id: i,
        left: Math.random() * 100, // posisi acak (0-100%)
        delay: Math.random() * 5, // jeda awal
        duration: 8 + Math.random() * 5, // lama jatuh
        scale: 0.6 + Math.random() * 0.5, // ukuran kelopak
      }));
      setPetals(newPetals);
    }
  }, [show]);

  return (
    <AnimatePresence>
      {show && (
        <>
          {/* Overlay */}
          <motion.div
            className="modal-backdrop"
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              position: "fixed",
              inset: 0,
              zIndex: 1040,
              overflow: "hidden",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* 🌸 Animasi bunga jatuh */}
            {petals.map((p) => (
              <motion.div
                key={p.id}
                className="petal"
                style={{
                  position: "absolute",
                  top: "-5%",
                  left: `${p.left}%`,
                  fontSize: `${p.scale * 22}px`,
                  color: "rgba(255,182,193,0.9)",
                  pointerEvents: "none",
                }}
                initial={{ y: -50, opacity: 0 }}
                animate={{
                  y: ["0vh", "100vh"],
                  opacity: [1, 0],
                  rotate: [0, 360],
                }}
                transition={{
                  duration: p.duration,
                  delay: p.delay,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                🌸
              </motion.div>
            ))}
          </motion.div>

          {/* Modal Konten */}
          <motion.div
            className="modal fade show"
            style={{
              display: "block",
              position: "fixed",
              transform: "translate(-50%, -50%)",
              zIndex: 1050,
            }}
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <div className="modal-dialog modal-lg modal-dialog-centered">
              <div className="modal-content border-0 shadow-lg rounded-4">
                <div className="modal-header border-0">
                  <h5 className="modal-title fw-semibold text-primary">
                    💐 Preview Data Tamu
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={handleClose}
                  ></button>
                </div>

                <div className="modal-body position-relative">
                  {xlsxPreview.length > 0 ? (
                    <div className="table-responsive">
                      <table className="table table-bordered table-sm text-center align-middle">
                        <thead className="table-light">
                          <tr>
                            <th>No</th>
                            <th>Nama</th>
                            <th>Kategori</th>
                            <th>CPP/CPW</th>
                          </tr>
                        </thead>
                        <tbody>
                          {xlsxPreview.slice(0, 10).map((row, index) => (
                            <tr key={index}>
                              <td>{index + 1}</td>
                              <td>{row.name}</td>
                              <td>{row.category}</td>
                              <td>{row.type}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      {xlsxPreview.length > 10 && (
                        <p className="text-muted small text-center">
                          Menampilkan 10 data pertama dari {xlsxPreview.length} data.
                        </p>
                      )}
                    </div>
                  ) : (
                    <p className="text-center text-muted">
                      Tidak ada data untuk ditampilkan.
                    </p>
                  )}
                </div>

                <div className="modal-footer border-0 d-flex justify-content-between">
                  <button
                    className="btn btn-outline-secondary rounded-pill px-4"
                    onClick={handleClose}
                  >
                    Batal
                  </button>
                  <button
                    className="btn btn-primary rounded-pill px-4"
                    onClick={handleImportXLSX}
                  >
                    Konfirmasi Import
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ModalImportTamu;