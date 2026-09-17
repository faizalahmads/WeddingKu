import { motion } from "framer-motion";

import CouplePhoto from "../../../../../assets/images/tema3/bg-merah.webp";
import Flower from "../../../../../assets/images/tema3/bungaJuntaiHijau.webp";

const WeddingSideHero = () => {
  return (
    <aside className="wedding-side">
      <motion.img
        src={CouplePhoto}
        alt=""
        className="wedding-side-bg"
        initial={{
          opacity: 0,
          scale: 1.025,
        }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        transition={{
          opacity: {
            duration: 1,
          },
          scale: {
            duration: 2.5,
            ease: [0.16, 1, 0.3, 1],
          },
        }}
      />

      <div className="wedding-side-overlay" />

      <img src={Flower} alt="" className="side-flower side-flower-top" />

      <div className="wedding-side-content">
        <span className="side-small-title">THE WEDDING OF</span>

        <h1>
          Caca
          <span>&</span>
          Faizal
        </h1>

        <div className="side-divider" />

        <p className="side-date">26 September 2026</p>

        <p className="side-location">GOR Sunter, Jakarta</p>
      </div>
    </aside>
  );
};

export default WeddingSideHero;
