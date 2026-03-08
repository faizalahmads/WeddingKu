import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import "../../assets/css/PreviewTema2.css";
import IconMaps from "../../assets/images/icon-maps.png";
import { QRCode } from "react-qrcode-logo";
import Logo from "../../assets/icons/Logo.svg";
import WeddingSong from "../../assets/audio/Thank God I Found You  Cover by BuDaKhelxKat (Lyrics).mp3";
import { FaMusic, FaWhatsapp } from "react-icons/fa";
import InstagramIcon from "../../assets/icons/istagram.svg";
import TiktokIcon from "../../assets/icons/tiktok.png";
import WaIcon from "../../assets/icons/whatsapp.png";
import ClockIcon from "../../assets/images/clock-brown.png";
import MailIcon from "../../assets/images/icon-mail.png";
import MailRsvp from "../../assets/images/mail-rsvp.png";
import IconSalin from "../../assets/images/copy-icon.png";
import FpMade from "../../images/fp-made.png";
import LogoMade from "../../assets/icons/Logo.svg";
import { motion } from "framer-motion";
import Bunga1 from "../../assets/images/bunga1.png";
import Bunga2 from "../../assets/images/bunga2.png";

const Tema2 = () => {
  const [invite, setInvite] = useState(null);
  const queryParams = new URLSearchParams(location.search);
  const toParam = queryParams.get("to");
  const [name, code] = toParam ? toParam.split("/") : [];
  const isUndanganLink = location.pathname.includes("/undangan/");
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const stories = invite?.stories || [];
  const [gallery, setGallery] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const formatTime = (time) => {
    return time?.slice(0, 5).replace(":", ".");
  };

  const getEventTime = (type) => {
    const event = invite?.events?.find((e) => e.type === type);
    if (!event) return "-";

    return `${formatTime(event.start_time)} - ${formatTime(event.end_time)} WIB`;
  };

  const getDisplayDate = (type) => {
    if (!invite) return null;

    // jika toggle sama tanggal aktif
    if (Number(invite.same_date) === 1) {
      return invite.wedding_date;
    }

    // kalau tidak sama
    return type === "akad" ? invite.akad_date : invite.resepsi_date;
  };

  const sectionRefs = Array.from({ length: 10 }, () => useRef(null));
  const [toast, setToast] = useState({ show: false, message: "" });
  const [gunakanNamaLain, setGunakanNamaLain] = useState(false);

  const [nama, setNama] = useState("");
  const [ucapan, setUcapan] = useState("");
  const [daftarUcapan, setDaftarUcapan] = useState([
    { nama: "Faizal & Caca", teks: "SAMAWA untuk kedua pengantin" },
    { nama: "Dita & Rafi", teks: "Selamat berbahagia!" },
    { nama: "Nadia", teks: "Langgeng dan bahagia selalu 💖" },
    { nama: "Farhan", teks: "Barakallah untuk kalian berdua!" },
    {
      nama: "Deril",
      teks: "Semoga Samawa selalu! makin berkah dan bahagia selalu doa terbaik selalu untuk kedua pengantin :) .......................................................................",
    },
  ]);

  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const toggleMusic = () => {
    if (!audioRef.current) return;

    setIsPlaying((prev) => {
      if (prev) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      return !prev;
    });
  };

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        if (audioRef.current && isPlaying) {
          audioRef.current.pause();
        }
      } else if (document.visibilityState === "visible") {
        if (audioRef.current && isPlaying && audioRef.current.paused) {
          audioRef.current.play();
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [isPlaying]);

  useEffect(() => {
    if (!invite?.wedding_date) return;

    const targetDate = new Date(invite.wedding_date).getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance <= 0) {
        clearInterval(interval);
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(interval);
  }, [invite]);

  useEffect(() => {
    if (!invite?.invitation_id) return;

    const fetchGallery = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/invite/${invite.invitation_id}/gallery`,
        );
        setGallery(res.data.data);
      } catch (err) {
        console.error("Gallery error:", err);
      }
    };

    fetchGallery();
  }, [invite]);

  // Fungsi salin rekening
  const handleCopy = (number) => {
    navigator.clipboard
      .writeText(number)
      .then(() => {
        setToast({
          show: true,
          message: `Nomor rekening telah disalin!`,
        });
        setTimeout(() => setToast({ show: false, message: "" }), 2500);
      })
      .catch(() => {
        setToast({ show: true, message: "Gagal menyalin nomor rekening." });
        setTimeout(() => setToast({ show: false, message: "" }), 2500);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (nama && ucapan) {
      const ucapanBaru = { nama, teks: ucapan };
      setDaftarUcapan([ucapanBaru, ...daftarUcapan]);
      setNama("");
      setUcapan("");
    }
  };
  const handleScrollToSection7 = () => {
    const section7 = document.getElementById("section7");
    if (section7) {
      section7.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const fetchInvite = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/undangan/${name}/${code}`,
        );
        setInvite(res.data);
      } catch (err) {
        console.error(err);
        setError("Undangan tidak ditemukan");
      } finally {
        setLoading(false);
      }
    };

    if (name && code) fetchInvite();
  }, [name, code]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate");
          } else {
            entry.target.classList.remove("animate");
          }
        });
      },
      { threshold: 0.3 },
    );

    sectionRefs.forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => {
      sectionRefs.forEach((ref) => {
        if (ref.current) observer.unobserve(ref.current);
      });
    };
  }, []);

  const handleShareWhatsApp = () => {
    const link = `${import.meta.env.VITE_API_URL}/${invite.groom_name}-${invite.bride_name}?to=${invite.guest_name}/${invite.guest_code}`;
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

  const FloatingFlower = ({ src, style }) => {
    return (
      <motion.img
        src={src}
        alt="flower"
        style={{
          position: "absolute",
          width: "120px",
          pointerEvents: "none",
          zIndex: 0,
          ...style,
        }}
        animate={{
          y: [0, -30, 0],
          x: [0, 10, 0],
          rotate: [0, 10, -10, 0],
          opacity: [0.8, 1, 0.8],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    );
  };
  
  return (
    <div className="undangan-bg">
      {/* ====== Halaman 1 ====== */}
      <section className="section-card" ref={sectionRefs[0]}>
        <div
          className="undangan-card text-center"
          style={{ position: "relative", overflow: "hidden" }}
        >
          <FloatingFlower src={Bunga1} style={{ top: "5%", left: "-30px" }} />

          <FloatingFlower src={Bunga2} style={{ top: "87%", right: "-20px" }} />

          <FloatingFlower
            src={Bunga1}
            style={{ bottom: "10%", left: "-50px" }}
          />

          <div className="judul">The Wedding Of</div>
          <div className="nama">{invite?.couple_name}</div>
          <div className="tanggal">
            {new Date(invite?.wedding_date).toLocaleDateString("id-ID", {
              weekday: "long",
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </div>

          <div className="lokasi">
            <img src={IconMaps} alt="icon lokasi" />
            <span>{invite?.location}</span>
          </div>

          <p className="ucapan">
            Kami sangat bahagia jika Bapak/Ibu/Saudara/i <br />
            berkenan hadir untuk memberikan doa restu 💌
          </p>

          <div className="kepada mb-3">
            <div>Kepada,</div>
            <div>
              {invite?.guest_name ? `${invite.guest_name}` : "Tamu Undangan"}
            </div>
            {invite?.guest_category === "VIP" && (
              <p className="guest-name">{invite.guest_category}</p>
            )}
          </div>

          <div className="qr">
            <QRCode
              value={`${import.meta.env.VITE_APP_URL}/checkin?token=${invite?.checkin_token}&code=${invite?.guest_code}`}
              logoImage={Logo}
              logoWidth={60}
              logoHeight={15}
              logoOpacity={1}
              removeQrCodeBehindLogo={true}
              qrStyle="dots"
              eyeRadius={8}
              className="my-5"
            />
          </div>
        </div>
      </section>

      {/* ====== Halaman 2 ====== */}
      <section className="section-card" ref={sectionRefs[1]}>
        <div
          className="undangan-card text-center"
          style={{ position: "relative", overflow: "hidden" }}
        >
          <FloatingFlower src={Bunga1} style={{ top: "5%", left: "-30px" }} />

          <FloatingFlower src={Bunga2} style={{ top: "87%", right: "-20px" }} />

          <FloatingFlower
            src={Bunga1}
            style={{ bottom: "10%", left: "-50px" }}
          />
          <div className="judul2">The Groom</div>
          <div className="foto-couple">
            <img src={invite?.groom_img} alt="Groom" />
          </div>
          <div className="nama-couple">{invite?.groom_name}</div>
          <div className="ortu">
            Putra dari <br /> {invite?.groom_parent}
          </div>
          <a
            href={`https://www.instagram.com/${invite?.groom_sosmed}`}
            target="_blank"
            rel="noopener noreferrer"
            className="sosmed-container"
          >
            <img className="sosmed-icon" src={InstagramIcon} alt="Instagram" />
            <div className="sosmed-username">{invite?.groom_sosmed}</div>
          </a>
        </div>
      </section>

      {/* ====== Halaman 3 ====== */}
      <section className="section-card" ref={sectionRefs[2]}>
        <div
          className="undangan-card text-center"
          style={{ position: "relative", overflow: "hidden" }}
        >
          <FloatingFlower src={Bunga1} style={{ top: "5%", left: "-30px" }} />

          <FloatingFlower src={Bunga2} style={{ top: "87%", right: "-20px" }} />

          <FloatingFlower
            src={Bunga1}
            style={{ bottom: "10%", left: "-50px" }}
          />

          <div className="judul2">The Bride</div>
          <div className="foto-couple">
            <img src={invite?.bride_img} alt="Bride" />
          </div>
          <div className="nama-couple">{invite?.bride_name}</div>
          <div className="ortu">
            Putri dari <br /> {invite?.bride_parent}
          </div>
          <a
            href={`https://www.instagram.com/${invite?.bride_sosmed}`}
            target="_blank"
            rel="noopener noreferrer"
            className="sosmed-container"
          >
            <img className="sosmed-icon" src={InstagramIcon} alt="Instagram" />
            <div className="sosmed-username">{invite?.bride_sosmed}</div>
          </a>
        </div>
      </section>

      {/* ====== Halaman 4 ====== */}
      <section className="section-card" ref={sectionRefs[3]}>
        <div className="undangan-card text-center">
          {/* === Akad Nikah === */}
          <div className="akad-section">
            <div className="akad-title">
              <div className="akad-line"></div>
              <h2 className="akad-heading">Akad Nikah</h2>
              <div className="akad-line"></div>
            </div>

            <div className="akad-date-time">
              {(() => {
                const date = new Date(getDisplayDate("akad"));
                const day = date.getDate();
                const month = date.toLocaleDateString("id-ID", {
                  month: "long",
                });
                const year = date.getFullYear();

                return (
                  <div className="akad-date">
                    <div className="akad-day">{day}</div>
                    <div className="akad-month">
                      {month}
                      <br />
                      {year}
                    </div>
                  </div>
                );
              })()}

              <div className="akad-detail">
                <div className="d-flex justify-content-center align-items-center gap-1">
                  <img className="clock-icon" src={ClockIcon} alt="clock" />
                  <span className="akad-text">{getEventTime("Akad")}</span>
                </div>
                <div className="d-flex justify-content-center align-items-center">
                  <img
                    className="location-icon"
                    src={IconMaps}
                    alt="location"
                  />
                  <span className="akad-text">{invite?.location}</span>
                </div>
                <span className="akad-address">{invite?.detail_location}</span>
              </div>

              {invite?.maps_link && (
                <a
                  href={invite.maps_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-map mt-2 mb-3"
                >
                  📍 Lihat Lokasi
                </a>
              )}
            </div>
          </div>

          {/* === Resepsi === */}
          <div className="akad-section">
            <div className="akad-title">
              <div className="akad-line"></div>
              <h2 className="akad-heading">Resepsi</h2>
              <div className="akad-line"></div>
            </div>

            <div className="akad-date-time">
              {(() => {
                const date = new Date(getDisplayDate("akad"));
                const day = date.getDate();
                const month = date.toLocaleDateString("id-ID", {
                  month: "long",
                });
                const year = date.getFullYear();

                return (
                  <div className="akad-date">
                    <div className="akad-day">{day}</div>
                    <div className="akad-month">
                      {month}
                      <br />
                      {year}
                    </div>
                  </div>
                );
              })()}

              <div className="akad-detail">
                <div className="d-flex justify-content-center align-items-center gap-1">
                  <img className="clock-icon" src={ClockIcon} alt="clock" />
                  <span className="akad-text">{getEventTime("Resepsi")}</span>
                </div>
                <div className="d-flex justify-content-center align-items-center">
                  <img
                    className="location-icon"
                    src={IconMaps}
                    alt="location"
                  />
                  <span className="akad-text">{invite?.location}</span>
                </div>
                <span className="akad-address">{invite?.detail_location}</span>
              </div>

              {invite?.maps_link && (
                <a
                  href={invite.maps_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-map mt-2"
                >
                  📍 Lihat Lokasi
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ====== Halaman 5 ====== */}
      <section className="section-card" ref={sectionRefs[4]}>
        <div
          className="undangan-card text-center"
          style={{ position: "relative", overflow: "hidden" }}
        >
          <FloatingFlower src={Bunga1} style={{ top: "0%", left: "-30px" }} />

          <FloatingFlower src={Bunga2} style={{ top: "87%", right: "-20px" }} />

          <FloatingFlower
            src={Bunga1}
            style={{ bottom: "10%", left: "-50px" }}
          />

          <div className="akad-title">
            <div className="akad-line"></div>
            <h2 className="akad-heading">Save The Date</h2>
            <div className="akad-line"></div>
          </div>
          <h1 className="save-date mt-1 mb-4">
            {new Date(invite?.wedding_date).toLocaleDateString("id-ID", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </h1>
          <div className="countdown-container">
            <div className="countdown-box">
              <div className="countdown-value">
                {String(timeLeft.days).padStart(2, "0")}
              </div>
              <div className="countdown-label">Hari</div>
            </div>

            <div className="countdown-box">
              <div className="countdown-value">
                {String(timeLeft.hours).padStart(2, "0")}
              </div>
              <div className="countdown-label">Jam</div>
            </div>

            <div className="countdown-box">
              <div className="countdown-value">
                {String(timeLeft.minutes).padStart(2, "0")}
              </div>
              <div className="countdown-label">Menit</div>
            </div>

            <div className="countdown-box">
              <div className="countdown-value">
                {String(timeLeft.seconds).padStart(2, "0")}
              </div>
              <div className="countdown-label">Detik</div>
            </div>
          </div>
          <div className="save-text">
            <p>
              Sampaikan do'a atau salam kepada pengantin dan konfirmasi
              kehadiran.
            </p>
          </div>
          <div className="rsvp-button" onClick={() => handleScrollToSection7()}>
            <img src={MailIcon} alt="icon" />
            <div className="rsvp-text">Kirim Ucapan RSVP</div>
          </div>
        </div>
      </section>

      {/* ====== Halaman 6 (Story Board) ====== */}
      {invite?.use_story && stories.length > 0 && (
        <section className="section-card" ref={sectionRefs[5]}>
          <div
            className="undangan-card text-center"
            style={{ position: "relative", overflow: "hidden" }}
          >
            <FloatingFlower src={Bunga1} style={{ top: "5%", left: "-30px" }} />
            <FloatingFlower
              src={Bunga2}
              style={{ top: "87%", right: "-20px" }}
            />
            <FloatingFlower
              src={Bunga1}
              style={{ bottom: "10%", left: "-50px" }}
            />

            <div className="akad-title">
              <div className="akad-line"></div>
              <h2 className="akad-heading">Cerita Cinta</h2>
              <div className="akad-line"></div>
            </div>

            <div className="story-container mt-4">
              {stories.map((story, index) => (
                <div key={story.id} className="story-item">
                  {story.image_path ? (
                    <img
                      src={story.image_path}
                      alt={story.title}
                      className="story-image"
                    />
                  ) : (
                    <div className="no-image">No Image</div>
                  )}

                  <h3 className="story-title mt-3">{story.title}</h3>
                  <p className="story-desc">{story.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ====== Halaman 7 ====== */}
      <section className="section-card" ref={sectionRefs[6]}>
        <div className="galeri-2x3">
          {gallery.map((item) => (
            <img
              key={item.id}
              src={`${import.meta.env.VITE_API_URL}${item.image_path}`}
              alt="gallery"
            />
          ))}
        </div>
      </section>

      {/* ====== Halaman 8 ====== */}
      <section id="section7" className="section-card" ref={sectionRefs[7]}>
        <div
          className="undangan-card text-center"
          style={{ position: "relative", overflow: "hidden" }}
        >
          <FloatingFlower src={Bunga1} style={{ top: "5%", left: "-30px" }} />

          <FloatingFlower src={Bunga2} style={{ top: "87%", right: "-20px" }} />

          <FloatingFlower
            src={Bunga1}
            style={{ bottom: "10%", left: "-50px" }}
          />
          <div className="rsvp-container">
            <div className="rsvp-header">
              <h2 className="rsvp-title">RSVP</h2>
              <img src={MailRsvp} alt="icon" className="rsvp-icon" />
            </div>

            <form className="rsvp-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Nama Tamu :</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Masukkan nama kamu"
                  value={nama}
                  onChange={(e) => setNama(e.target.value)}
                  required
                />
                <div className="form-option">
                  <input
                    type="checkbox"
                    id="gunakanNamaLain"
                    className="checkbox"
                    checked={gunakanNamaLain}
                    onChange={(e) => setGunakanNamaLain(e.target.checked)}
                  />
                  <label htmlFor="gunakanNamaLain">Gunakan nama lain?</label>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Ucapan & Doa :</label>
                <textarea
                  className="form-textarea"
                  placeholder="Tulis ucapan dan doa kamu di sini"
                  value={ucapan}
                  onChange={(e) => setUcapan(e.target.value)}
                  required
                ></textarea>
              </div>

              <button type="submit" className="btn-kirim">
                Kirim
              </button>
            </form>

            <div className="rsvp-list">
              <h3 className="rsvp-list-title">Ucapan dan Doa Para Tamu</h3>
              {daftarUcapan.map((item, index) => (
                <div key={index} className="ucapan-item">
                  <div className="ucapan-nama fw-semibold">{item.nama}</div>
                  <div className="ucapan-teks">{item.teks}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ====== Halaman 9 ====== */}
      <section className="section-card" ref={sectionRefs[8]}>
        <div className="undangan-card text-center">
          <div className="text-center tanda-kasih-section position-relative">
            {/* Judul */}
            <h2 className="tanda-kasih-title">Tanda Kasih</h2>
            <p className="tanda-kasih-subtitle">
              Terima kasih telah menambah semangat kegembiraan pernikahan kami
              dengan kehadiran dan hadiah indah Anda.
            </p>

            {/* Kartu rekening */}
            <div className="d-flex flex-column align-items-center gap-4 mt-5">
              {/* Rekening 1 */}
              <div className="rekening-card">
                <img
                  className="rekening-logo"
                  src={invite?.groom_bank_logo}
                  alt={invite?.groom_bank_name}
                />
                <div className="rekening-info">
                  <div className="rekening-number">{invite?.groom_norek}</div>
                  <button
                    className="btn btn-salin d-flex align-items-center justify-content-center gap-2"
                    onClick={() => handleCopy(invite?.groom_norek)}
                  >
                    <img
                      src={IconSalin}
                      alt="Copy Icon"
                      className="salin-icon"
                    />
                    Salin Rekening
                  </button>
                  <div className="rekening-name">
                    A/n {invite?.groom_name_bank}
                  </div>
                </div>
              </div>

              {/* Rekening 2 */}
              <div className="rekening-card">
                <img
                  className="rekening-logo"
                  src={invite?.bride_bank_logo}
                  alt={invite?.bride_bank_name}
                />
                <div className="rekening-info">
                  <div className="rekening-number">{invite?.bride_norek}</div>
                  <button
                    className="btn btn-salin d-flex align-items-center justify-content-center gap-2"
                    onClick={() => handleCopy(invite?.bride_norek)}
                  >
                    <img
                      src={IconSalin}
                      alt="Copy Icon"
                      className="salin-icon"
                    />
                    Salin Rekening
                  </button>
                  <div className="rekening-name">
                    A/n {invite?.bride_name_bank}
                  </div>
                </div>
              </div>
            </div>

            {/* Toast Notifikasi */}
            {toast.show && (
              <div
                className="toast-container position-fixed bottom-0 end-0 p-3"
                style={{ zIndex: 1055 }}
              >
                <div
                  className="toast show text-bg-success border-0"
                  role="alert"
                  aria-live="assertive"
                  aria-atomic="true"
                >
                  <div className="d-flex">
                    <div className="toast-body">{toast.message}</div>
                    <button
                      type="button"
                      className="btn-close btn-close-white me-2 m-auto"
                      onClick={() => setToast({ show: false, message: "" })}
                    ></button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ====== Halaman 10 ====== */}
      <section className="section-card" ref={sectionRefs[9]}>
        <div
          className="undangan-card text-center"
          style={{ position: "relative", overflow: "hidden" }}
        >
          <FloatingFlower src={Bunga1} style={{ top: "5%", left: "-30px" }} />

          <FloatingFlower src={Bunga2} style={{ top: "87%", right: "-20px" }} />

          <FloatingFlower
            src={Bunga1}
            style={{ bottom: "10%", left: "-50px" }}
          />

          <div className="closing-section text-center">
            <img src={FpMade} alt="Penutup" className="closing-image shadow" />

            <div className="closing-text mt-2">
              <p className="closing-message">
                Menjadi sebuah kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i
                berkenan hadir dalam hari bahagia kami. Terima kasih atas segala
                ucapan, doa dan perhatian yang diberikan
              </p>
              <p className="closing-thank">Sampai jumpa di hari bahagia kami</p>
              <h2 className="closing-names">FAIZAL & CACA</h2>
            </div>

            <div className="closing-footer mt-2">
              <p className="closing-made">Made with love by</p>
              <div className="closing-icons d-flex justify-content-center gap-3">
                <img src={InstagramIcon} alt="icon1" />
                <img src={TiktokIcon} alt="icon2" />
                <img src={WaIcon} alt="icon3" />
              </div>
              <img src={LogoMade} alt="Wedding Ku" className="closing-brand" />
            </div>
          </div>
        </div>
      </section>
      <audio ref={audioRef} src={WeddingSong} loop preload="auto" />

      <div
        className={`music-icon ${isPlaying ? "playing" : ""}`}
        onClick={toggleMusic}
      >
        <FaMusic />
      </div>

      {/* Tombol Bagikan hanya tampil jika URL mengandung '/undangan/' */}
      {isUndanganLink && (
        <div className="whatsapp-float-container">
          <span className="whatsapp-label">Bagikan Undangan</span>
          <button
            onClick={handleShareWhatsApp}
            className="whatsapp-float-btn btn-share-wa"
            title="Bagikan via WhatsApp"
          >
            <FaWhatsapp size={28} />
          </button>
        </div>
      )}
    </div>
  );
};

export default Tema2;
