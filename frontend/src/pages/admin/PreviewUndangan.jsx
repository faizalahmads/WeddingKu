import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../../assets/css/undangan.css";

const PreviewUndangan = () => {
  const { code } = useParams();
  const [invitation, setInvitation] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/themes");
        setThemes(res.data);
      } catch (err) {
        console.error("Gagal mengambil data tema:", err);
      }
    };
    fetchData();
  }, []);


  if (!invitation) {
    return (
      <div className="fullscreen d-flex justify-content-center align-items-center text-white bg-dark">
        <h3>Memuat undangan...</h3>
      </div>
    );
  }

  return (
    <div className="fullscreen preview-undangan d-flex flex-column justify-content-center align-items-center text-center text-white">
      <div className="overlay"></div>
      <div className="content-container position-relative">
        <h2 className="font-script mb-4">{invitation.title}</h2>
        <h3 className="mb-3">{invitation.groom_name} & {invitation.bride_name}</h3>
        <p className="mb-1">Tanggal: {new Date(invitation.wedding_date).toLocaleDateString("id-ID")}</p>
        <p className="mb-1">Lokasi: {invitation.location}</p>
        {invitation.maps_link && (
          <a
            href={invitation.maps_link}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-light mt-3"
          >
            Lihat di Google Maps
          </a>
        )}
      </div>
    </div>
  );
};

export default PreviewUndangan;
