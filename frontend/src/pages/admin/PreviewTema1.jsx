import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../assets/css/Undangan.css";
import QRCode from "react-qr-code";
import { FaWhatsapp } from "react-icons/fa";
import axios from "axios";

const PreviewTema1 = () => {
  const navigate = useNavigate();
  const { slug } = useParams();
  const location = useLocation(); //
  const [invite, setInvite] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const queryParams = new URLSearchParams(location.search);
  const toParam = queryParams.get("to");
  const [name, code] = toParam ? toParam.split("/"): [];

  // Cek apakah URL memiliki '/undangan/' di path-nya
  const isUndanganLink = location.pathname.includes("/undangan/");

  const handleShareWhatsApp = () => {
    const link = `http://localhost:5173/${invite.groom_name}-${invite.bride_name}?to=${invite.guest_name}/${invite.guest_code}`;
    const message = `
Kepada Yth.
Bapak/Ibu/Saudara/i

Dengan penuh sukacita, kami mengundang Anda ke hari bahagia kami:

💑 ${invite.groom_name} & ${invite.bride_name}
📅 ${new Date(invite.wedding_date).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })}
📍 ${invite.location}

Klik link berikut untuk melihat undangan:
${link}

Terima kasih 💖
    `;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/?text=${encodedMessage}`, "_blank");
  };

  return (
    <div className="undangan-page d-flex flex-column">
        <button
            onClick={() => navigate("/admin/undangan-saya")}
            className="btn btn-light position-absolute top-0 start-0 m-3"
        >
            ← Kembali
        </button>
      <div className="overlay"></div>
      <div className="content-container text-center text-white">
        <h2 className="font-script mb-3">The Wedding of</h2>
        <h1 className="font-serif couple-name"> Rahmat & Jani </h1>
        <p className="mb-4 date">26 Desember 2025</p>
        <div className="divider my-4"></div>
        <p className="font-light px-3">
          Dengan memohon rahmat dan ridho Allah SWT, kami bermaksud menyelenggarakan pernikahan putra-putri kami.
        </p>
        <div className="info-box mt-4">
          <h5 className="font-serif">Lokasi Acara</h5>
          <p className="font-light">Gedung Serba Guna Pertamina</p>
        </div>
            <a href="https://share.google/RGCrNomQR9vhPeaxL" target="_blank" rel="noopener noreferrer"
            className="btn btn-light mt-4 px-4" > 📍 Lihat Lokasi </a>
        <div className="divider my-4"></div> 
        <p className="font-light small"> Kami sangat bahagia jika Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu 💌 </p>
        <h1 className="guest-name">Sumarji dan Partner</h1>
          {/* {invite?.guest_category === "VIP" && ( <p className="guest-name">{invite.guest_category}</p> )}  */}
        <QRCode
          value={`http://localhost:5173/preview`}
          size={180}
          className="my-3"
        />
          <div className="whatsapp-float-container">
            <span className="whatsapp-label">Bagikan Undangan</span>
            <button
              onClick={handleShareWhatsApp}
              className="whatsapp-float-btn"
              title="Bagikan via WhatsApp"
            >
              <FaWhatsapp size={28} />
            </button>
          </div>
      </div>

      {/* Galeri, footer, dll */}
    </div>
  );
};

export default PreviewTema1;
