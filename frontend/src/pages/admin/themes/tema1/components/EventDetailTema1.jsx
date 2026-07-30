import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";
import Background from "../../../.././../assets/images/tema1/section6/bg.png";

const smoothEase = [0.25, 0.1, 0.25, 1];

// Parent: atur urutan stagger
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.1,
    },
  },
};

// Foto background -> scale-in lembut
const photoReveal = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1, ease: smoothEase },
  },
};

// Akad & Resepsi -> slide dari kanan (mengikuti align-items-end)
const slideFromRight = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.9, ease: smoothEase },
  },
};

// Lokasi -> fade-up dari bawah
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: smoothEase },
  },
};

const EventDetailSection = () => {
  return (
    <motion.div
      className="event-detail-section position-relative overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.2 }}
    >
      <motion.img
        src={Background}
        className="event-photo"
        alt=""
        variants={photoReveal}
      />

      {/* Akad */}
      <motion.div
        className="event-block event-block-akad d-flex flex-column align-items-end"
        variants={slideFromRight}
      >
        <div className="event-label text-center w-100">Akad</div>
        <div className="event-time text-center w-100">
          Sabtu, 26 September 2026
          <br />
          07.00 - 09.00
        </div>
      </motion.div>

      {/* Resepsi */}
      <motion.div
        className="event-block event-block-resepsi d-flex flex-column align-items-end"
        variants={slideFromRight}
      >
        <div className="event-label text-center w-100">Resepsi</div>
        <div className="event-time text-center w-100">
          Sabtu, 26 September 2026
          <br />
          07.00 - 09.00
        </div>
      </motion.div>

      {/* Lokasi */}
      <motion.div
        className="event-block event-block-lokasi d-flex flex-column align-items-center"
        variants={fadeInUp}
      >
        <div className="location-name text-center w-100 mb-1">GOR SUNTER</div>
        <div className="d-flex flex-column align-items-center location-detail-wrapper">
          <div className="location-address text-center mb-2">
            Jl. Taman Tirta Sunter 1 No.9, RT.8/RW.14, Sunter Jaya, Kec. Tj.
            Priok, Jkt Utara, Daerah Khusus Ibukota Jakarta 14360
          </div>
          <motion.a
            href="https://maps.google.com/?q=GOR+Sunter"
            target="_blank"
            rel="noopener noreferrer"
            className="location-link text-center w-100 text-decoration-underline"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            LIHAT LOKASI
          </motion.a>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default EventDetailSection;
