import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useParams, useSearchParams  } from "react-router-dom";
import "../../assets/css/ManageInvite.css"
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import StepProgress from "../../components/StepProgress";
import ToggleSwitch from "../../components/ToggleSwitch";
import UploadFoto from "../../components/UploadFoto";

const ManageInvite = () => {
  const navigate = useNavigate();
  const { invitationId } = useParams();
  const [searchParams] = useSearchParams();

  const [loading, setLoading] = useState(true);
  const [invitation, setInvitation] = useState(null);

  const [showGroomParent, setShowGroomParent] = useState(true);
  const [showBrideParent, setShowBrideParent] = useState(true);

  const [preview, setPreview] = useState({
    groom_img: null,
    bride_img: null
  });


  const handleToggleGroom = (value) => {
    setShowGroomParent(value);
  };

  const handleToggleBride = (value) => {
    setShowBrideParent(value);
  };

  const handleFileChange = (file, field) => {
    setForm(prev => ({ ...prev, [field]: file }));

    setPreview(prev => ({
      ...prev,
      [field]: file ? URL.createObjectURL(file) : null
    }));
  };

  const [form, setForm] = useState({
    title: "Undangan Pernikahan",
    bride_name: "",
    groom_name: "",
    wedding_date: "",
    location: "",
    maps_link: "",
    description: "",
    theme_id: null,
    groom_img: null,
    bride_img: null,
  });

  const [step, setStep] = useState(1);
  const [images, setImages] = useState([]);

  const adminId = localStorage.getItem("admin_id");

  useEffect(() => {
    const load = async () => {
      if (!adminId) {
        alert("Admin belum login!");
        navigate("/login");
        return;
      }

      try {
        const res = await axios.get(`http://localhost:5000/api/invitations/${invitationId}`);
        const inv = res.data;
        setInvitation(inv);

        if (inv.current_step >= 1 && inv.current_step <= 3) {
          setStep(inv.current_step);
        }
        else {
          setStep(1);
        }

        setForm({
          title: inv.title ?? "Undangan Pernikahan",
          bride_name: inv.bride_name ?? "",
          groom_name: inv.groom_name ?? "",
          wedding_date: inv.wedding_date ?? "",
          location: inv.location ?? "",
          maps_link: inv.maps_link ?? "",
          description: inv.description ?? "",
          theme_id: inv.theme_id ?? null,

          groom_parent: inv.groom_parent ?? "",
          bride_parent: inv.bride_parent ?? "",
          groom_sosmed: inv.groom_sosmed ?? "",
          bride_sosmed: inv.bride_sosmed ?? "",
          groom_img: inv.groom_img ?? "",
          bride_img: inv.bride_img ?? "",
        });

        setLoading(false);
      } catch (err) {
        console.error(err);
        alert("Gagal memuat undangan. Kembali ke halaman tema.");
        navigate("/admin/undangan-saya");
      }
    };

    load();
  }, [invitationId, adminId]);

  const handleToggle = (value) => {
    console.log("toggle:", value);
  };

  const isComplete = () => {
    return (
      form.groom_name &&
      form.bride_name &&
      form.wedding_date &&
      form.location &&
      form.groom_img &&
      form.bride_img
    );
  };

  const saveDraft = useCallback(async () => {
    if (!invitationId) return;

    try {
      await axios.put(`http://localhost:5000/api/invitations/${invitationId}`, {
        ...form,
        showGroomParent,
        showBrideParent,
        current_step: step,
      });
    } catch (err) {
      console.error("Gagal menyimpan draft:", err);
    }
  }, [invitationId, form, step, showGroomParent, showBrideParent]);

  const nextStep = async () => {
    const newStep = Math.min(step + 1, 5);
    setStep(newStep);
    await saveDraft({ current_step: newStep });
  };

  const prevStep = async () => {
    const newStep = Math.max(step - 1, 1);
    setStep(newStep);
    await saveDraft({ current_step: newStep });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleCreateInvitation = async () => {
    const formData = new FormData();
    formData.append("groom_name", form.groom_name);
    formData.append("groom_img", form.groom_img);
    formData.append("groom_parent", form.groom_parent);
    formData.append("bride_name", form.bride_name);
    formData.append("bride_img", form.bride_img);
    formData.append("bride_parent", form.bride_parent);
    formData.append("wedding_date", form.wedding_date);
    formData.append("location", form.location);
    formData.append("maps_link", form.maps_link);
    formData.append("theme_id", form.theme_id);

    // upload images[]
    images.forEach((img) => {
      formData.append("images[]", img);
    });

    try {
      const res = await axios.post("http://localhost:5000/api/undangan", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });

      alert("Undangan berhasil dibuat!");
      navigate(`/admin/manage/${res.data.id}`);
    } catch (err) {
      console.error(err);
      alert("Gagal membuat undangan");
    }
  };

  const handleUpdateInvitation = async () => {
    try {
      const formData = new FormData();

      Object.entries(form).forEach(([key, val]) => {
          // Cek apakah ini field gambar
        if (key === "groom_img" || key === "bride_img") {
            // HANYA kirim ke backend jika itu adalah File (gambar baru)
        if (val instanceof File) {
          formData.append(key, val);
        }
              // JANGAN kirim jika val adalah string (gambar lama) atau null
        } else {
              // Field normal tetap dikirim
        formData.append(key, val);
      }
    });

    formData.append("current_step", step);
      
      // Tambahkan logic untuk menangani pengiriman string/null untuk gambar
      // Ini penting jika backend Anda perlu tahu bahwa gambar lama harus dihapus/diganti
      // Namun, jika backend Anda hanya memproses file, logika di atas sudah cukup 
      // untuk file baru. Untuk string/null, biarkan backend memproses body biasa.

      await axios.put(
        `http://localhost:5000/api/undangan/${invitationId}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

       alert("Undangan berhasil diupdate");
    } catch (err) {
      console.error(err);
      alert("Gagal update undangan");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!invitationId) {
      await handleCreateInvitation();
    } else {
      await handleUpdateInvitation();
    }

    await saveDraft();

    if (step < 3) {
      setStep(step + 1);
    }
  };

  useEffect(() => {
    const handler = async (e) => {
      await saveDraft();
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [saveDraft]);

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
        <form onSubmit={handleSubmit} className="border-manage shadow p-4 bg-white">
          <button type="button" className="btn btn-secondary" onClick={prevStep}>Kembali</button>
          <StepProgress currentStep={step} />
          {step === 1 && (
            <>
              <div className="mb-3">
                <label className="sub-judul fw-bold mb-2 required">Deskripsi</label>
                <textarea
                  type="text"
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="sub-judul fw-bold mb-2 required">Nama Pengantin Pria</label>
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
                  <label className="sub-judul fw-bold mb-2 required">Nama Pengantin Wanita</label>
                  <input
                    type="text"
                    name="bride_name"
                    value={form.bride_name}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>

                <div className="col-md-6 d-flex justify-content-start sub-judul fw-bold mb-3 required">
                  <UploadFoto
                    name="groom_img"
                    label="Foto Pengantin Pria"
                    size={130}
                    defaultImage={
                      form?.groom_img ? `http://localhost:5000${form.groom_img}` : null}
                    onChange={(file) => handleFileChange(file, "groom_img")}
                  />
                </div>

                <div className="col-md-6 d-flex justify-content-start sub-judul fw-bold mb-3 required">
                  <UploadFoto
                    name="bride_img"
                    label="Foto Pengantin Wanita"
                    size={130}
                    defaultImage={
                      form?.bride_img ? `http://localhost:5000${form.bride_img}` : null
                    }
                    onChange={(file) => handleFileChange(file, "bride_img")}
                  />
                </div>
                
                <div className="col-md-6 d-flex justify-content-start mb-2">
                  <ToggleSwitch
                    label="Nama Orang Tua Pria"
                    optionLeft="OFF"
                    optionRight="ON"
                    defaultValue={true}
                    onChange={handleToggleGroom}
                  />
                </div>

                <div className="col-md-6 d-flex justify-content-start mb-2">
                  <ToggleSwitch
                    label="Nama Orang Tua Wanita"
                    optionLeft="OFF"
                    optionRight="ON"
                    defaultValue={true}
                    onChange={handleToggleBride}
                  />
                </div>

                {showGroomParent && (
                  <div className="col-md-6 mb-3">
                    <textarea
                      name="groom_parent"
                      value={form.groom_parent}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>
                )}

                {showBrideParent && (
                  <div className="col-md-6 mb-3">
                    <textarea
                      name="bride_parent"
                      value={form.bride_parent}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>
                )}

                <div className="col-md-6 mb-3">
                  <label className="sub-judul fw-bold mb-2">Instagram</label>
                  <input
                    type="text"
                    name="groom_sosmed"
                    value={form.groom_sosmed}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
                
                <div className="col-md-6 mb-3">
                  <label className="sub-judul fw-bold mb-2">Instagram</label>
                  <input
                    type="text"
                    name="bride_sosmed"
                    value={form.bride_sosmed}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
              </div>
              <button type="submit" className="btn-simpan">Simpan & Lanjut</button>
            </>
          )}

          {step === 2 && (
            <div>
              <h5>Step 2: Detail Acara</h5>
              <div className="mb-3">
                <label className="fw-bold">Tanggal Pernikahan</label>
                <input type="date" name="wedding_date" value={form.wedding_date} onChange={handleChange} className="form-control" />
              </div>
              <button type="submit" className="btn-simpan">Simpan & Lanjut</button>
            </div>
          )}

          {step === 3 && (
            <div>
              <h5>Step 3: Preview & Selesaikan</h5>
              <p>Preview tema: {form.theme_id}</p>
              <button type="submit" className="btn-simpan">Selesaikan Undangan</button>
            </div>
          )}
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default ManageInvite;
