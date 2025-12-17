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
import UploadFile from "../../components/UploadFile";
import bankList from "../../assets/data/bankList";

const ManageInvite = () => {
  const navigate = useNavigate();
  const { invitationId } = useParams();
  const [searchParams] = useSearchParams();

  const [loading, setLoading] = useState(true);
  const [invitation, setInvitation] = useState(null);

  const [mainEvents, setMainEvents] = useState([
      { type: 'Akad', title: '', date: '', start_time: '', end_time: '', location: '', maps_link: '' },
      { type: 'Resepsi', title: '', date: '', start_time: '', end_time: '', location: '', maps_link: '' }
  ]);
  const [extraEvents, setExtraEvents] = useState([]);

  const [showGroomParent, setShowGroomParent] = useState(true);
  const [showBrideParent, setShowBrideParent] = useState(true);
  const [isSameDate, setIsSameDate] = useState(true);
  const [isSameDateAdd, setIsSameDateAdd] = useState(true);
  const [showExtraEvent, setShowExtraEvent] = useState(false);
  const [isCustom, setIsCustom] = useState(true);
  const [showBank, setShowBank] = useState(true);
  const [useStory, setUseStory] = useState(true);
  const [stories, setStories] = useState([
    { title: "", description: "", image: null }
  ]);
  const [showLogo, setUseLogo] = useState(true);
  const [showCoverMobile, setUseCoverMobile] = useState(true);
  const [showCoverDesktop, setUseCoverDesktop] = useState(true);
  const [completedStep, setCompletedStep] = useState(1);



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

  const handleToggleDate = (value) => {
    setIsSameDate(value);
  };

  const handleToggleDateAdd = (value) => {
    setIsSameDateAdd(value);
  };

  const handleToggleExtraEvent = (value) => {
    setShowExtraEvent(value);
  };

  const handleToggleBank = (value) => {
    setShowBank(value);
  };

  const handleToggleFile = (value) => {
    setIsCustom(value); 
  };

  const handleToggleStory = (value) => {
    setUseStory(value);
  };

  const addStoryCard = () => {
    setStories([
      ...stories,
      { title: "", description: "", image: null }
    ]);
  };

  const removeStoryCard = (index) => {
    const updated = stories.filter((_, i) => i !== index);
    setStories(updated);
  };

  const handleToggleLogo = (value) => {
    setUseLogo(value);
  };

  const handleToggleCoverMobile = (value) => {
    setUseCoverMobile(value);
  };

  const handleToggleCoverDesktop = (value) => {
    setUseCoverDesktop(value);
  };

  const handleFileChange = (file, field) => {
    setForm(prev => ({ ...prev, [field]: file }));

    setPreview(prev => ({
      ...prev,
      [field]: file ? URL.createObjectURL(file) : null
    }));
  };

  const [form, setForm] = useState({
    couple_name: "",
    bride_name: "",
    groom_name: "",
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

        if (inv.events && inv.events.length > 0) {
          const loadedMainEvents = [];
          const loadedExtraEvents = [];
          let hasExtra = false;

          inv.events.forEach(e => {
            const eventData = {
                id: e.id,                       // <-- WAJIB supaya ID tidak berubah
                type: e.type,
                title: e.title || '',
                date: e.date || '',
                start_time: e.start_time || '',
                end_time: e.end_time || '',
                location: e.location || '',
                maps_link: e.maps_link || ''
            };

            if (e.type === 'Akad' || e.type === 'Resepsi') {
                loadedMainEvents.push(eventData);
            } else {
                loadedExtraEvents.push(eventData);
                hasExtra = true;
            }
        });

          // Set Main Events (Pastikan Akadem dan Resepsi urut)
          if (loadedMainEvents.length > 0) {
              setMainEvents(loadedMainEvents);
          }

          // Set Extra Events
          setExtraEvents(loadedExtraEvents);
          setShowExtraEvent(hasExtra);

          // Tentukan isSameDate berdasarkan data yang dimuat
          const akad = loadedMainEvents.find(e => e.type === 'Akad');
          const resepsi = loadedMainEvents.find(e => e.type === 'Resepsi');
          if (akad && resepsi && akad.date !== resepsi.date) {
              setIsSameDate(false);
          } else {
              setIsSameDate(true);
          }
      }

        setCompletedStep(inv.current_step);

        if (inv.current_step >= 1 && inv.current_step < 5) {
          setStep(inv.current_step + 1);
        } else {
          setStep(5);
        }


        setForm({
          couple_name: inv.couple_name ?? "",
          bride_name: inv.bride_name ?? "",
          groom_name: inv.groom_name ?? "",
          akad_date: inv.akad_date ? inv.akad_date.slice(0, 10) : "",
          resepsi_date: inv.resepsi_date ? inv.resepsi_date.slice(0, 10) : "",
          wedding_date: inv.wedding_date ? inv.wedding_date.slice(0, 10) : "",
          deskripsi_kasih: inv.deskripsi_kasih ?? "",
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
    await saveDraft();
  };

  const prevStep = async () => {
    const newStep = Math.max(step - 1, 1);
    setStep(newStep);
    await saveDraft();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleCreateInvitation = async () => {
    const formData = new FormData();
    formData.append("couple_name", form.couple_name);
    formData.append("groom_name", form.groom_name);
    formData.append("groom_img", form.groom_img);
    formData.append("groom_parent", form.groom_parent);
    formData.append("bride_name", form.bride_name);
    formData.append("bride_img", form.bride_img);
    formData.append("bride_parent", form.bride_parent);
    formData.append("akad_date", form.akad_date);
    formData.append("resepsi_date", form.resepsi_date);
    formData.append("wedding_date", form.wedding_date);
    formData.append("deskripsi_kasih", form.deskripsi_kasih);
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

      const allEvents = [...mainEvents];
      if (showExtraEvent) {
            allEvents.push(...extraEvents);
      }

      formData.append("events", JSON.stringify(allEvents));

      Object.entries(form).forEach(([key, val]) => {
            if (key === "groom_img" || key === "bride_img") {
                if (val instanceof File) {
                    formData.append(key, val);
                }
            } else {
                formData.append(key, val);
            }
        });

    formData.append("current_step", step);

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

  const handleEventChange = (index, field, value, isExtra = false) => {
      const setState = isExtra ? setExtraEvents : setMainEvents;
      setState(prevEvents => prevEvents.map((event, i) => {
          if (i === index) {
              return { ...event, [field]: value };
          }
          return event;
      }));
  };

  const addExtraEvent = () => {
      setExtraEvents(prevEvents => [
          ...prevEvents,
          {
              type: 'Tambahan',
              title: '',
              date: '',
              start_time: '',
              end_time: '',
              location: '',
              maps_link: '',
          },
      ]);
  };

  const removeExtraEvent = (indexToRemove) => {
      setExtraEvents(prevEvents => prevEvents.filter((_, i) => i !== indexToRemove));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!invitationId) {
      await handleCreateInvitation();
    } else {
      await handleUpdateInvitation();
    }

    await saveDraft();

    if (step < 5) {
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
          <div className="d-flex justify-content-between mb-3">
            {step > 1 ? (
              <button 
                type="button" 
                className="btn btn-secondary"
                onClick={prevStep}
              >
                Back
              </button>
            ) : (
              <div></div>
            )}

            {step < 5 && (
              <button 
                type="button" 
                className="btn btn-primary"
                onClick={nextStep}
              >
                Next
              </button>
            )}
          </div>

          <StepProgress activeStep={step} completedStep={completedStep} />
          {step === 1 && (
            <>
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
                    width={130}
                    height={130}
                    defaultImage={
                      form?.groom_img ? `http://localhost:5000${form.groom_img}` : null}
                    onChange={(file) => handleFileChange(file, "groom_img")}
                  />
                </div>

                <div className="col-md-6 d-flex justify-content-start sub-judul fw-bold mb-3 required">
                  <UploadFoto
                    name="bride_img"
                    label="Foto Pengantin Wanita"
                    width={130}
                    height={130}
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

                {showGroomParent ? (
                  <div className="col-md-6 mb-3">
                    <textarea
                      name="groom_parent"
                      value={form.groom_parent}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>
                ) : (
                  <div className="col-md-6 mb-3">
                    <p className="text-muted fst-italic">Tidak menggunakan Nama Orang Tua</p>
                  </div>
                )}

                {showBrideParent ? (
                  <div className="col-md-6 mb-3">
                    <textarea
                      name="bride_parent"
                      value={form.bride_parent}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>
                ) : (
                  <div className="col-md-6 mb-3">
                    <p className="text-muted fst-italic">Tidak menggunakan Nama Orang Tua</p>
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
              <button type="submit" className="btn-simpan">Simpan</button>
            </>
          )}

          {step === 2 && (
            <div>
              <div className="mb-3">
                <label className="sub-judul fw-bold mb-2 required">Deskripsi</label>
                <textarea
                  type="text"
                  name="deskripsi_kasih"
                  value={form.deskripsi_kasih}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>

              <div className="mb-3">
                <label className="sub-judul fw-bold mb-2 required">Lokasi</label>
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
                <label className="sub-judul fw-bold mb-2 required">maps</label>
                <input
                  type="text"
                  name="maps_link"
                  value={form.maps_link}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>

              <div className="col-md-6 d-flex justify-content-start mb-2">
                <ToggleSwitch
                  label="Tanggal Akad dan Resepsi Sama"
                  optionLeft="Tidak"
                  optionRight="Ya"
                  defaultValue={true}
                  onChange={handleToggleDate}
                />
              </div>

              {isSameDate && (
                <div className="mb-3">
                  <label className="sub-judul fw-bold mb-2 required">Tanggal</label>
                  <input
                    type="date"
                    name="wedding_date"
                    value={form.wedding_date}
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                </div>
              )}

              {!isSameDate && (
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="sub-judul fw-bold mb-2 required">Tanggal Akad</label>
                    <input
                      type="date"
                      name="akad_date"
                      value={form.akad_date}
                      onChange={handleChange}
                      className="form-control"
                      required
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="sub-judul fw-bold mb-2 required">Tanggal Resepsi</label>
                    <input
                      type="date"
                      name="resepsi_date"
                      value={form.resepsi_date}
                      onChange={handleChange}
                      className="form-control"
                      required
                    />
                  </div>
                </div>
              )}
              
              <div className="row">
                <div className="col-md-6">
                  <label className="sub-judul fw-bold mb-2 required">Jam Akad</label>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <input
                        type="time"
                        name="start_time"
                        value={mainEvents[0].start_time}
                        onChange={(e) => handleEventChange(0, 'start_time', e.target.value)}
                        className="form-control"
                        placeholder="Mulai"
                        required
                      />
                    </div>

                    <div className="col-md-6 mb-3">
                      <input
                        type="time"
                        name="end_time"
                        value={mainEvents[0].end_time}
                        onChange={(e) => handleEventChange(0, 'end_time', e.target.value)}
                        className="form-control"
                        placeholder="Akhir"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="col-md-6">
                  <label className="sub-judul fw-bold mb-2 required">Jam Resepsi</label>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <input
                        type="time"
                        name="start_time"
                        value={mainEvents[1].start_time}
                        onChange={(e) => handleEventChange(1, 'start_time', e.target.value)}
                        className="form-control"
                        placeholder="Mulai"
                        required
                      />
                    </div>

                    <div className="col-md-6 mb-3">
                      <input
                        type="time"
                        name="end_time"
                        value={mainEvents[1].end_time} 
                        onChange={(e) => handleEventChange(1, 'end_time', e.target.value)}
                        className="form-control"
                        placeholder="Akhir"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Sementara Hold untuk Opsi Add Acara lainnya */}
              {/* <div className="col-md-6 d-flex justify-content-start mb-2">
                <ToggleSwitch
                  label="Tambah Acara Lainnya"
                  optionLeft="OFF"
                  optionRight="ON"
                  defaultValue={false}
                  onChange={handleToggleExtraEvent}
                />
              </div>

              {showExtraEvent && (
              <>
                <div className="mb-3">
                  <label className="sub-judul fw-bold mb-2">Lokasi Tambahan</label>
                  <input
                    type="text"
                    name="location"
                    value={form.location}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>

                <div className="mb-3">
                  <label className="sub-judul fw-bold mb-2">Maps Tambahan</label>
                  <input
                    type="text"
                    name="maps_link"
                    value={form.maps_link}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>

                <div className="col-md-6 d-flex justify-content-start mb-2">
                  <ToggleSwitch
                    label="Tanggal Akad dan Resepsi Sama"
                    optionLeft="Tidak"
                    optionRight="Ya"
                    defaultValue={true}
                    onChange={handleToggleDateAdd}
                  />
                </div>

                {isSameDateAdd ? (
                    <div className="mb-3">
                        <label className="sub-judul fw-bold mb-2 required">Tanggal</label>
                        <input
                            type="date"
                            value={mainEvents[0].date} 
                            onChange={(e) => {
                                const newDate = e.target.value;
                                handleEventChange(0, 'date', newDate);
                                handleEventChange(1, 'date', newDate); 
                            }}
                            className="form-control"
                            required
                        />
                    </div>
                ) : (
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label className="sub-judul fw-bold mb-2 required">Tanggal Akad Tambahan</label>
                            <input type="date" value={mainEvents[0].date} onChange={(e) => handleEventChange(0, 'date', e.target.value)} className="form-control" required />
                        </div>
                        <div className="col-md-6 mb-3">
                            <label className="sub-judul fw-bold mb-2 required">Tanggal Resepsi Tambahan</label>
                            <input type="date" value={mainEvents[1].date} onChange={(e) => handleEventChange(1, 'date', e.target.value)} className="form-control" required />
                        </div>
                    </div>
                )}

                  <div className="row">
                    <div className="col-md-6">
                      <label className="sub-judul fw-bold mb-2">Jam Akad Tambahan</label>
                      <div className="row">
                        <div className="col-md-6 mb-3">
                          <input
                            type="time"
                            name="akad_start"
                            value={form.akad_start}
                            onChange={handleChange}
                            className="form-control"
                          />
                        </div>

                        <div className="col-md-6 mb-3">
                          <input
                            type="time"
                            name="akad_end"
                            value={form.akad_end}
                            onChange={handleChange}
                            className="form-control"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <label className="sub-judul fw-bold mb-2">Jam Resepsi Tambahan</label>
                      <div className="row">
                        <div className="col-md-6 mb-3">
                          <input
                            type="time"
                            name="resepsi_start"
                            value={form.resepsi_start}
                            onChange={handleChange}
                            className="form-control"
                          />
                        </div>

                        <div className="col-md-6 mb-3">
                          <input
                            type="time"
                            name="resepsi_end"
                            value={form.resepsi_end} //Blm dibuat di DB
                            onChange={handleChange}
                            className="form-control"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )} */}

              <button type="submit" className="btn-simpan">Simpan</button>
            </div>
          )}

          {step === 3 && (
            <div>
              <div className="col-md-6 d-flex justify-content-start mb-2">
                <ToggleSwitch
                  label="Lagu" //Blm dibuat di DB untuk musik
                  optionLeft="Template"
                  optionRight="Custom"
                  defaultValue={true}
                  onChange={handleToggleFile}
                  switchWidth={120}
                  handleWidth={60}
                />
              </div>
              {isCustom && (
                <UploadFile
                  onFileSelect={(file) => {
                    console.log("File dipilih:", file);
                  }}
                />
              )}

              <div className="mb-3">
                <label className="sub-judul fw-bold mb-2 required">Deskripsi</label>
                <textarea
                  type="text"
                  name="closing_deskripsi" // Blm dibuat di BE
                  value={form.closing_deskripsi}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>

              <div className="mb-3">
                <label className="sub-judul fw-bold required">Galeri Foto</label> 
                <label className="w-100 text-center text-muted small mb-2 d-block">
                  Silahkan upload beberapa gambar disini Max 5 Mb (Jpg, jpeg, png)
                </label>
                <UploadFile
                  label="Silahkan Drag & Drop Lagu atau Browse File untuk di upload"
                  width="100%"
                  height="70px"
                  onFileSelect={(file) => {
                    console.log("File dipilih:", file); //Blm dibuat di DB
                  }}
                />
              </div>

              <div className="col-md-6 d-flex justify-content-start mt-4 mb-2">
                <ToggleSwitch
                  label="Bank"
                  optionLeft="OFF"
                  optionRight="ON"
                  defaultValue={true}
                  onChange={handleToggleBank}
                />
              </div>
              {showBank && (
                <div className="row">
                  <div className="col-md-6 mb-2">
                    <label className="judul fw-bold required">Pria</label>
                  </div>
                  <div className="col-md-6 mb-2">
                    <label className="judul fw-bold required">Wanita</label>
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="sub-judul fw-bold mb-2">Nama Bank</label>
                    <select
                      name="groom_bank"
                      value={form.groom_bank} //Blm dibuat di BE
                      onChange={handleChange}
                      className="form-select"
                    >
                      <option value="">-- Pilih Bank --</option>
                      {bankList.map((bank, index) => (
                        <option key={index} value={bank}>
                          {bank}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="sub-judul fw-bold mb-2">Nama Bank</label>
                    <select
                      name="bride_bank"
                      value={form.bride_bank} //Blm dibuat di BE
                      onChange={handleChange}
                      className="form-select"
                    >
                      <option value="">-- Pilih Bank --</option>
                      {bankList.map((bank, index) => (
                        <option key={index} value={bank}>
                          {bank}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="sub-judul fw-bold mb-2">No Rekening</label>
                    <input
                      type="text"
                      name="groom_norek"
                      value={form.groom_norek}
                      onChange={(e) => {
                        const onlyNums = e.target.value.replace(/[^0-9]/g, "");
                        handleChange({
                          target: {
                            name: "groom_norek",
                            value: onlyNums
                          }
                        });
                      }}
                      className="form-control"
                    />

                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="sub-judul fw-bold mb-2">No Rekening</label>
                    <input
                      type="text"
                      name="bride_norek"
                      value={form.bride_norek}
                      onChange={(e) => {
                        const onlyNums = e.target.value.replace(/[^0-9]/g, "");
                        handleChange({
                          target: {
                            name: "bride_norek",
                            value: onlyNums
                          }
                        });
                      }}
                      className="form-control"
                    />

                  </div>
                </div>
              )}

              <button type="submit" className="btn-simpan">Simpan</button>
            </div>
          )}
         
          {step === 4 && (
            <div>
              <div className="col-md-6 d-flex justify-content-start mt-4 mb-2">
                <ToggleSwitch
                  label="Cerita Cinta"
                  optionLeft="OFF"
                  optionRight="ON"
                  defaultValue={true}
                  onChange={handleToggleStory}
                />
              </div>

              {!useStory && (
                <p className="text-muted fst-italic mb-4">
                  Tidak Menggunakan Cerita Cinta
                </p>
              )}

              {useStory && (
                <>
                  {stories.map((story, index) => (
                    <div className="story-card mb-4 position-relative" key={index}>

                      {stories.length > 1 && (
                        <button
                          className="btn-remove-story"
                          onClick={() => removeStoryCard(index)}
                        >
                          ✕
                        </button>
                      )}

                      <UploadFoto
                        name={`story_img_${index}`}
                        label={null}
                        width={200}
                        height={200}
                        defaultImage={story.image}
                        onChange={(file) => console.log("upload...", file)}
                      />

                      <div className="story-form">
                        <label className="sub-judul fw-bold required">Judul</label>
                        <input
                          type="text"
                          className="input"
                          placeholder="Pertemuan Pertama"
                          value={story.title}
                          onChange={(e) => {
                            const updated = [...stories];
                            updated[index].title = e.target.value;
                            setStories(updated);
                          }}
                        />

                        <label className="sub-judul fw-bold required">Deskripsi</label>
                        <textarea
                          className="textarea"
                          value={story.description}
                          onChange={(e) => {
                            const updated = [...stories];
                            updated[index].description = e.target.value;
                            setStories(updated);
                          }}
                        />

                        <button type="button" className="btn-save">Simpan</button>
                      </div>
                    </div>
                  ))}

                  <div className="btn-wrapper mb-3">
                    <button type="button" className="btn-addStory" onClick={addStoryCard}>
                      + Add Story
                    </button>
                  </div>
                </>
              )}

              <button type="submit" className="btn-simpan">Simpan</button>
            </div>
          )}

          {step === 5 && (
            <div>
              <div className="col-md-4 mb-3">
                <label className="sub-judul fw-bold mb-2 required">Nama Couple</label>
                <input
                  type="text"
                  name="couple_name"
                  value={form.couple_name}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>
              <div className="d-flex justify-content-start mt-4 mb-2">
                <ToggleSwitch
                  label="Logo"
                  optionLeft="OFF"
                  optionRight="ON"
                  defaultValue={true}
                  onChange={handleToggleLogo}
                />
              </div>
              {!showLogo && (
                <p className="text-muted fst-italic mb-4">
                  Tidak Menggunakan Logo Cover
                </p>
              )}

              {showLogo && (
                <div className="mb-3">
                  <UploadFoto
                    name="logo_img" //Blm dibuat di DB
                    label= {null}
                    width={120}
                    height={120}
                    defaultImage={
                      form?.bride_img ? `http://localhost:5000${form.bride_img}` : null
                    }
                    onChange={(file) => handleFileChange(file, "bride_img")}
                  />
                </div>
              )}

              <div className="mb-3">
                <label className="Judul fw-bold mb-1">Foto Cover Mobile</label>
                <div className="d-flex justify-content-start mb-2">
                  <ToggleSwitch
                    label="Gunakan Foto Gallery"
                    labelClass="sub-judul"
                    optionLeft="OFF"
                    optionRight="ON"
                    defaultValue={true}
                    onChange={handleToggleCoverMobile}
                  />
                </div>
                {showCoverMobile && (
                  <UploadFoto
                    name="logo_img"
                    label= {null}
                    width={130}
                    height={160}
                    defaultImage={
                      form?.bride_img ? `http://localhost:5000${form.bride_img}` : null
                    }
                    onChange={(file) => handleFileChange(file, "bride_img")}
                  />
                )}
              </div>

              <div className="mb-3">
                <label className="Judul fw-bold mb-1">Foto Cover Desktop</label>
                <div className="d-flex justify-content-start mb-2">
                  <ToggleSwitch
                    label="Gunakan Foto Gallery"
                    labelClass="sub-judul"
                    optionLeft="OFF"
                    optionRight="ON"
                    defaultValue={true}
                    onChange={handleToggleCoverDesktop}
                  />
                </div>
                {showCoverDesktop && (
                  <UploadFoto
                    name="logo_img"
                    label= {null}
                    width={160}
                    height={130}
                    defaultImage={
                      form?.bride_img ? `http://localhost:5000${form.bride_img}` : null
                    }
                    onChange={(file) => handleFileChange(file, "bride_img")}
                  />
                )}
              </div>
              <button type="submit" className="btn-simpan">Simpan</button>
            </div>
          )}
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default ManageInvite;
