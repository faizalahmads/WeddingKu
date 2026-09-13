import React from "react";
import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";
import { GiButterfly } from "react-icons/gi";

import bungaKiriAtas from "../../../../../assets/images/tema3/bungaJuntaiHijau.svg";
import bungaKananAtas from "../../../../../assets/images/tema3/bungaJuntaiHijau.svg";
import frameEnvelope from "../../../../../assets/images/tema3/frameEnvelope.png";
import bungaKananBawah from "../../../../../assets/images/tema3/bungaJuntaiPink.svg";

const smoothEase = [0.16, 1, 0.3, 1];

/* ================================
   CONTAINER
================================ */

const containerVariant = {
  hidden: {},

  show: {
    transition: {
      staggerChildren: 0.28,
      delayChildren: 0.2,
    },
  },
};

/* ================================
   FRAME
================================ */

const frameVariant = {
  hidden: {
    opacity: 0,
    y: 25,
    scale: 1.04,
  },

  show: {
    opacity: 1,
    y: 0,
    scale: 1,

    transition: {
      duration: 2,
      ease: smoothEase,
    },
  },
};

/* ================================
   MESSAGE
================================ */

const messageVariant = {
  hidden: {
    opacity: 0,
    y: 22,
  },

  show: {
    opacity: 1,
    y: 0,

    transition: {
      duration: 1.7,
      ease: smoothEase,
    },
  },
};

/* ================================
   COUPLE
================================ */

const coupleVariant = {
  hidden: {},

  show: {
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.2,
    },
  },
};

const nameVariant = {
  hidden: {
    opacity: 0,
    y: 15,
    scale: 0.97,
  },

  show: {
    opacity: 1,
    y: 0,
    scale: 1,

    transition: {
      duration: 1.5,
      ease: smoothEase,
    },
  },
};

const andVariant = {
  hidden: {
    opacity: 0,
    scale: 0.75,
  },

  show: {
    opacity: 1,
    scale: 1,

    transition: {
      duration: 1.3,
      ease: smoothEase,
    },
  },
};

const ClosingSectionTema3 = ({ invite }) => {
  const brideName = invite?.bride_name || "Caca";
  const groomName = invite?.groom_name || "Faizal";

  return (
    <motion.section
      className="section11"
      initial="hidden"
      whileInView="show"
      viewport={{
        once: true,
        amount: 0.25,
      }}
      variants={containerVariant}
    >
      <div className="container-fluid px-0">
        <div className="d-flex justify-content-center">
          <div className="closing-tema3-wrapper">
            {/* =========================
                BUNGA KIRI ATAS
            ========================== */}

            <img
              src={bungaKiriAtas}
              alt=""
              className="closing-flower closing-flower-left"
            />

            {/* =========================
                BUNGA KANAN ATAS
            ========================== */}

            <img
              src={bungaKananAtas}
              alt=""
              className="closing-flower closing-flower-right"
            />

            {/* =========================
                FRAME + AMPLOP
            ========================== */}

            <motion.img
              src={frameEnvelope}
              alt=""
              className="closing-main-frame"
              variants={frameVariant}
            />

            {/* =========================
                KUPU-KUPU
            ========================== */}

            <motion.div
              className="closing-butterfly-position"
              initial={{
                opacity: 0,
                scale: 0.7,
                y: -8,
              }}
              whileInView={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 1.8,
                delay: 1.3,
                ease: smoothEase,
              }}
            >
              {/* gerakan tubuh sangat pelan */}
              <motion.div
                className="closing-butterfly-floating"
                animate={{
                  y: [0, -1.5, 0],
                  rotate: [-2, 1, -2],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                {/* kepakan sayap */}
                <motion.div
                  className="closing-butterfly-wing"
                  animate={{
                    scaleX: [1, 0.48, 1],
                  }}
                  transition={{
                    duration: 1.15,
                    repeat: Infinity,
                    ease: "easeInOut",

                    /*
                      sedikit jeda setiap kepakan
                      supaya tidak terlalu seperti serangga terbang
                    */
                    repeatDelay: 0.25,
                  }}
                >
                  <GiButterfly />
                </motion.div>
              </motion.div>
            </motion.div>

            {/* =========================
                TEXT CONTENT
            ========================== */}

            <motion.div
              className="closing-content"
              variants={{
                hidden: {},

                show: {
                  transition: {
                    staggerChildren: 0.3,
                    delayChildren: 0.45,
                  },
                },
              }}
            >
              {/* MESSAGE */}

              <motion.div className="closing-message" variants={messageVariant}>
                Menjadi sebuah kebahagiaan
                <br />
                bagi kami apabila Bapak/Ibu/Saudara/i
                <br />
                berkenan hadir dalam hari bahagia
                <br />
                kami. Terima kasih atas segala ucapan,
                <br />
                doa, dan perhatian yang diberikan.
                <br />
                <br />
                Sampai jumpa di hari pernikahan kami!
              </motion.div>

              {/* =========================
                  COUPLE NAME
              ========================== */}

              <motion.div className="closing-couple" variants={coupleVariant}>
                <motion.div className="closing-name" variants={nameVariant}>
                  {brideName}
                </motion.div>

                <motion.div className="closing-and" variants={andVariant}>
                  &amp;
                </motion.div>

                <motion.div className="closing-name" variants={nameVariant}>
                  {groomName}
                </motion.div>
              </motion.div>
            </motion.div>

            {/* =========================
                BUNGA KANAN BAWAH
            ========================== */}

            <img
              src={bungaKananBawah}
              alt=""
              className="closing-flower-bottom"
            />
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default ClosingSectionTema3;
