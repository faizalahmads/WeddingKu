import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/css/Undangan.css";
import QRCode from "react-qr-code";
import { FaWhatsapp } from "react-icons/fa";
import axios from "axios";

const Undangan = () => {
  const { slug } = useParams();
  const location = useLocation();
  const [invite, setInvite] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const queryParams = new URLSearchParams(location.search);
  const toParam = queryParams.get("to");
  const [name, code] = toParam ? toParam.split("/"): [];

  // Cek apakah URL memiliki '/undangan/' di path-nya
  const isUndanganLink = location.pathname.includes("/undangan/");

  useEffect(() => {
    const fetchInvite = async () => {
      try {
        const res = await axios.get(`http://192.168.16.1:5000/api/undangan/${name}/${code}`);
        setInvite(res.data);
      } catch (err) {
        console.error(err);
        setError("Undangan tidak ditemukan");
      } finally {
        setLoading(false);
      }
    };
    if (name && code) fetchInvite();
  }, [code]);

  if (loading) return <p className="text-center mt-5">Loading...</p>;
  if (error) return <p className="text-center text-danger mt-5">{error}</p>;
  if (!invite) return <p className="text-center mt-5">Data undangan kosong</p>;

  let galleryImages = [];
  try {
    galleryImages = JSON.parse(invite.gallery_images || "[]");
  } catch {
    galleryImages = [];
  }

  const handleShareWhatsApp = () => {
    const link = `http://192.168.16.1:5173/${invite.groom_name}-${invite.bride_name}?to=${invite.guest_name}/${invite.guest_code}`;
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
      <div className="overlay"></div>
      <div className="content-container text-center text-white">
        <h2 className="font-script mb-3">The Wedding of</h2>
        <h1 className="font-serif couple-name"> {invite.groom_name} & {invite.bride_name} </h1>
        <p className="mb-4 date"> 
          {new Date(invite.wedding_date).toLocaleDateString("id-ID", 
          { weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric", })}
        </p>
        <div className="divider my-4"></div>
        <p className="font-light px-3">
          {invite.description || "Dengan memohon rahmat dan ridho Allah SWT, kami bermaksud menyelenggarakan pernikahan putra-putri kami."}
        </p>
        <div className="info-box mt-4">
          <h5 className="font-serif">Lokasi Acara</h5>
          <p className="font-light">{invite.location}</p>
        </div>
          {invite.maps_link && (
            <a href={invite.maps_link} target="_blank" rel="noopener noreferrer"
            className="btn btn-light mt-4 px-4" > 📍 Lihat Lokasi </a> )}
        <div className="divider my-4"></div> 
        <p className="font-light small"> Kami sangat bahagia jika Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu 💌 </p>
        <h1 className="guest-name">{invite?.guest_name || "Tamu Undangan"}</h1>
          {invite?.guest_category === "VIP" && ( <p className="guest-name">{invite.guest_category}</p> )} 
        <QRCode
          value={`http://192.168.16.1:5173/undangan/${invite.groom_name}-${invite.bride_name}?to=${invite.guest_name}/${invite.guest_code}`}
          size={180}
          className="my-3"
        />

        {/* ===== GALERI FOTO ===== */}
        <section className="gallery-section container my-5">
          <h2 className="font-script text-center mb-4 text-white">Galeri Foto</h2>
          <div className="row g-3">
            {galleryImages.length > 0 ? ( galleryImages.map((img, index) =>( 
              <div className="col-6 col-md-4" key={index}>
                <div className="gallery-item">
                  <img src="http://192.168.16.1:5000/uploads/${img}"
                  alt="galeri-${index}"
                  className="img-fluid rounded shadow" />
                </div>
              </div> )) 
              ) : ( <p className="text-center text-white">Belum ada foto galeri</p> )}
          </div>
        </section>

        {/* Tombol Bagikan hanya tampil jika URL mengandung '/undangan/' */}
        {isUndanganLink && (
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
        )}
      </div>

      {/* Galeri, footer, dll */}
    </div>
  );
};

export default Undangan;
