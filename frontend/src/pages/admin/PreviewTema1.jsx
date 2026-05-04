import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../assets/css/PreviewTema1.css";

import GarisAtas from "../../assets/images/tema1/garis-samping.png";
import GarisBawah from "../../assets/images/tema1/garis-samping.png";

import BungaAtas from "../../assets/images/tema1/flower-e-a.svg";
import BungaBawah from "../../assets/images/tema1/flower-e-b.svg";
import EnvelopeBody from "../../assets/images/tema1/envelope.svg";
import SealImage from "../../assets/images/tema1/seal.svg";
import Flap from "../../assets/images/tema1/flap.svg";
import Card from "../../assets/images/tema1/card.svg";

import OpenCard from "../../assets/images/tema1/section2/open-card.svg";
import Bunga2 from "../../assets/images/tema1/section2/flower-e-2.svg";
import JudulCatin from "../../assets/images/tema1/section2/judul-catin.svg";


import { QRCodeCanvas } from "qrcode.react";
import BgSc2 from "../../assets/images/tema1/bg-sc2.png";

import BgAtasKiri from "../../assets/images/tema1/section3/bunga-atas-kiri.svg";
import BgAtasKanan from "../../assets/images/tema1/section3/bunga-atas-kanan.svg";
import BgBawahKiri from "../../assets/images/tema1/section3/bunga-bawah-kiri.svg";
import BgBawahKanan from "../../assets/images/tema1/section3/bunga-bawah-kanan.svg";
import BgLetter from "../../assets/images/tema1/section3/bg-letter.svg";

