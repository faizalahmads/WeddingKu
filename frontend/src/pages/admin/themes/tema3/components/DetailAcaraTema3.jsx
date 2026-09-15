import React from "react";
import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";

import flower from "../../../../../assets/images/tema3/mawarPutih.svg";

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
   FADE UP
================================ */
const fadeUpVariant = {
  hidden: {
    opacity: 0,
    y: 28,
    scale: 0.98,
  },

  show: {
    opacity: 1,
    y: 0,
    scale: 1,

    transition: {
      duration: 1.6,
      ease: smoothEase,
    },
  },
};

/* ================================
   AKAD
================================ */
const akadVariant = {
  hidden: {
    opacity: 0,
    x: -35,
    y: 15,
  },

  show: {
    opacity: 1,
    x: 0,
    y: 0,

    transition: {
      duration: 1.7,
      ease: smoothEase,
    },
  },
};

/* ================================
   RESEPSI
================================ */
const resepsiVariant = {
  hidden: {
    opacity: 0,
    x: 35,
    y: 15,
  },

  show: {
    opacity: 1,
    x: 0,
    y: 0,

    transition: {
      duration: 1.7,
      ease: smoothEase,
    },
  },
};

/* ================================
   DRESS CODE
================================ */
const dressVariant = {
  hidden: {
    opacity: 0,
    y: 25,
  },

  show: {
    opacity: 1,
    y: 0,

    transition: {
      duration: 1.6,
      ease: smoothEase,
    },
  },
};

const DetailAcara = () => {
  const handleOpenMaps = () => {
    window.open(
      "https://maps.google.com/?q=GOR+Sunter+Jakarta",
      "_blank",
      "noopener,noreferrer",
    );
  };

  return (
    <motion.section
      className="section7"
      initial="hidden"
      whileInView="show"
      viewport={{
        once: true,
        amount: 0.25,
      }}
      variants={containerVariant}
    >
      <div className="detail-acara-wrapper container-fluid">
        {/* =====================================
            AKAD
        ====================================== */}
        <motion.div
          className="detail-acara-item text-center"
          variants={akadVariant}
        >
          <h2 className="detail-acara-title">Akad</h2>

          <div
            className="detail-acara-content"
            initial={{
              opacity: 0,
              y: 18,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{ once: true }}
            transition={{
              duration: 1.5,
              delay: 0.4,
              ease: smoothEase,
            }}
          >
            <p className="detail-acara-date">Sabtu, 26 September 2026</p>

            <p>07.00 - 09.00 WIB</p>

            <p className="detail-acara-place">GOR SUNTER</p>

            <p className="detail-acara-address">
              Jl. Taman Tirta Sunter 1 No.9, RT.8/RW.14,
              <br />
              Sunter Jaya, Kec. Tj. Priok, Jkt Utara,
              <br />
              Daerah Khusus Ibukota Jakarta 14360
            </p>
          </div>
        </motion.div>

        {/* =====================================
            BUNGA
        ====================================== */}
        <motion.div
          className="detail-acara-flower-wrapper"
          initial={{
            opacity: 0,
            scale: 0.92,
          }}
          whileInView={{
            opacity: 1,
            scale: 1,
          }}
          viewport={{ once: true }}
          transition={{
            duration: 1.8,
            ease: smoothEase,
          }}
        >
          <img
            src={flower}
            alt=""
            className="detail-acara-flower detail-flower-float"
          />
        </motion.div>

        {/* =====================================
            RESEPSI
        ====================================== */}
        <motion.div
          className="detail-acara-item detail-acara-resepsi text-center"
          variants={resepsiVariant}
        >
          <motion.h2
            className="detail-acara-title"
            initial={{
              opacity: 0,
              y: 18,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{ once: true }}
            transition={{
              duration: 1.3,
              delay: 0.2,
              ease: smoothEase,
            }}
          >
            Resepsi
          </motion.h2>

          <motion.div
            className="detail-acara-content"
            initial={{
              opacity: 0,
              y: 18,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{ once: true }}
            transition={{
              duration: 1.5,
              delay: 0.4,
              ease: smoothEase,
            }}
          >
            <p className="detail-acara-date">Sabtu, 26 September 2026</p>

            <p>11.00 - 13.00 WIB</p>

            <p className="detail-acara-place">GOR SUNTER</p>

            <p className="detail-acara-address">
              Jl. Taman Tirta Sunter 1 No.9, RT.8/RW.14,
              <br />
              Sunter Jaya, Kec. Tj. Priok, Jkt Utara,
              <br />
              Daerah Khusus Ibukota Jakarta 14360
            </p>
          </motion.div>

          <motion.button
            type="button"
            className="btn detail-acara-map-btn"
            onClick={handleOpenMaps}
            initial={{
              opacity: 0,
              y: 15,
              scale: 0.96,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            viewport={{
              once: true,
            }}
            whileHover={{
              scale: 1.04,
              y: -2,
            }}
            whileTap={{
              scale: 0.97,
            }}
            transition={{
              duration: 1.3,
              delay: 0.65,
              ease: smoothEase,
            }}
          >
            Google Maps
          </motion.button>
        </motion.div>

        {/* =====================================
            DRESS CODE
        ====================================== */}
        <motion.div
          className="detail-dress-code text-center"
          variants={dressVariant}
        >
          <motion.h2
            className="detail-dress-title"
            initial={{
              opacity: 0,
              y: 15,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{ once: true }}
            transition={{
              duration: 1.4,
              ease: smoothEase,
            }}
          >
            Dress Code
          </motion.h2>

          <motion.p
            className="detail-dress-text"
            initial={{
              opacity: 0,
              y: 10,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{ once: true }}
            transition={{
              duration: 1.4,
              delay: 0.25,
              ease: smoothEase,
            }}
          >
            Pink, Brown and White
          </motion.p>

          <motion.div
            className="
              detail-dress-colors
              d-flex
              justify-content-center
              align-items-center
            "
            initial="hidden"
            whileInView="show"
            viewport={{
              once: true,
            }}
            variants={{
              hidden: {},
              show: {
                transition: {
                  staggerChildren: 0.22,
                  delayChildren: 0.4,
                },
              },
            }}
          >
            <motion.span
              className="detail-color detail-color-pink"
              variants={{
                hidden: {
                  opacity: 0,
                  scale: 0.6,
                },

                show: {
                  opacity: 1,
                  scale: 1,

                  transition: {
                    duration: 1,
                    ease: smoothEase,
                  },
                },
              }}
            />

            <motion.span
              className="detail-color detail-color-brown"
              variants={{
                hidden: {
                  opacity: 0,
                  scale: 0.6,
                },

                show: {
                  opacity: 1,
                  scale: 1,

                  transition: {
                    duration: 1,
                    ease: smoothEase,
                  },
                },
              }}
            />

            <motion.span
              className="detail-color detail-color-white"
              variants={{
                hidden: {
                  opacity: 0,
                  scale: 0.6,
                },

                show: {
                  opacity: 1,
                  scale: 1,

                  transition: {
                    duration: 1,
                    ease: smoothEase,
                  },
                },
              }}
            />
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default DetailAcara;
