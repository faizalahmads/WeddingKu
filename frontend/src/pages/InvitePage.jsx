import React, { useEffect, useState } from "react";
import axios from "axios";
import { QRCodeCanvas } from "qrcode.react";
import { useParams } from "react-router-dom";

const InvitePage = () => {
  const { code } = useParams(); // ambil kode dari URL
  const [invite, setInvite] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("Kode undangan:", code);
    const fetchInvite = async () => {
      try {
        const res = await axios.get(`http://192.168.16.1:5000/api/invite/${code}`);
        console.log("API Response:", res.data);
        setInvite(res.data);
      } catch (err) {
        console.error(err);
        setError("Undangan tidak ditemukan");
      } finally {
        setLoading(false);
      }
    };

    if (code) fetchInvite();
  }, [code]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!invite) return <p>Data undangan kosong</p>;

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Undangan untuk: {invite.name || "Tamu Undangan"}</h1>
      <p>Jabatan: {invite.type}</p>
      <p>Kategori: {invite.category}</p>
      <p>
        Link Undangan:{" "}
        <a href={invite.inviteUrl} target="_blank" rel="noopener noreferrer">
          {invite.inviteUrl}
        </a>
      </p>
      <div style={{ marginTop: "20px" }}>
        <QRCodeCanvas value={invite.inviteUrl || ""} size={200} />
      </div>
    </div>
  );
};

export default InvitePage;
