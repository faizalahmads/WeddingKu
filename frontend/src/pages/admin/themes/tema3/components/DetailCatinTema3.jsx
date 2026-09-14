import { motion } from "framer-motion";

// Ornamen
import BungaKiri from "../../../../../assets/images/tema3/bungaJuntaiPink.svg";
import BungaKanan from "../../../../../assets/images/tema3/bungaJuntaiHijau.svg";

// Basmalah
import Basmalah from "../../../../../assets/images/tema3/basmalah.svg";

// Foto mempelai
import FotoBride from "../../../../../assets/images/tema3/bride.png";
import FotoGroom from "../../../../../assets/images/tema3/groom.png";

// Frame foto
import FrameCatin from "../../../../../assets/images/tema3/frameCatin.svg";

const smoothEase = [0.16, 1, 0.3, 1];

/* ================================
   CONTAINER
================================ */

const containerVariant = {
  hidden: {},

  show: {
    transition: {
      // sebelumnya 0.18
      staggerChildren: 0.32,

      // sebelumnya 0.15
      delayChildren: 0.3,
    },
  },
};

/* ================================
   BASMALAH
================================ */

const basmalahVariant = {
  hidden: {
    opacity: 0,

    // jangan terlalu jauh
    y: -18,

    scale: 0.96,
  },

  show: {
    opacity: 1,
    y: 0,
    scale: 1,

    transition: {
      // sebelumnya 0.9
      duration: 1.6,

      ease: smoothEase,
    },
  },
};

/* ================================
   INTRO
================================ */

const introVariant = {
  hidden: {
    opacity: 0,
    y: 18,
  },

  show: {
    opacity: 1,
    y: 0,

    transition: {
      duration: 1.5,
      ease: smoothEase,
    },
  },
};

/* ================================
   BRIDE
================================ */

const brideVariant = {
  hidden: {
    opacity: 0,

    // sebelumnya -90
    // terlalu jauh membuat animasi terasa cepat
    x: -55,

    y: 12,
    scale: 0.97,
  },

  show: {
    opacity: 1,
    x: 0,
    y: 0,
    scale: 1,

    transition: {
      // sebelumnya 1
      duration: 1.8,

      ease: smoothEase,
    },
  },
};

/* ================================
   GROOM
================================ */

const groomVariant = {
  hidden: {
    opacity: 0,

    // sebelumnya 90
    x: 55,

    y: 12,
    scale: 0.97,
  },

  show: {
    opacity: 1,
    x: 0,
    y: 0,
    scale: 1,

    transition: {
      duration: 1.8,
      ease: smoothEase,
    },
  },
};

/* ================================
   &
================================ */

const andVariant = {
  hidden: {
    opacity: 0,
    scale: 0.75,

    // sebelumnya -15
    rotate: -5,
  },

  show: {
    opacity: 1,
    scale: 1,
    rotate: 0,

    transition: {
      duration: 1.4,
      ease: smoothEase,
    },
  },
};

const DetailCatin = () => {
  return (
    <motion.section
      className="section5"
      initial="hidden"
      whileInView="show"
      viewport={{
        once: true,
        amount: 0.35,
      }}
      variants={containerVariant}
    >
      {/* =========================
          BASMALAH
      ========================== */}
      <motion.img
        src={Basmalah}
        className="section5-basmalah"
        alt="Bismillahirrahmanirrahim"
        variants={basmalahVariant}
      />

      {/* =========================
          PEMBUKA
      ========================== */}
      <motion.p className="section5-intro" variants={introVariant}>
        Dengan memohon rahmat & ridho Allah SWT,
        <br />
        kami mengundang bapak/ibu/saudara/i
        <br />
        untuk hadir pada pernikahan:
      </motion.p>

      {/* =========================
          MEMPELAI WANITA
      ========================== */}
      <motion.div
        className="section5-couple section5-bride"
        variants={brideVariant}
      >
        <div className="section5-photo-wrapper">
          <div className="section5-photo-mask">
            <img
              src={FotoBride}
              className="section5-photo"
              alt="Mempelai wanita"
            />
          </div>

          <img src={FrameCatin} className="section5-frame" alt="" />
        </div>

        <motion.div
          className="section5-info ms-2"
          initial={{
            opacity: 0,
            x: 25,
          }}
          whileInView={{
            opacity: 1,
            x: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.8,
            delay: 0.35,
            ease: smoothEase,
          }}
        >
          <p className="section5-name">Nurul Alvi Novalinda</p>

          <p className="section5-parent">
            Putri Pertama dari
            <br />
            Bapak Suwada
            <br />& Ibu Nurhayati
          </p>
        </motion.div>
      </motion.div>

      {/* =========================
          AMPERSAND
      ========================== */}
      <div className="section5-and">
        &
      </div>

      {/* =========================
          MEMPELAI PRIA
      ========================== */}
      <motion.div
        className="section5-couple section5-groom"
        variants={groomVariant}
      >
        <motion.div
          className="section5-info me-3"
          initial={{
            opacity: 0,
            x: -25,
          }}
          whileInView={{
            opacity: 1,
            x: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            duration: 0.8,
            delay: 0.35,
            ease: smoothEase,
          }}
        >
          <p className="section5-name text-end">Faizal Ahmad Siddiq</p>

          <p className="section5-parent text-end">
            Putra Kedua dari
            <br />
            Bapak Kardjamai
            <br />& Ibu Gustia Supriyatin
          </p>
        </motion.div>

        <div className="section5-photo-wrapper">
          <div className="section5-photo-mask">
            <img
              src={FotoGroom}
              className="section5-photo"
              alt="Mempelai wanita"
            />
          </div>

          <img src={FrameCatin} className="section5-frame" alt="" />
        </div>
      </motion.div>

      {/* =========================
          BUNGA KIRI
      ========================== */}
      <motion.img
        src={BungaKiri}
        className="section5-flower section5-flower-left"
        alt=""
        initial={{
          opacity: 0,
          x: -30,
          rotate: -5,
        }}
        whileInView={{
          opacity: 1,
          x: 0,
        }}
        viewport={{
          once: true,
        }}
        animate={{
          y: [0, -7, 0],
          rotate: [-2, 2, -2],
        }}
        transition={{
          opacity: {
            duration: 1,
          },

          x: {
            duration: 1,
            ease: smoothEase,
          },

          y: {
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          },

          rotate: {
            duration: 4.5,
            repeat: Infinity,
            ease: "easeInOut",
          },
        }}
      />

      {/* =========================
          BUNGA KANAN
      ========================== */}
      <motion.img
        src={BungaKanan}
        className="section5-flower section5-flower-right"
        alt=""
        initial={{
          opacity: 0,
          x: 30,
          rotate: 5,
        }}
        whileInView={{
          opacity: 1,
          x: 0,
        }}
        viewport={{
          once: true,
        }}
        animate={{
          y: [0, 7, 0],
          rotate: [2, -2, 2],
        }}
        transition={{
          opacity: {
            duration: 1,
          },

          x: {
            duration: 1,
            ease: smoothEase,
          },

          y: {
            duration: 4.5,
            repeat: Infinity,
            ease: "easeInOut",
          },

          rotate: {
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          },
        }}
      />
    </motion.section>
  );
};

export default DetailCatin;
