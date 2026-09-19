import React, { useState } from "react";

import gallery1 from "../../../../../assets/images/tema3/gallery/g1.webp";
import gallery2 from "../../../../../assets/images/tema3/gallery/g2.webp";
import gallery3 from "../../../../../assets/images/tema3/gallery/g3.webp";
import gallery4 from "../../../../../assets/images/tema3/gallery/g4.webp";
import gallery5 from "../../../../../assets/images/tema3/gallery/g5.webp";
import gallery6 from "../../../../../assets/images/tema3/gallery/g6.webp";
import gallery7 from "../../../../../assets/images/tema3/gallery/g7.webp";
import gallery8 from "../../../../../assets/images/tema3/gallery/g8.webp";
import gallery9 from "../../../../../assets/images/tema3/gallery/g9.webp";

const GalleryTema3 = ({ invite }) => {
  const [selectedIndex, setSelectedIndex] = useState(null);

  const defaultGallery = [
    gallery1,
    gallery2,
    gallery3,
    gallery4,
    gallery5,
    gallery6,
    gallery7,
    gallery8,
    gallery9,
  ];

  const galleryImages = defaultGallery;

  const openImage = (index) => {
    setSelectedIndex(index);
  };

  const closeImage = () => {
    setSelectedIndex(null);
  };

  const nextImage = (e) => {
    e.stopPropagation();

    setSelectedIndex((prev) =>
      prev === galleryImages.length - 1 ? 0 : prev + 1,
    );
  };

  const prevImage = (e) => {
    e.stopPropagation();

    setSelectedIndex((prev) =>
      prev === 0 ? galleryImages.length - 1 : prev - 1,
    );
  };

  return (
    <>
      <section className="section10 gallery-tema3">
        <div className="container-fluid px-0 gallery-container">
          {/* TITLE */}
          <div className="gallery-title-wrapper">
            <h2 className="gallery-title mb-0">Gallery</h2>
          </div>

          {/* GALLERY COLLAGE */}
          <div className="gallery-collage">
            {/* BLOCK 1 */}
            <div className="gallery-block gallery-block-normal">
              <div className="gallery-small-stack">
                <div className="gallery-photo" onClick={() => openImage(0)}>
                  <img src={galleryImages[0]} alt="Gallery 1" />
                </div>

                <div className="gallery-photo" onClick={() => openImage(1)}>
                  <img src={galleryImages[1]} alt="Gallery 2" />
                </div>
              </div>

              <div
                className="gallery-photo gallery-photo-large"
                onClick={() => openImage(2)}
              >
                <img src={galleryImages[2]} alt="Gallery 3" />
              </div>
            </div>

            {/* BLOCK 2 */}
            <div className="gallery-block gallery-block-reverse">
              <div
                className="gallery-photo gallery-photo-large"
                onClick={() => openImage(3)}
              >
                <img src={galleryImages[3]} alt="Gallery 4" />
              </div>

              <div className="gallery-small-stack">
                <div className="gallery-photo" onClick={() => openImage(4)}>
                  <img src={galleryImages[4]} alt="Gallery 5" />
                </div>

                <div className="gallery-photo" onClick={() => openImage(5)}>
                  <img src={galleryImages[5]} alt="Gallery 6" />
                </div>
              </div>
            </div>

            {/* BLOCK 3 */}
            <div className="gallery-block gallery-block-normal">
              <div className="gallery-small-stack">
                <div className="gallery-photo" onClick={() => openImage(6)}>
                  <img src={galleryImages[6]} alt="Gallery 7" />
                </div>

                <div className="gallery-photo" onClick={() => openImage(7)}>
                  <img src={galleryImages[7]} alt="Gallery 8" />
                </div>
              </div>

              <div
                className="gallery-photo gallery-photo-large"
                onClick={() => openImage(8)}
              >
                <img src={galleryImages[8]} alt="Gallery 9" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================
          GALLERY POPUP
      ========================== */}
      {selectedIndex !== null && (
        <div className="gallery-popup" onClick={closeImage}>
          {/* CLOSE */}
          <button
            className="gallery-popup-close"
            onClick={closeImage}
            aria-label="Close gallery"
          >
            ×
          </button>

          {/* PREVIOUS */}
          <button
            className="gallery-popup-nav gallery-popup-prev"
            onClick={prevImage}
            aria-label="Previous image"
          >
            ‹
          </button>

          {/* IMAGE */}
          <div
            className="gallery-popup-content"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={galleryImages[selectedIndex]}
              alt={`Gallery ${selectedIndex + 1}`}
            />

            <div className="gallery-popup-counter">
              {selectedIndex + 1} / {galleryImages.length}
            </div>
          </div>

          {/* NEXT */}
          <button
            className="gallery-popup-nav gallery-popup-next"
            onClick={nextImage}
            aria-label="Next image"
          >
            ›
          </button>
        </div>
      )}
    </>
  );
};

export default GalleryTema3;
