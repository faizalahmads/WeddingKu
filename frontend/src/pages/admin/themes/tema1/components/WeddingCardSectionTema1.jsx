import { motion } from "framer-motion";
import { QRCodeCanvas } from "qrcode.react";

import OpenCard from "../../../../../assets/images/tema1/section2/open-card.svg";
import Bunga2 from "../../../../../assets/images/tema1/section2/flower-e-2.svg";
import JudulCatin from "../../../../../assets/images/tema1/section2/judul-catin.svg";
import TanggalCard from "../../../../../assets/images/tema1/section2/tanggal-card.svg";
import QRCard from "../../../../../assets/images/tema1/section2/qr-card.svg";
import QRCode from "../../../../../assets/images/tema1/icon-qr.png";

// Easing elegan, khas transisi "soft luxury" (bukan linear/easeOut standar)
const smoothEase = [0.25, 0.1, 0.25, 1];

const WeddingCardSection = ({ isSlide2, onQRClick }) => {
  return (
    <motion.section
      className="section2"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: smoothEase }}
    >
      {/* Judul Catin */}
      <motion.div
        className="img-wrapper"
        initial={{ opacity: 0, x: 40, y: -100, rotate: -4, scale: 0.9 }}
        animate={{
          opacity: isSlide2 ? 1 : 0,
          x: 100,
          y: -100,
          rotate: 0,
          scale: 1,
        }}
        transition={{ duration: 1.1, ease: smoothEase, delay: 0.6 }}
      >
        <img src={JudulCatin} className="judulcatin" alt="" />
        <div className="judul-text-wrapper">
          <span className="t-judul">The Wedding Of</span>
          <span className="t-nama-cpw">Caca</span>
          <span className="t-dan">&</span>
          <span className="t-nama-cpp">Faizal</span>
        </div>
      </motion.div>

      {/* Tanggal Card */}
      <motion.div
        className="img-wrapper"
        initial={{ opacity: 0, x: -120, y: 35, rotate: 4, scale: 0.9 }}
        animate={{
          opacity: isSlide2 ? 1 : 0,
          x: -80,
          y: 35,
          rotate: 0,
          scale: 1,
        }}
        transition={{ duration: 1.1, ease: smoothEase, delay: 0.9 }}
      >
        <img src={TanggalCard} className="tanggalcard" alt="" />
        <div className="tanggal-text-wrapper">
          <span className="t-hari">Sabtu</span>
          <span className="t-tanggal">26</span>
          <span className="t-bulan">September</span>
          <span className="t-tahun mt-1">2026</span>
        </div>
      </motion.div>

      {/* QR Card */}
      <motion.div
        className="img-wrapper"
        initial={{ opacity: 0, x: 150, y: 115, rotate: -3, scale: 0.9 }}
        animate={{
          opacity: isSlide2 ? 1 : 0,
          x: 110,
          y: 115,
          rotate: 0,
          scale: 1,
        }}
        transition={{ duration: 1.1, ease: smoothEase, delay: 1.2 }}
      >
        <img src={QRCard} className="qrcard" alt="" />
        <div className="qr-position-wrapper">
          <motion.div
            className="qr-wrapper"
            onClick={onQRClick}
            style={{ cursor: "pointer" }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            animate={{ scale: [1, 1.04, 1] }}
            transition={{
              scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
            }}
          >
            <img
              src={QRCode}
              className="qr-code"
              alt="Klik untuk perbesar QR"
            />
          </motion.div>
        </div>
      </motion.div>

      {/* Open Card (transisi ke slide 2) */}
      <motion.div
        className="img-wrapper"
        initial={{ opacity: 0, scale: 0.85 }}
        animate={
          isSlide2
            ? { opacity: 1, x: -90, y: -220, scale: 0.7 }
            : { opacity: 1, x: 0, y: 0, scale: 1 }
        }
        transition={{ duration: 0.9, ease: smoothEase }}
      >
        <img src={OpenCard} className="opencard" alt="" />
      </motion.div>

      {/* Bunga dekoratif -> floating loop halus */}
      <motion.div
        className="img-wrapper"
        initial={{ opacity: 0, x: -40, y: -70, rotate: -6 }}
        animate={{
          opacity: isSlide2 ? 1 : 0,
          x: -10,
          y: [-90, -96, -90],
          rotate: [0, 2, 0],
        }}
        transition={{
          opacity: { duration: 1, ease: smoothEase, delay: 0.4 },
          x: { duration: 1, ease: smoothEase, delay: 0.4 },
          y: {
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          },
          rotate: {
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          },
        }}
      >
        <img src={Bunga2} className="bunga2" alt="" />
      </motion.div>
    </motion.section>
  );
};

export default WeddingCardSection;
