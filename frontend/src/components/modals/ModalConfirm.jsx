import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const ModalConfirm = ({
  show,
  title,
  message,
  confirmText = "Ya",
  cancelText = "Batal",
  onConfirm,
  onClose,
}) => {
  if (!show) return null;

  return (
    <>
      <div className="modal fade show d-block">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content rounded-4 shadow">
            <div className="modal-header border-0">
              <h5 className="fw-bold">{title}</h5>
              <button className="btn-close" onClick={onClose}></button>
            </div>

            <div className="modal-body text-muted">{message}</div>

            <div className="modal-footer border-0">
              <button className="btn btn-success" onClick={onConfirm}>
                {confirmText}
              </button>
              
              <button className="btn btn-light" onClick={onClose}>
                {cancelText}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="modal-backdrop fade show"></div>
    </>
  );
};

export default ModalConfirm;
