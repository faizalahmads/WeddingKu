import { motion } from "framer-motion";

import flower from "../../../../../assets/images/tema3/bungaJuntaiHijau.svg";
import line from "../../../../../assets/images/tema3/line.svg";
import building from "../../../../../assets/images/tema3/building.png";

const smoothEase = [0.16, 1, 0.3, 1];

/* ================================
   CONTAINER
================================ */
const containerVariant = {
  hidden: {},

  show: {
    transition: {
      staggerChildren: 0.25,
      delayChildren: 0.2,
    },
  },
};

/* ================================
   BASIC SOFT FADE
================================ */
const fadeUpVariant = {
  hidden: {
    opacity: 0,
    y: 20,
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
   SAVE
================================ */
const saveVariant = {
  hidden: {
    opacity: 0,
    y: 25,
    scale: 0.97,
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
   THE
================================ */
const theVariant = {
  hidden: {
    opacity: 0,
    scale: 0.9,
  },

  show: {
    opacity: 1,
    scale: 1,

    transition: {
      duration: 1.4,
      ease: smoothEase,
    },
  },
};

/* ================================
   DATE
================================ */
const dateTitleVariant = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.96,
  },

  show: {
    opacity: 1,
    y: 0,
    scale: 1,

    transition: {
      duration: 1.7,
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
  },

  show: {
    opacity: 1,
    x: 0,

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
  },

  show: {
    opacity: 1,
    x: 0,

    transition: {
      duration: 1.7,
      ease: smoothEase,
    },
  },
};

/* ================================
   ANGKA TANGGAL
================================ */
const dayVariant = {
  hidden: {
    opacity: 0,
    scale: 0.75,
    y: 10,
  },

  show: {
    opacity: 1,
    scale: 1,
    y: 0,

    transition: {
      duration: 1.5,
      ease: smoothEase,
    },
  },
};

/* ================================
   BUILDING
================================ */
const buildingVariant = {
  hidden: {
    opacity: 0,
    y: 45,
    scale: 1.03,
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

const DateCatinTema3 = () => {
  return (
    <motion.section
      className="section6"
      initial="hidden"
      whileInView="show"
      viewport={{
        once: false,
        amount: 0.3,
      }}
      variants={containerVariant}
    >
      <div className="save-date-wrapper">
        {/* =========================
            FLOWER
        ========================== */}
        <img src={flower} alt="" className="save-date-flower" />

        {/* =========================
            SAVE
        ========================== */}
        <motion.div className="save-text-3" variants={saveVariant}>
          Save
        </motion.div>

        {/* =========================
            THE
        ========================== */}
        <motion.div className="the-text" variants={theVariant}>
          the
        </motion.div>

        {/* =========================
            DATE
        ========================== */}
        <motion.div className="date-text" variants={dateTitleVariant}>
          Date
        </motion.div>

        {/* =========================
            MONTH
        ========================== */}
        <motion.div className="month-text" variants={fadeUpVariant}>
          SEPTEMBER
        </motion.div>

        {/* =========================
            EVENT INFORMATION
        ========================== */}
        <motion.div
          className="event-wrapper"
          variants={{
            hidden: {},
            show: {
              transition: {
                staggerChildren: 0.2,
              },
            },
          }}
        >
          {/* AKAD */}
          <motion.div
            className="event-column akad-column"
            variants={akadVariant}
          >
            <motion.img
              src={line}
              alt=""
              className="event-line"
              initial={{
                opacity: 0,
                scaleX: 0,
              }}
              whileInView={{
                opacity: 1,
                scaleX: 1,
              }}
              viewport={{
                once: false,
              }}
              transition={{
                duration: 1.4,
                delay: 0.4,
                ease: smoothEase,
              }}
            />

            <motion.div
              className="event-name"
              initial={{
                opacity: 0,
                y: 10,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: false,
              }}
              transition={{
                duration: 1.3,
                delay: 0.45,
                ease: smoothEase,
              }}
            >
              Akad
            </motion.div>

            <motion.div
              className="event-time"
              initial={{
                opacity: 0,
                y: 8,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: false,
              }}
              transition={{
                duration: 1.3,
                delay: 0.6,
                ease: smoothEase,
              }}
            >
              Pukul 08.00 WIB
            </motion.div>

            <motion.img
              src={line}
              alt=""
              className="event-line"
              initial={{
                opacity: 0,
                scaleX: 0,
              }}
              whileInView={{
                opacity: 1,
                scaleX: 1,
              }}
              viewport={{
                once: false,
              }}
              transition={{
                duration: 1.4,
                delay: 0.7,
                ease: smoothEase,
              }}
            />
          </motion.div>

          {/* =========================
              DATE NUMBER
          ========================== */}
          <motion.div className="event-day" variants={dayVariant}>
            26
          </motion.div>

          {/* =========================
              RESEPSI
          ========================== */}
          <motion.div
            className="event-column resepsi-column"
            variants={resepsiVariant}
          >
            <motion.img
              src={line}
              alt=""
              className="event-line"
              initial={{
                opacity: 0,
                scaleX: 0,
              }}
              whileInView={{
                opacity: 1,
                scaleX: 1,
              }}
              viewport={{
                once: false,
              }}
              transition={{
                duration: 1.4,
                delay: 0.4,
                ease: smoothEase,
              }}
            />

            <motion.div
              className="event-name"
              initial={{
                opacity: 0,
                y: 10,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: false,
              }}
              transition={{
                duration: 1.3,
                delay: 0.45,
                ease: smoothEase,
              }}
            >
              Resepsi
            </motion.div>

            <motion.div
              className="event-time"
              initial={{
                opacity: 0,
                y: 8,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: false,
              }}
              transition={{
                duration: 1.3,
                delay: 0.6,
                ease: smoothEase,
              }}
            >
              Pukul 11.00 WIB
            </motion.div>

            <motion.img
              src={line}
              alt=""
              className="event-line"
              initial={{
                opacity: 0,
                scaleX: 0,
              }}
              whileInView={{
                opacity: 1,
                scaleX: 1,
              }}
              viewport={{
                once: false,
              }}
              transition={{
                duration: 1.4,
                delay: 0.7,
                ease: smoothEase,
              }}
            />
          </motion.div>
        </motion.div>

        {/* =========================
            YEAR
        ========================== */}
        <motion.div className="year-text" variants={fadeUpVariant}>
          2026
        </motion.div>

        {/* =========================
            BUILDING
        ========================== */}
        <motion.img
          src={building}
          alt=""
          className="save-date-building"
          variants={buildingVariant}
        />
      </div>
    </motion.section>
  );
};

export default DateCatinTema3;