const PreviewTema1 = () => {
  const [open, setOpen] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const [showLetter, setShowLetter] = useState(false);
  const [isSlide2, setIsSlide2] = useState(false);

  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        setShowLetter(true);
      }, 800); // durasi flap

      return () => clearTimeout(timer);
    } else {
      setShowLetter(false);
    }
  }, [open]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= window.innerHeight * 0.8) {
        setIsSlide2(true);
      } else {
        setIsSlide2(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="wrapper-tema1">
      <motion.section
        className="section-1"
        animate={isSlide2 ? { opacity: 0, y: -100 } : { opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          className="judul"
          initial={{ opacity: 1, y: 0 }}
          animate={open ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <span className="judul-atas">The Wedding Of</span>
          <br />
          <span className="nama-pengantin">Caca &amp; Faizal</span>
        </motion.div>
        <motion.div
          className="envelope-wrapper"
          animate={open ? { y: 70 } : { y: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          {/* BUNGA */}
          <motion.div
            className="bunga-wrapper"
            style={{ transformOrigin: "top center" }}
            animate={
              open
                ? {
                    opacity: 0,
                    rotate: 0,
                  }
                : {
                    opacity: 1,
                    rotate: 2,
                  }
            }
            transition={
              open
                ? {
                    duration: 0.6,
                    ease: "easeOut",
                  }
                : {
                    duration: 1.5,
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatType: "mirror",
                  }
            }
          >
            <img src={BungaAtas} className="bunga-atas" />
          </motion.div>
          <motion.div
            className="bunga-wrapper"
            animate={
              open
                ? {
                    opacity: 0,
                    rotate: 0,
                  }
                : {
                    opacity: 1,
                    rotate: 2,
                  }
            }
            transition={
              open
                ? {
                    duration: 0.6,
                    ease: "easeOut",
                  }
                : {
                    duration: 2,
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatType: "mirror",
                  }
            }
          >
            <img src={BungaBawah} className="bunga-bawah" />
          </motion.div>

          {/* BODY */}
          <img src={EnvelopeBody} className="envelope-body" />

          {/* FLAP */}
          <motion.div
            className="flap-wrapper"
            animate={open ? { rotateX: -160 } : { rotateX: 0 }}
            transition={{ duration: 0.8 }}
          >
            <img src={Flap} className="flap" />
          </motion.div>

          {/* SEAL */}
          <motion.img
            src={SealImage}
            className="seal"
            initial={{ scale: 1, opacity: 1 }}
            animate={
              open ? { scale: 0.5, opacity: 0 } : { scale: 1, opacity: 1 }
            }
            transition={{ duration: 0.4 }}
          />

          {/* LETTER */}
          <motion.div
            className="letter"
            animate={
              showLetter
                ? { opacity: 1, scale: 1 }
                : { opacity: 0, scale: 0.95 }
            }
            transition={{ duration: 0.5 }}
          >
            <img src={Card} />
          </motion.div>
        </motion.div>

        <motion.button
          onClick={() => {
            setOpen(true);

            setTimeout(() => {
              window.scrollTo({
                top: window.innerHeight,
                behavior: "smooth",
              });
            }, 2000);
          }}
          className="open-btn"
          initial={{ opacity: 1, y: 0 }}
          animate={open ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          Click Open
        </motion.button>

        <motion.div
          className="kepada-tema1"
          initial={{ opacity: 1, y: 0 }}
          animate={open ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <span className="text">Kepada Yth :</span>
          <br />
          <span className="text">Bapak/Ibu/Saudara/i</span>
          <br />
          <span className="nama-tamu">Juleha & Saprudin</span>
        </motion.div>

        {/* <motion.div
          className="qr-outside"
          onClick={() => setShowQR(true)}
          whileHover={{ scale: 1.1 }}
          layoutId="qrCode"
          animate={open ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <QRCodeCanvas value="https://undanganmu.com" size={60} />
        </motion.div>
        <motion.div
          className="qr-icon"
          animate={open ? { opacity: 0, y: 20 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="qr-label">Click Me</div>
        </motion.div> */}

        {/* {showQR && (
          <motion.div
            className="qr-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowQR(false)}
            layoutId="qrCode"
          >
            <motion.div
              className="qr-modal"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="qr-title">Kepada,</div>
              <div className="qr-name">Peter Parker & Partner</div>

              <QRCodeCanvas value="https://undanganmu.com" size={200} />
            </motion.div>
          </motion.div>
        )} */}
      </motion.section>

      {open && (
        <motion.section
          className="section-2"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="img-wrapper"
            initial={{ opacity: 0, x: 0, y: "-10vh" }}
            animate={{ opacity: isSlide2 ? 1 : 0, x: "22vw", y: "-10vh" }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.8 }}
          >
            <img src={JudulCatin} className="judulcatin" />
            <div className="text-wrapper">
              <span className="t-judul">The Wedding Of</span>
              <span className="t-nama-cpw">Caca</span>
              <span className="t-dan">&</span>
              <span className="t-nama-cpp">Faizal</span>
            </div>
          </motion.div>
          <motion.div
            className="img-wrapper"
            animate={
              isSlide2
                ? { x: "-20vw", y: "-25vh", scale: 0.7 }
                : { x: 0, y: 0, scale: 1 }
            }
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            <img src={OpenCard} className="opencard" />
          </motion.div>
          <motion.div
            className="img-wrapper"
            initial={{ opacity: 0, x: 0, y: "-10vh" }}
            animate={{ opacity: isSlide2 ? 1 : 0, x: "-5vw", y: "-10vh" }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.8 }}
          >
            <img src={Bunga2} className="bunga2" />
          </motion.div>
        </motion.section>
      )}

      {open && (
        <section className="section-3">
          <img src={BgAtasKiri} className="garis-atas-kiri" />
          <img src={BgAtasKanan} className="garis-atas-kanan" />
          <img src={BgBawahKiri} className="garis-bawah-kiri" />
          <img src={BgBawahKanan} className="garis-bawah-kanan" />
          <img src={BgLetter} className="bg-letter" />

          <span>QS. Ar-Rum ayat 21</span>
          <br />
          <span>
            "Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan
            pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung
            dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa
            kasih dan sayang..."
          </span>
        </section>
      )}
    </div>
  );
};

export default PreviewTema1;
