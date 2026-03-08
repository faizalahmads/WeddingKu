import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const ModalCheckinTamu = ({ show, guest, onClose, onCheckin }) => {
  if (!show || !guest) return null;

  return (
    <div className="modal show d-block"
    tabIndex="-1"
    style={{ backgroundColor: "rgba(0,0,0,0.5)" }} 
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content rounded-4 shadow">
          {/* HEADER */}
          <div className="modal-header border-0 pb-0">
            <h5 className="modal-title fw-bold">Detail Tamu</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>

          {/* BODY */}
          <div className="modal-body pt-2">
            <div className="p-3 bg-light rounded-3">
              <p className="mb-1 text-muted small">Nama</p>
              <h5 className="fw-semibold">{guest.name}</h5>

              <hr className="my-3" />

              <p className="mb-1 text-muted small">Kategori</p>
              <h6 className="fw-medium">{guest.category || "-"}</h6>

              <hr className="my-3" />

              <p className="mb-1 text-muted small">Status</p>
              {guest.is_checked_in ? (
                <span className="badge bg-success fs-6">Sudah Hadir</span>
              ) : (
                <span className="badge bg-danger fs-6">Belum Hadir</span>
              )}
            </div>
          </div>

          {/* FOOTER */}
          <div className="modal-footer border-0">
            {!guest.is_checked_in && (
              <button
                className="btn btn-danger w-100 rounded-3 fw-semibold"
                onClick={() => onCheckin(guest)}
              >
                Check-in
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalCheckinTamu;
