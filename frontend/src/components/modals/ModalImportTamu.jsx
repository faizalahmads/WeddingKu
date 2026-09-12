import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ModalImportTamu = ({
  show,
  handleClose,
  xlsxPreview,
  handleImportXLSX,
}) => {
  const [petals, setPetals] = useState([]);

  // ==============================
  // PAGINATION
  // ==============================
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10;

  const totalPages = Math.ceil(xlsxPreview.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const currentData = xlsxPreview.slice(startIndex, endIndex);

  // Reset pagination ketika modal dibuka
  useEffect(() => {
    if (show) {
      setCurrentPage(1);
    }
  }, [show, xlsxPreview.length]);

  // ==============================
  // ANIMASI BUNGA
  // ==============================
  useEffect(() => {
    if (show) {
      const newPetals = Array.from({ length: 10 }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 5,
        duration: 8 + Math.random() * 5,
        scale: 0.6 + Math.random() * 0.5,
      }));

      setPetals(newPetals);
    }
  }, [show]);

  // ==============================
  // HANDLE PAGINATION
  // ==============================
  const handlePrevious = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const getPaginationPages = () => {
    // Jika halaman 3 atau kurang, tampilkan semuanya
    if (totalPages <= 3) {
      return Array.from({ length: totalPages }, (_, index) => index + 1);
    }

    // Jika sedang di halaman 1 atau 2
    if (currentPage <= 2) {
      return [1, 2, "...", totalPages];
    }

    // Jika sedang di 2 halaman terakhir
    if (currentPage >= totalPages - 1) {
      return [1, "...", totalPages - 1, totalPages];
    }

    // Jika berada di tengah
    return [1, "...", currentPage, "...", totalPages];
  };

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
            {/* Animasi bunga */}
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
                initial={{
                  y: -50,
                  opacity: 0,
                }}
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

          {/* Modal */}
          <motion.div
            className="modal fade show"
            style={{
              display: "block",
              position: "fixed",
              zIndex: 1050,
            }}
            initial={{
              opacity: 0,
              y: 50,
              scale: 0.95,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: 50,
              scale: 0.95,
            }}
            transition={{
              duration: 0.4,
              ease: "easeOut",
            }}
          >
            <div className="modal-dialog modal-lg modal-dialog-centered">
              <div className="modal-content border-0 shadow-lg rounded-4">
                {/* HEADER */}
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

                {/* BODY */}
                <div className="modal-body position-relative">
                  {xlsxPreview.length > 0 ? (
                    <>
                      <div className="table-responsive">
                        <table className="table table-bordered table-sm text-center align-middle">
                          <thead className="table-light">
                            <tr>
                              <th>No</th>
                              <th>Nama</th>
                              <th>Kategori</th>
                              <th>CPP/CPW</th>
                              <th>Souvenir</th>
                              <th>No HP</th>
                            </tr>
                          </thead>

                          <tbody>
                            {currentData.map((row, index) => (
                              <tr key={startIndex + index}>
                                <td>{startIndex + index + 1}</td>

                                <td>{row.name}</td>

                                <td>{row.category}</td>

                                <td>{row.type}</td>

                                <td>{row.souvenir || "-"}</td>

                                <td>{row.no_hp || "-"}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      {/* PAGINATION */}
                      {totalPages > 1 && (
                        <div className="import-pagination-wrapper">
                          {/* TOTAL DATA */}
                          <div className="import-pagination-info">
                            Total data: {xlsxPreview.length}
                          </div>

                          {/* PAGINATION */}
                          <div className="import-pagination">
                            {/* FIRST PAGE */}
                            <button
                              type="button"
                              className="pagination-circle"
                              onClick={() => setCurrentPage(1)}
                              disabled={currentPage === 1}
                            >
                              {"<<"}
                            </button>

                            {/* PREVIOUS */}
                            <button
                              type="button"
                              className="pagination-circle"
                              onClick={handlePrevious}
                              disabled={currentPage === 1}
                            >
                              {"<"}
                            </button>

                            {/* PAGE NUMBER */}
                            {getPaginationPages().map((page, index) => {
                              if (page === "...") {
                                return (
                                  <span
                                    key={`ellipsis-${index}`}
                                    className="pagination-ellipsis"
                                  >
                                    ...
                                  </span>
                                );
                              }

                              return (
                                <button
                                  type="button"
                                  key={page}
                                  className={`pagination-circle ${
                                    currentPage === page ? "active" : ""
                                  }`}
                                  onClick={() => handlePageChange(page)}
                                >
                                  {page}
                                </button>
                              );
                            })}

                            {/* NEXT */}
                            <button
                              type="button"
                              className="pagination-circle"
                              onClick={handleNext}
                              disabled={currentPage === totalPages}
                            >
                              {">"}
                            </button>

                            {/* LAST PAGE */}
                            <button
                              type="button"
                              className="pagination-circle"
                              onClick={() => setCurrentPage(totalPages)}
                              disabled={currentPage === totalPages}
                            >
                              {">>"}
                            </button>
                          </div>
                        </div>
                      )}
                    </>
                  ) : (
                    <p className="text-center text-muted">
                      Tidak ada data untuk ditampilkan.
                    </p>
                  )}
                </div>

                {/* FOOTER */}
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
