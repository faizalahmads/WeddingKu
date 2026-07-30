import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

import Foto1 from "../../../../../assets/images/tema1/gallery/g1.jpg";
import Foto2 from "../../../../../assets/images/tema1/gallery/g2.jpg";
import Foto3 from "../../../../../assets/images/tema1/gallery/g3.jpg";
import Foto4 from "../../../../../assets/images/tema1/gallery/g4.jpg";
import Foto5 from "../../../../../assets/images/tema1/gallery/g5.jpg";
import Foto6 from "../../../../../assets/images/tema1/gallery/g6.jpg";
import Foto7 from "../../../../../assets/images/tema1/gallery/g7.jpg";
import Foto8 from "../../../../../assets/images/tema1/gallery/g8.jpg";
import Foto9 from "../../../../../assets/images/tema1/gallery/g9.jpg";
import Foto10 from "../../../../../assets/images/tema1/gallery/g10.jpg";

const GallerySideTema1 = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const intervalRef = useRef(null);

  const galleryImages = [
    Foto1, Foto2, Foto3, Foto4, Foto5,
    Foto6, Foto7, Foto8, Foto9, Foto10,
  ];

  const startAutoSlide = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrentSlide((prev) =>
        prev === galleryImages.length - 1 ? 0 : prev + 1,
      );
    }, 7000);
  };

  useEffect(() => {
    startAutoSlide();
    return () => clearInterval(intervalRef.current);
  }, []);

  const handleThumbClick = (index) => {
    setCurrentSlide(index);
    startAutoSlide();
  };

  return (
    <div className="gallery-side">
      {/* BACKGROUND BLUR */}
      <AnimatePresence mode="sync">
        <motion.img
          key={`bg-${currentSlide}`}
          src={galleryImages[currentSlide]}
          className="gallery-bg"
          style={{ willChange: "opacity" }}
          initial={{ opacity: 0 }}
          animate={{
            opacity: 0.45,
            transition: { duration: 1.6, ease: "easeInOut" },
          }}
          exit={{ opacity: 0, transition: { duration: 0.8 } }}
        />
      </AnimatePresence>

      <div className="gallery-overlay" />

      {/* FOTO UTAMA - hanya render 1 foto aktif dengan crossfade + Ken Burns */}
      <div className="gallery-main">
        <AnimatePresence mode="sync">
          <motion.img
            key={currentSlide}
            src={galleryImages[currentSlide]}
            className="gallery-img"
            style={{ willChange: "transform, opacity" }}
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{
              opacity: 1,
              scale: 1,
              transition: {
                opacity: { duration: 1.2, ease: "easeInOut" },
                scale: { duration: 7, ease: "linear" },
              },
            }}
            exit={{
              opacity: 0,
              transition: { duration: 0.8, ease: "easeInOut" }, // exit CEPAT, tidak ikut durasi scale
            }}
          />
        </AnimatePresence>
      </div>

      <div className="gallery-thumbs">
        {galleryImages.map((img, index) => (
          <img
            key={`thumb-${index}`}
            src={img}
            className={`thumb-img ${index === currentSlide ? "active" : ""}`}
            onClick={() => handleThumbClick(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default GallerySideTema1;