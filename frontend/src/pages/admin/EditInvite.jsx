import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const EditInvite = () => {
  const { invitationId } = useParams();
  const [loading, setLoading] = useState(true);
  const [inv, setInv] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/invitations/${invitationId}`);
        setInv(res.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    load();
  }, [invitationId]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Memuat...</span>
        </div>
      </div>
    );
  }

  if (!inv) return <div>Undangan tidak ditemukan</div>;

  return (
    <div className="container mt-4">
      <h3>{id ? "Edit Undangan" : "Tambah Undangan"}</h3>
      <form onSubmit={handleSubmit}>
        {["groom_name", "bride_name", "wedding_date", "location", "maps_link", "description", "theme_id"].map(field => (
          <div className="mb-3" key={field}>
            <label className="form-label">{field.replace("_", " ").toUpperCase()}</label>
            {field === "description" ? (
              <textarea className="form-control" name={field} value={formData[field]} onChange={handleChange} />
            ) : (
              <input className="form-control" type={field === "wedding_date" ? "date" : "text"} name={field} value={formData[field]} onChange={handleChange} />
            )}
          </div>
        ))}
        <div className="mb-3">
          <label className="form-label">Gallery Images</label>
          <input className="form-control" type="file" multiple onChange={handleFileChange} />
        </div>
        <div className="mb-3 d-flex gap-2 flex-wrap">
          {/* Cek apakah preview adalah Array sebelum dipanggil .map, atau gunakan Array.isArray */}
          {Array.isArray(preview) && preview.map((url, idx) => ( 
            <img key={idx} src={url} alt="preview" width="100" height="100" style={{ objectFit: "cover" }} />
          ))}
        </div>
        <button className="btn btn-success me-2" type="submit">{id ? "Update" : "Simpan"}</button>
        <button className="btn btn-danger" type="cancel" onClick={handleBack}>Kembali</button>

      </form>
    </div>
  );
};

export default EditInvite;
