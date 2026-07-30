import { motion } from "framer-motion";

import BgAtasKiri from "../../../../../assets/images/tema1/section3/bunga-atas-kiri.svg";
import BgAtasKanan from "../../../../../assets/images/tema1/section3/bunga-atas-kanan.svg";
import BgBawahKiri from "../../../../../assets/images/tema1/section3/bunga-bawah-kiri.svg";
import BgBawahKanan from "../../../../../assets/images/tema1/section3/bunga-bawah-kanan.svg";
import BgLetter from "../../../../../assets/images/tema1/section3/bg-letter.svg";

const smoothEase = [0.25, 0.1, 0.25, 1];

// Parent: atur urutan stagger
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.25,
      delayChildren: 0.1,
    },
  },
};

// Bunga sudut -> fade + sedikit "mekar" dari kecil
const cornerFlower = {
  hidden: { opacity: 0, scale: 0.7, rotate: -8 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { duration: 1, ease: smoothEase },
  },
};

// Frame utama -> scale-in lembut dari tengah
const frameVariant = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1, ease: smoothEase },
  },
};

// Judul ayat -> fade-up halus
const titleVariant = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: smoothEase },
  },
};

// Teks ayat -> fade-up lebih lambat & lebih lembut (bagian terpenting)
const quoteVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.1, ease: smoothEase },
  },
};

const AyatSection = () => {
  return (
    <motion.section
      className="section-3"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.3 }}
    >
      <motion.img
        src={BgAtasKiri}
        className="garis-atas-kiri"
        alt=""
        variants={cornerFlower}
      />
      <motion.img
        src={BgAtasKanan}
        className="garis-atas-kanan"
        alt=""
        variants={cornerFlower}
      />
      <motion.img
        src={BgBawahKiri}
        className="garis-bawah-kiri"
        alt=""
        variants={cornerFlower}
      />
      <motion.img
        src={BgBawahKanan}
        className="garis-bawah-kanan"
        alt=""
        variants={cornerFlower}
      />

      <motion.img
        src={BgLetter}
        className="bg-letter"
        alt=""
        variants={frameVariant}
      />

      <motion.span variants={titleVariant}>QS. Ar-Rum ayat 21</motion.span>
      <br />
      <motion.span variants={quoteVariant}>
        "Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan
        pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan
        merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan
        sayang..."
      </motion.span>
    </motion.section>
  );
};

export default AyatSection;
