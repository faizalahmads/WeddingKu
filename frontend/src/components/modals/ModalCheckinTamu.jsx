import {
  IoCloseOutline,
  IoPersonOutline,
  IoCheckmarkCircleOutline,
  IoGiftOutline,
} from "react-icons/io5";

import "../../assets/css/ModalCheckinTamu.css";

const ModalCheckinTamu = ({
  show,
  guest,
  onClose,
  onCheckin,
  checkingIn,
  checkinSuccess,
}) => {
  if (!show || !guest) return null;

  const checkedIn = Number(guest.is_checked_in) === 1;

  const souvenir = guest.souvenir || "Tidak ada";

  const category = guest.category || guest.guest_category || "Reguler";
  const isVIP = category.toLowerCase() === "vip";

  return (
    <div className="checkin-modal-overlay" onClick={onClose}>
      <div className="checkin-modal" onClick={(e) => e.stopPropagation()}>
        {/* HEADER */}
        <div className="checkin-modal-header">
          <div>
            <h3>Detail Tamu</h3>
          </div>

          <button type="button" className="checkin-close-btn" onClick={onClose}>
            <IoCloseOutline />
          </button>
        </div>

        {/* GUEST PROFILE */}
        <div className="guest-profile">
          <div className="guest-avatar">
            <IoPersonOutline />
          </div>

          <h2>{guest.name}</h2>

          <p>Tamu Undangan</p>
        </div>

        {/* INFORMATION */}
        <div className="guest-detail-card">
          {/* KATEGORI — hanya tampil kalau VIP */}
          {isVIP && (
            <div className="guest-detail-row">
              <div className="guest-detail-label">Kategori</div>
              <div className="guest-detail-value">{category}</div>
            </div>
          )}

          {/* STATUS */}
          <div className="guest-detail-row">
            <div className="guest-detail-label">Status Kehadiran</div>

            <div>
              {checkedIn ? (
                <span className="guest-status-badge hadir">
                  <IoCheckmarkCircleOutline />
                  Sudah Hadir
                </span>
              ) : (
                <span className="guest-status-badge belum">Belum Hadir</span>
              )}
            </div>
          </div>

          {/* SOUVENIR */}
          <div className="guest-detail-row souvenir-row">
            <div className="guest-detail-label">Souvenir</div>

            <div className="souvenir-value">
              <IoGiftOutline className="souvenir-icon" />
              <span>{souvenir}</span>
            </div>
          </div>
        </div>

        {/* ACTION */}
        {checkinSuccess ? (
          <div className="checkin-success">
            <div className="success-icon">
              <IoCheckmarkCircleOutline />
            </div>

            <h4>Check-in Berhasil!</h4>

            <p>{guest.name} berhasil melakukan check-in.</p>
          </div>
        ) : !checkedIn ? (
          <button
            type="button"
            className="checkin-action-btn"
            onClick={() => onCheckin(guest)}
            disabled={checkingIn}
          >
            {checkingIn ? (
              <>
                <span className="checkin-spinner"></span>
                Memproses...
              </>
            ) : (
              <>
                <IoCheckmarkCircleOutline />
                Check-in Tamu
              </>
            )}
          </button>
        ) : (
          <button type="button" className="checkin-action-btn already" disabled>
            <IoCheckmarkCircleOutline />
            Tamu Sudah Check-in
          </button>
        )}
      </div>
    </div>
  );
};

export default ModalCheckinTamu;
