import { motion } from "framer-motion";

import BungaKiri from "../../../../../assets/images/tema3/bungaJuntaiPink.svg";
import BungaKanan from "../../../../../assets/images/tema3/bungaJuntaiHijau.svg";
import Basmalah from "../../../../../assets/images/tema3/basmalah.svg";
import FotoBride from "../../../../../assets/images/tema3/bride.png";
import FotoGroom from "../../../../../assets/images/tema3/groom.png";
import FrameCatin from "../../../../../assets/images/tema3/frameCatin.svg";

const smoothEase = [0.16, 1, 0.3, 1];

const containerVariant = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.22,
      delayChildren: 0.1,
    },
  },
};

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 16,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      ease: smoothEase,
    },
  },
};

const brideVariant = {
  hidden: {
    opacity: 0,
    x: -35,
  },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 1.2,
      ease: smoothEase,
    },
  },
};

const groomVariant = {
  hidden: {
    opacity: 0,
    x: 35,
  },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 1.2,
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
        amount: 0.25,
      }}
      variants={containerVariant}
    >
      {/* BASMALAH */}
      <motion.img
        src={Basmalah}
        className="section5-basmalah"
        alt="Bismillahirrahmanirrahim"
        variants={fadeUp}
        loading="lazy"
        decoding="async"
      />

      {/* INTRO */}
      <motion.p className="section5-intro" variants={fadeUp}>
        Dengan memohon rahmat & ridho Allah SWT,
        <br />
        kami mengundang bapak/ibu/saudara/i
        <br />
        untuk hadir pada pernikahan:
      </motion.p>

      {/* BRIDE */}
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
              loading="lazy"
              decoding="async"
            />
          </div>

          <img
            src={FrameCatin}
            className="section5-frame"
            alt=""
            loading="lazy"
            decoding="async"
          />
        </div>

        <div className="section5-info ms-2">
          <p className="section5-name">Nurul Alvi Novalinda</p>

          <p className="section5-parent">
            Putri Pertama dari
            <br />
            Bapak Suwada
            <br />& Ibu Nurhayati
          </p>
        </div>
      </motion.div>

      {/* & */}
      <motion.div className="section5-and" variants={fadeUp}>
        &
      </motion.div>

      {/* GROOM */}
      <motion.div
        className="section5-couple section5-groom"
        variants={groomVariant}
      >
        <div className="section5-info me-3">
          <p className="section5-name text-end">Faizal Ahmad Siddiq</p>

          <p className="section5-parent text-end">
            Putra Kedua dari
            <br />
            Bapak Kardjamai
            <br />& Ibu Gustia Supriyatin
          </p>
        </div>

        <div className="section5-photo-wrapper">
          <div className="section5-photo-mask">
            <img
              src={FotoGroom}
              className="section5-photo"
              alt="Mempelai pria"
              loading="lazy"
              decoding="async"
            />
          </div>

          <img
            src={FrameCatin}
            className="section5-frame"
            alt=""
            loading="lazy"
            decoding="async"
          />
        </div>
      </motion.div>

      {/* BUNGA */}
      <img
        src={BungaKiri}
        className="section5-flower section5-flower-left flower-float-left"
        alt=""
        loading="lazy"
        decoding="async"
      />

      <img
        src={BungaKanan}
        className="section5-flower section5-flower-right flower-float-right"
        alt=""
        loading="lazy"
        decoding="async"
      />
    </motion.section>
  );
};

export default DetailCatin;
