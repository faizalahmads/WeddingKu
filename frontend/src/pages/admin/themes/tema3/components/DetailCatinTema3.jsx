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

const DetailCatin = () => {
  return (
    <section className="section5">
      {/* =========================
          BASMALAH
      ========================== */}
      <motion.img
        src={Basmalah}
        className="section5-basmalah"
        alt="Bismillahirrahmanirrahim"
      />

      {/* =========================
          PEMBUKA
      ========================== */}
      <motion.p className="section5-intro">
        Dengan memohon rahmat & ridho Allah SWT,
        <br />
        kami mengundang bapak/ibu/saudara/i
        <br />
        untuk hadir pada pernikahan:
      </motion.p>

      {/* =========================
          MEMPELAI WANITA
      ========================== */}
      <div className="section5-couple section5-bride">
        <div className="section5-photo-wrapper">
          <img
            src={FotoBride}
            className="section5-photo"
            alt="Mempelai wanita"
          />

          <img src={FrameCatin} className="section5-frame" alt="" />
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
      </div>

      {/* =========================
          AMPERSAND
      ========================== */}
      <div className="section5-and">&</div>

      {/* =========================
          MEMPELAI PRIA
      ========================== */}
      <div className="section5-couple section5-groom">
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
          <img src={FotoGroom} className="section5-photo" alt="Mempelai pria" />

          <img src={FrameCatin} className="section5-frame" alt="" />
        </div>
      </div>

      {/* =========================
          BUNGA
      ========================== */}
      <img
        src={BungaKiri}
        className="section5-flower section5-flower-left"
        alt=""
      />

      <img
        src={BungaKanan}
        className="section5-flower section5-flower-right"
        alt=""
      />
    </section>
  );
};

export default DetailCatin;
