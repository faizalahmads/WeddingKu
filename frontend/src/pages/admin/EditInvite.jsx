import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const EditInvite = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    groom_name: "",
    bride_name: "",
    wedding_date: "",
    location: "",
    maps_link: "",
    description: "",
    theme_id: "",
  });
  const [images, setImages] = useState([]);
  const [preview, setPreview] = useState([]);
  const [loading, setLoading] = useState(false);

  // Ambil data jika id tersedia (edit) atau cek selectedTheme
  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        setLoading(true);
        try {
          const res = await axios.get(`http://localhost:5000/api/admin/${id}`);
          setFormData(res.data);
          setPreview(res.data.gallery_images || []);
        } catch (err) {
          console.error(err);
          alert("Gagal mengambil data undangan");
        } finally {
          setLoading(false);
        }
      } else {
        const savedThemeId = localStorage.getItem("selectedTheme");
        if (savedThemeId) {
          setFormData(prev => ({ ...prev, theme_id: savedThemeId }));
        }
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);

    // preview
    const urls = files.map(file => URL.createObjectURL(file));
    setPreview(urls);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    Object.keys(formData).forEach(key => data.append(key, formData[key]));
    images.forEach(img => data.append("images[]", img));

    try {
      let res;
      if (id) {
        res = await axios.put(`http://localhost:5000/api/undangan/${id}`, data);
        alert("Undangan berhasil diupdate");
      } else {
        res = await axios.post("http://localhost:5000/api/undangan", data);
        alert("Undangan berhasil dibuat");

        // Ambil id baru dari response dan set sebagai id di URL (optional)
        const newId = res.data.id;
        navigate(`/admin/edit-invite/${newId}`, { replace: true });
      }

      // Ambil data terbaru dari API agar form menampilkan data terkini
      const updatedId = id || res.data.id;
      const updatedRes = await axios.get(`http://localhost:5000/api/undangan/${updatedId}`);
      setFormData(updatedRes.data);
      setPreview(updatedRes.data.gallery_images || []);
      setImages([]); // reset input file setelah upload
    } catch (err) {
      console.error(err);
      alert("Gagal menyimpan undangan");
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate("/admin/undangan-saya");
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Memuat...</span>
        </div>
      </div>
    );
  }

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
