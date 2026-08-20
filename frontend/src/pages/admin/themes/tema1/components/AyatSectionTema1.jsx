import { motion } from "framer-motion";

import BgLetter from "../../../../../assets/images/tema3/bgLetter.svg";
// import MusicPlayerBar from "../../../../../../src/components/MusicPlayerBar";
// import BgMusic from "../../../../../assets/audio/Thank God I Found You  Cover by BuDaKhelxKat (Lyrics).mp3";

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
      className="section3"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.3 }}
    >
      <div className="letter-wrapper">
        <motion.img
          src={BgLetter}
          className="bg-letter"
          alt=""
          variants={frameVariant}
        />

        <div className="letter-text">
          <motion.span variants={quoteVariant}>
            "Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan
            pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung
            dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa
            kasih dan sayang..."
          </motion.span>

          <motion.span className="quote-title" variants={titleVariant}>
            QS. Ar-Rum ayat 21
          </motion.span>
        </div>
      </div>

      {/* <div className="music-player-wrapper">
        <MusicPlayerBar src={BgMusic} autoPlay={open} />
      </div> */}
    </motion.section>
  );
};

export default AyatSection;
