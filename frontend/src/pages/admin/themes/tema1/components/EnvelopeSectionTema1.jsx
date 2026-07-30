import { motion } from "framer-motion";

import BungaAtas from "../../../../../assets/images/tema1/flower-e-a.svg";
import BungaBawah from "../../../../../assets/images/tema1/flower-e-b.svg";
import EnvelopeBody from "../../../../../assets/images/tema1/envelope.svg";
import SealImage from "../../../../../assets/images/tema1/seal.svg";
import Flap from "../../../../../assets/images/tema1/flap.svg";
import Card from "../../../../../assets/images/tema1/card.svg";

const EnvelopeSection = ({ open, showLetter, isSlide2, onOpen }) => {
  return (
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
          animate={open ? { opacity: 0, rotate: 0 } : { opacity: 1, rotate: 2 }}
          transition={
            open
              ? { duration: 0.6, ease: "easeOut" }
              : {
                  duration: 1.5,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatType: "mirror",
                }
          }
        >
          <img src={BungaAtas} className="bunga-atas" alt="" />
        </motion.div>

        <motion.div
          className="bunga-wrapper"
          animate={open ? { opacity: 0, rotate: 0 } : { opacity: 1, rotate: 2 }}
          transition={
            open
              ? { duration: 0.6, ease: "easeOut" }
              : {
                  duration: 2,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatType: "mirror",
                }
          }
        >
          <img src={BungaBawah} className="bunga-bawah" alt="" />
        </motion.div>

        {/* BODY */}
        <img src={EnvelopeBody} className="envelope-body" alt="" />

        {/* FLAP */}
        <motion.div
          className="flap-wrapper"
          animate={open ? { rotateX: -160 } : { rotateX: 0 }}
          transition={{ duration: 0.8 }}
        >
          <img src={Flap} className="flap" alt="" />
        </motion.div>

        {/* SEAL */}
        <motion.img
          src={SealImage}
          className="seal"
          alt=""
          initial={{ scale: 1, opacity: 1 }}
          animate={open ? { scale: 0.5, opacity: 0 } : { scale: 1, opacity: 1 }}
          transition={{ duration: 0.4 }}
        />

        {/* LETTER */}
        <motion.div
          className="letter"
          animate={
            showLetter ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }
          }
          transition={{ duration: 0.5 }}
        >
          <img src={Card} alt="" />
        </motion.div>
      </motion.div>

      <motion.button
        onClick={onOpen}
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
    </motion.section>
  );
};

export default EnvelopeSection;
