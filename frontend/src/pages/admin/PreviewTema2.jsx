import React, { useEffect, useRef, useState } from "react";
import "../../assets/css/PreviewTema2.css";
import IconMaps from "../../assets/images/icon-maps.png";
import IconQR from "../../assets/images/icon-qr.png";
import InstagramIcon from "../../assets/icons/istagram.svg";
import TiktokIcon from "../../assets/icons/tiktok.png";
import WaIcon from "../../assets/icons/whatsapp.png";
import ClockIcon from "../../assets/images/clock-brown.png";
import MailIcon from "../../assets/images/icon-mail.png";
import MailRsvp from "../../assets/images/mail-rsvp.png";
import LogoBRI  from "../../assets/images/icon-BRI.png";
import LogoMandiri  from "../../assets/images/icon-mandiri.png";
import IconSalin  from "../../assets/images/copy-icon.png";
import FotoGrom from "../../images/foto-groom-2.jpg";
import FotoBride from "../../images/foto-bride-2.jpg";
import Galeri1  from "../../images/2-galeri-1.png";
import Galeri2  from "../../images/2-galeri-2.png";
import Galeri3  from "../../images/2-galeri-3.png";
import Galeri4  from "../../images/2-galeri-4.png";
import Galeri5  from "../../images/2-galeri-1.png";
import Galeri6  from "../../images/2-galeri-2.png";
import FpMade  from "../../images/fp-made.png";
import LogoMade from "../../assets/icons/Logo.svg";



