import React, { useEffect, useState } from "react";

import axios from "axios";

import { AnimatePresence, motion } from "framer-motion";

import MailRsvp from "../../../../../assets/images/mail-rsvp.png";

const smoothEase = [0.16, 1, 0.3, 1];

const RsvpTema3 = ({ invite }) => {
  const [status, setStatus] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState([]);
  const [loadingMessages, setLoadingMessages] = useState(false);

  const [notification, setNotification] = useState({
    type: "",
    message: "",
  });

  const hasMoreMessages = messages.length > 5;

  /* =========================
     SET DATA RSVP TAMU
  ========================= */

  useEffect(() => {
    if (!invite) return;

    setStatus(invite.rsvp_status || "");

    setMessage(invite.rsvp_message || "");
  }, [invite]);

  /* =========================
     AMBIL SEMUA UCAPAN
  ========================= */

  const fetchMessages = async () => {
    if (!invite?.invitation_id) {
      return;
    }

    try {
      setLoadingMessages(true);

      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/rsvp/messages/${
          invite.invitation_id
        }`,
      );

      setMessages(res.data?.data || []);
    } catch (err) {
      console.error("Get RSVP messages error:", err);
    } finally {
      setLoadingMessages(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [invite?.invitation_id]);

  /* =========================
     SUBMIT RSVP
  ========================= */

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!invite?.guest_code) {
      setNotification({
        type: "error",
        message: "Data tamu tidak ditemukan.",
      });

      return;
    }

    if (!status) {
      setNotification({
        type: "error",
        message: "Silakan pilih konfirmasi kehadiran.",
      });

      return;
    }

    try {
      setLoading(true);

      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/rsvp/${invite.guest_code}`,
        {
          status,
          message,
        },
      );

      setNotification({
        type: "success",
        message: "Terima kasih. Konfirmasi kehadiran Anda berhasil disimpan.",
      });

      /*
       * Setelah RSVP disimpan,
       * ambil ulang semua ucapan.
       *
       * Dengan begitu ucapan baru
       * langsung muncul di bawah.
       */
      await fetchMessages();
    } catch (err) {
      console.error("RSVP error:", err);

      setNotification({
        type: "error",
        message:
          err.response?.data?.message || "Konfirmasi RSVP gagal disimpan.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.section
      className="section-rsvp-tema3"
      initial={{
        opacity: 0,
        y: 50,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.2,
      }}
      transition={{
        duration: 1.1,
        ease: smoothEase,
      }}
    >
      <div className="rsvp-tema3-container">
        {/* =====================
            ICON
        ====================== */}

        <motion.img
          src={MailRsvp}
          alt="RSVP"
          className="rsvp-tema3-icon"
          initial={{
            opacity: 0,
            scale: 0.8,
          }}
          whileInView={{
            opacity: 1,
            scale: 1,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.9,
            ease: smoothEase,
          }}
        />

        {/* =====================
            HEADER
        ====================== */}

        <div className="rsvp-tema3-header">
          <p className="rsvp-tema3-small-title">Will You Attend?</p>

          <h2 className="rsvp-tema3-title">RSVP</h2>

          <p className="rsvp-tema3-description">
            Kehadiran dan doa restu Anda merupakan kebahagiaan bagi kami.
          </p>
        </div>

        {/* =====================
            FORM RSVP
        ====================== */}

        <motion.form
          onSubmit={handleSubmit}
          className="rsvp-tema3-form"
          initial={{
            opacity: 0,
            y: 35,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 1.1,
            delay: 0.15,
            ease: smoothEase,
          }}
        >
          {/* NAMA TAMU */}

          <div className="rsvp-tema3-group">
            <label>Nama Tamu</label>

            <input
              type="text"
              value={invite?.guest_name || "Tamu Undangan"}
              disabled
            />
          </div>

          {/* KEHADIRAN */}

          <div className="rsvp-tema3-group">
            <label>Konfirmasi Kehadiran</label>

            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="">Pilih Konfirmasi</option>

              <option value="hadir">Ya, Saya Akan Hadir</option>

              <option value="tidak_hadir">Maaf, Saya Tidak Dapat Hadir</option>
            </select>
          </div>

          {/*
            Tidak ada lagi
            Jumlah Kehadiran
          */}

          {/* DOA & UCAPAN */}

          <div className="rsvp-tema3-group">
            <label>Doa & Ucapan</label>

            <textarea
              rows="4"
              value={message}
              placeholder="Tuliskan doa dan ucapan terbaik Anda..."
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>

          {/* NOTIFICATION */}

          <AnimatePresence>
            {notification.message && (
              <motion.div
                className={`rsvp-tema3-alert ${notification.type}`}
                initial={{
                  opacity: 0,
                  y: 10,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                }}
              >
                {notification.message}
              </motion.div>
            )}
          </AnimatePresence>

          {/* SUBMIT */}

          <motion.button
            type="submit"
            disabled={loading}
            className="rsvp-tema3-submit"
            whileTap={{
              scale: 0.97,
            }}
          >
            {loading ? "Mengirim..." : "Kirim Konfirmasi"}
          </motion.button>
        </motion.form>

        {/* =========================
            DAFTAR DOA & UCAPAN
        ========================== */}

        <motion.div
          className="rsvp-message-section"
          initial={{
            opacity: 0,
            y: 40,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.15,
          }}
          transition={{
            duration: 1,
            ease: smoothEase,
          }}
        >
          <div className="rsvp-message-header">
            <p>Best Wishes</p>

            <h3>Doa & Ucapan</h3>
          </div>

          {loadingMessages ? (
            <p className="rsvp-message-empty">Memuat ucapan...</p>
          ) : messages.length === 0 ? (
            <p className="rsvp-message-empty">Belum ada doa dan ucapan.</p>
          ) : (
            <div
              className={`rsvp-message-list ${
                hasMoreMessages ? "is-scrollable" : ""
              }`}
            >
              <AnimatePresence initial={false}>
                {messages.map((item, index) => (
                  <motion.div
                    key={item.id}
                    className="rsvp-message-card"
                    initial={{
                      opacity: 0,
                      y: 15,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      duration: 0.45,
                      delay: Math.min(index * 0.04, 0.2),
                      ease: smoothEase,
                    }}
                  >
                    <div className="rsvp-message-name">{item.guest_name}</div>

                    <p className="rsvp-message-text">“{item.rsvp_message}”</p>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default RsvpTema3;
