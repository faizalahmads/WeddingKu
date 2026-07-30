import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";

import MainPhoto from "../../../.././../assets/images/tema1/section5/main-content.png";

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

// Judul "SAVE THE DATE" -> blur fade-in (konsisten dengan judul section lain)
const blurFade = {
  hidden: { opacity: 0, filter: "blur(10px)", y: 20 },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    y: 0,
    transition: { duration: 0.9, ease: smoothEase },
  },
};

// Foto utama -> scale-in lembut dari tengah
const photoReveal = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1, ease: smoothEase },
  },
};

// Tanggal -> fade-up, muncul terakhir sebagai "penutup"
const fadeInUp = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: smoothEase },
  },
};

const SaveTheDateSection = () => {
  return (
    <motion.div
      className="save-the-date-section position-relative overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.3 }}
    >
      <motion.div className="std-title text-center" variants={blurFade}>
        SAVE THE DATE
      </motion.div>

      <motion.img
        src={MainPhoto}
        className="std-photo"
        alt=""
        variants={photoReveal}
      />

      <motion.div className="std-date text-center" variants={fadeInUp}>
        26 . 09 . 26
      </motion.div>
    </motion.div>
  );
};

export default SaveTheDateSection;