const PreviewTema2 = () => {
  const sectionRefs = Array.from({ length: 9 }, () => useRef(null));
  const [toast, setToast] = useState({ show: false, message: "" });
  const [gunakanNamaLain, setGunakanNamaLain] = useState(false);

  const [nama, setNama] = useState("");
  const [ucapan, setUcapan] = useState("");
  const [daftarUcapan, setDaftarUcapan] = useState([
    { nama: "Faizal & Caca", teks: "SAMAWA untuk kedua pengantin" },
    { nama: "Dita & Rafi", teks: "Selamat berbahagia!" },
    { nama: "Nadia", teks: "Langgeng dan bahagia selalu 💖" },
    { nama: "Farhan", teks: "Barakallah untuk kalian berdua!" },
    { nama: "Deril", teks: "Semoga Samawa selalu! makin berkah dan bahagia selalu doa terbaik selalu untuk kedua pengantin :) ......................................................................." },
  ]);

  // Fungsi salin rekening
  const handleCopy = (number) => {
    navigator.clipboard
      .writeText(number)
      .then(() => {
        setToast({ show: true, message: `Nomor rekening ${number} telah disalin!` });
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
      { threshold: 0.3 }
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

  return (
    <div className="undangan-bg">
      {/* ====== Halaman 1 ====== */}
      <section className="section-card" ref={sectionRefs[0]}>
        <div className="undangan-card text-center">
          <div className="judul">The Wedding Of</div>
          <div className="nama">Faizal & Caca</div>
          <div className="tanggal">Sabtu, 26 September 2026</div>

          <div className="lokasi">
            <img src={IconMaps} alt="icon lokasi" />
            <span>GOR SUNTER, JAKARTA UTARA</span>
          </div>

          <p className="ucapan">
            Kami sangat bahagia jika Bapak/Ibu/Saudara/i <br />
            berkenan hadir untuk memberikan doa restu 💌
          </p>

          <div className="kepada">
            <div>Kepada,</div>
            <div>Anomin & Partner</div>
          </div>

          <div className="qr">
            <img src={IconQR} alt="QR Code" />
          </div>
        </div>
      </section>

      {/* ====== Halaman 2 ====== */}
      <section className="section-card" ref={sectionRefs[1]}>
        <div className="undangan-card text-center">
          <div className="judul2">The Groom</div>
          <div className="foto-couple">
            <img src={FotoGrom} alt="Faizal" />
          </div>
          <div className="nama-couple">Faizal Ahmad Siddiq</div>
          <div className="ortu">
            Putra dari <br /> Bapak Kamaradi & Ibu Jumarinah Dinah
          </div>
          <a
            href="https://www.instagram.com/faizal_a.s"
            target="_blank"
            rel="noopener noreferrer"
            className="sosmed-container"
          >
            <img className="sosmed-icon" src={InstagramIcon} alt="Instagram" />
            <div className="sosmed-username">@faizal_a.s</div>
          </a>
        </div>
      </section>

      {/* ====== Halaman 3 ====== */}
      <section className="section-card" ref={sectionRefs[2]}>
        <div className="undangan-card text-center">
          <div className="judul2">The Bride</div>
          <div className="foto-couple">
            <img src={FotoBride} alt="Faizal" />
          </div>
          <div className="nama-couple">Nurul Alvi Novalinda</div>
          <div className="ortu">
            Putri dari <br /> Bapak Jamhari Waddah & Ibu Siti Romiah
          </div>
          <a
            href="https://www.instagram.com/nrlalvin_"
            target="_blank"
            rel="noopener noreferrer"
            className="sosmed-container"
          >
            <img className="sosmed-icon" src={InstagramIcon} alt="Instagram" />
            <div className="sosmed-username">@nrlalvin_</div>
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
              <div className="akad-date">
                <div className="akad-day">26</div>
                <div className="akad-month">September<br />2026</div>
              </div>

              <div className="akad-detail">
                <div className="d-flex justify-content-center align-items-center gap-2">
                  <img className="clock-icon" src={ClockIcon} alt="clock" />
                  <p className="akad-text">09.00 - 11.00 WIB</p>
                </div>
                <div className="d-flex justify-content-center align-items-center gap-2">
                  <img className="location-icon" src={IconMaps} alt="location" />
                  <p className="akad-text">GOR SUNTER, JAKARTA UTARA</p>
                </div>
                <p className="akad-address">
                  Jl. Taman Tirta Sunter 1 No.9, RT.8/RW.14, Sunter Jaya, Kec. Tj. Priok, Jkt Utara
                </p>
              </div>

              <button className="btn btn-map">Maps</button>
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
              <div className="akad-date d-flex justify-content-center align-items-center text-start gap-2">
                <div className="akad-day">26</div>
                <div className="akad-month">September<br />2026</div>
              </div>

              <div className="akad-detail">
                <div className="d-flex justify-content-center align-items-center gap-2">
                  <img className="clock-icon" src={ClockIcon} alt="clock" />
                  <p className="akad-text">11.00 - 14.00 WIB</p>
                </div>
                <div className="d-flex justify-content-center align-items-center gap-2">
                  <img className="location-icon" src={IconMaps} alt="location" />
                  <p className="akad-text">GOR SUNTER, JAKARTA UTARA</p>
                </div>
                <p className="akad-address">
                  Jl. Taman Tirta Sunter 1 No.9, RT.8/RW.14, Sunter Jaya, Kec. Tj. Priok, Jkt Utara
                </p>
              </div>

              <button className="btn btn-map">Maps</button>
            </div>
          </div>
        </div>
      </section>

      {/* ====== Halaman 5 ====== */}
      <section className="section-card" ref={sectionRefs[4]}>
        <div className="undangan-card text-center">
          <div className="akad-title">
            <div className="akad-line"></div>
            <h2 className="akad-heading">Save The Date</h2>
            <div className="akad-line"></div>
          </div>
          <h1 className="save-date">26 September 2026</h1>
          <div className="countdown-container">
            <div className="countdown-box">
              <div className="countdown-value">02</div>
              <div className="countdown-label">Hari</div>
            </div>
            <div className="countdown-box">
              <div className="countdown-value">48</div>
              <div className="countdown-label">Jam</div>
            </div>
            <div className="countdown-box">
              <div className="countdown-value">10</div>
              <div className="countdown-label">Menit</div>
            </div>
            <div className="countdown-box">
              <div className="countdown-value">30</div>
              <div className="countdown-label">Detik</div>
            </div>
          </div>
          <div className="save-text">
            <p>Sampaikan do'a atau salam kepada pengantin dan konfirmasi kehadiran.</p>
          </div>
          <div
            className="rsvp-button"
            onClick={() => handleScrollToSection7()}
          >
            <img src={MailIcon} alt="icon" />
            <div className="rsvp-text">Kirim Ucapan RSVP</div>
          </div>
        </div>
      </section>

      {/* ====== Halaman 6 ====== */}
      <section className="section-card" ref={sectionRefs[5]}>
        <div className="galeri-2x3">
          <img src={Galeri1} alt="foto1" />
          <img src={Galeri2} alt="foto2" />
          <img src={Galeri3} alt="foto3" />
          <img src={Galeri4} alt="foto4" />
          <img src={Galeri5} alt="foto5" />
          <img src={Galeri6} alt="foto6" />
        </div>
      </section>

      {/* ====== Halaman 7 ====== */}
      <section id="section7" className="section-card" ref={sectionRefs[6]}>
        <div className="undangan-card text-center">
          <div class="rsvp-container">
            <div class="rsvp-header">
              <h2 class="rsvp-title">RSVP</h2>
              <img src={MailRsvp} alt="icon" class="rsvp-icon" />
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

      {/* ====== Halaman 8 ====== */}
      <section className="section-card" ref={sectionRefs[7]}>
        <div className="undangan-card text-center">
          <div className="text-center tanda-kasih-section position-relative">
            {/* Judul */}
            <h2 className="tanda-kasih-title">Tanda Kasih</h2>
            <p className="tanda-kasih-subtitle">
              Terima kasih telah menambah semangat kegembiraan pernikahan kami dengan
              kehadiran dan hadiah indah Anda.
            </p>

            {/* Kartu rekening */}
            <div className="d-flex flex-column align-items-center gap-4 mt-5">
              {/* Rekening 1 */}
              <div className="rekening-card">
                <img
                  className="rekening-logo"
                  src={LogoBRI}
                  alt="Bank Logo"
                />
                <div className="rekening-info">
                  <div className="rekening-number">65127687</div>
                  <button
                    className="btn btn-salin d-flex align-items-center justify-content-center gap-2"
                    onClick={() => handleCopy("65127687")}
                  >
                    <img
                      src={IconSalin}
                      alt="Copy Icon"
                      className="salin-icon"
                    />
                    Salin Rekening
                  </button>
                  <div className="rekening-name">A/n Nurul Alvi Novalinda</div>
                </div>
              </div>

              {/* Rekening 2 */}
              <div className="rekening-card">
                <img
                  className="rekening-logo"
                  src= {LogoMandiri}
                  alt="Bank Logo"
                />
                <div className="rekening-info">
                  <div className="rekening-number">1200065127687</div>
                  <button
                    className="btn btn-salin d-flex align-items-center justify-content-center gap-2"
                    onClick={() => handleCopy("1200065127687")}
                  >
                    <img
                      src= {IconSalin}
                      alt="Copy Icon"
                      className="salin-icon"
                    />
                    Salin Rekening
                  </button>
                  <div className="rekening-name">A/n Faizal Ahmad Siddiq</div>
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

      {/* ====== Halaman 9 ====== */}
      <section className="section-card" ref={sectionRefs[8]}>
        <div className="undangan-card text-center">
          <div className="closing-section text-center">
            <img
              src={FpMade}
              alt="Penutup"
              className="closing-image shadow"
            />

            <div className="closing-text mt-2">
              <p className="closing-message">
                Menjadi sebuah kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan
                hadir dalam hari bahagia kami. Terima kasih atas segala ucapan, doa dan
                perhatian yang diberikan
              </p>
              <p className="closing-thank">
                Sampai jumpa di hari bahagia kami
              </p>
              <h2 className="closing-names">FAIZAL & CACA</h2>
            </div>

            <div className="closing-footer mt-2">
              <p className="closing-made">Made with love by</p>
              <div className="closing-icons d-flex justify-content-center gap-3">
                <img src={InstagramIcon} alt="icon1" />
                <img src={TiktokIcon} alt="icon2" />
                <img src={WaIcon} alt="icon3" />
              </div>
              <img src={LogoMade} alt="Wedding Ku" className="closing-brand"/>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PreviewTema2;
