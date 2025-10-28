import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const ManageInvite = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "Undangan Pernikahan",
    bride_name: "",
    groom_name: "",
    wedding_date: "",
    location: "",
    maps_link: "",
    description: "",
    theme_id: parseInt(localStorage.getItem("selectedTheme") || 1),
  });

  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Mengecek apakah admin sudah punya undangan
  useEffect(() => {
    const checkExistingInvitation = async () => {
      const adminId = localStorage.getItem("admin_id");
      if (!adminId) {
        alert("Admin belum login!");
        navigate("/login");
        return;
      }

      try {
        const res = await axios.get(`http://localhost:5000/api/undangan/admin/${adminId}`);
        if (res.data && res.data.id) {
          // ✅ Jika undangan sudah ada, arahkan ke halaman edit undangan
          alert("Anda sudah memiliki undangan. Mengarahkan ke halaman edit...");
          navigate(`/admin/edit-invite/${res.data.id}`);
        } else {
          // ✅ Jika belum ada undangan, tampilkan form
          setLoading(false);
        }
      } catch (err) {
        console.error("Gagal memeriksa undangan:", err);
        setLoading(false);
      }
    };

    checkExistingInvitation();
  }, [navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpload = (e) => {
    setImages([...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.theme_id) {
      alert("Pilih tema undangan terlebih dahulu!");
      return;
    }

    const adminId = localStorage.getItem("admin_id");
    const token = localStorage.getItem("token"); // ✅ tambahkan ini

    const data = new FormData();
    Object.entries(form).forEach(([key, value]) => data.append(key, value));
    data.append("admin_id", adminId);
    images.forEach((img) => data.append("images[]", img));

    try {
      const res = await axios.post("http://localhost:5000/api/undangan", data, {
        headers: {
          "Authorization": `Bearer ${token}`, // ✅ token pasti terisi
          "Content-Type": "multipart/form-data",
        },
      });

      alert("✅ Data undangan berhasil disimpan!");
      console.log(res.data);
      navigate(`/preview-undangan/${form.theme_id}`);
    } catch (err) {
      alert("❌ Gagal menyimpan undangan");
      console.error("DETAIL ERROR:", err.response?.data || err.message);
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div>Memeriksa data undangan...</div>
      </div>
    );
  }

  return (
    <div className="d-flex flex-column min-vh-100 bg-light">
      <Navbar />
      <div className="container py-5">
        <h2 className="mb-4 text-center">Manajemen Undangan</h2>
        <form onSubmit={handleSubmit} className="shadow p-4 bg-white rounded">
          <div className="row">
            <div className="col-md-6 mb-3">
              <label>Nama Pengantin Pria</label>
              <input
                type="text"
                name="groom_name"
                value={form.groom_name}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            <div className="col-md-6 mb-3">
              <label>Nama Pengantin Wanita</label>
              <input
                type="text"
                name="bride_name"
                value={form.bride_name}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
          </div>

          <div className="mb-3">
            <label>Tanggal Pernikahan</label>
            <input
              type="date"
              name="wedding_date"
              value={form.wedding_date}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <div className="mb-3">
            <label>Lokasi Acara</label>
            <input
              type="text"
              name="location"
              value={form.location}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <div className="mb-3">
            <label>Link Google Maps</label>
            <input
              type="text"
              name="maps_link"
              value={form.maps_link}
              onChange={handleChange}
              className="form-control"
            />
          </div>

          <div className="mb-3">
            <label>Deskripsi Tambahan</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              className="form-control"
              rows="3"
            />
          </div>

          <div className="mb-3">
            <label>Upload Galeri</label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleUpload}
              className="form-control"
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Simpan & Preview
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default ManageInvite;
