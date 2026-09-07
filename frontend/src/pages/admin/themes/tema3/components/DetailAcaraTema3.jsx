import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

// Ganti dengan asset bunga yang sesuai desain
import flower from "../../../../../assets/images/tema3/mawarPutih.svg";

const DetailAcara = () => {
  const handleOpenMaps = () => {
    window.open(
      "https://maps.google.com/?q=GOR+Sunter+Jakarta",
      "_blank",
      "noopener,noreferrer",
    );
  };

  return (
    <section className="section7">
      <div className="detail-acara-wrapper container-fluid">
        {/* =====================================
            AKAD
        ====================================== */}
        <div className="detail-acara-item text-center">
          <h2 className="detail-acara-title">Akad</h2>

          <div className="detail-acara-content">
            <p className="detail-acara-date">Sabtu, 26 September 2026</p>

            <p>07.00 - 09.00 WIB</p>

            <p className="detail-acara-place">GOR SUNTER</p>

            <p className="detail-acara-address">
              Jl. Taman Tirta Sunter 1 No.9, RT.8/RW.14,
              <br />
              Sunter Jaya, Kec. Tj. Priok, Jkt Utara,
              <br />
              Daerah Khusus Ibukota Jakarta 14360
            </p>
          </div>
        </div>

        {/* =====================================
            ORNAMEN BUNGA
        ====================================== */}
        <div className="detail-acara-flower-wrapper">
          <img src={flower} alt="" className="detail-acara-flower" />
        </div>

        {/* =====================================
            RESEPSI
        ====================================== */}
        <div className="detail-acara-item detail-acara-resepsi text-center">
          <h2 className="detail-acara-title">Resepsi</h2>

          <div className="detail-acara-content">
            <p className="detail-acara-date">Sabtu, 26 September 2026</p>

            <p>11.00 - 13.00 WIB</p>

            <p className="detail-acara-place">GOR SUNTER</p>

            <p className="detail-acara-address">
              Jl. Taman Tirta Sunter 1 No.9, RT.8/RW.14,
              <br />
              Sunter Jaya, Kec. Tj. Priok, Jkt Utara,
              <br />
              Daerah Khusus Ibukota Jakarta 14360
            </p>
          </div>

          <button
            type="button"
            className="btn detail-acara-map-btn"
            onClick={handleOpenMaps}
          >
            Google Maps
          </button>
        </div>

        {/* =====================================
            DRESS CODE
        ====================================== */}
        <div className="detail-dress-code text-center">
          <h2 className="detail-dress-title">Dress Code</h2>

          <p className="detail-dress-text">Pink, Brown and White</p>

          <div
            className="
              detail-dress-colors
              d-flex
              justify-content-center
              align-items-center
            "
          >
            <span className="detail-color detail-color-pink" />

            <span className="detail-color detail-color-brown" />

            <span className="detail-color detail-color-white" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default DetailAcara;
