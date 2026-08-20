import { useState, useEffect } from "react";

import GallerySide from "../tema1/components/GallerySideTema1";
import CatinSide from "../tema1/components/CatinSectionTema1.jsx";
import EnvelopeSection from "../tema1/components/EnvelopeSectionTema1.jsx";
import WeddingCardSection from "../tema1/components/WeddingCardSectionTema1.jsx";
import AyatSection from "../tema1/components/AyatSectionTema1.jsx";



import { useSectionScrollLock } from "../tema1/hooks/useSectionScrollLock";
import "../../../../assets/css/PreviewTema3.css";




const PreviewTema3 = () => {
  const [open, setOpen] = useState(false);
  const [showLetter, setShowLetter] = useState(false);
  const { isSlide2 } = useSectionScrollLock();
  

  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        setShowLetter(true);
      }, 800); // durasi flap

      return () => clearTimeout(timer);
    } else {
      setShowLetter(false);
    }
  }, [open]);

  const handleOpen = () => {
    setOpen(true);
    setTimeout(() => {
      window.scrollTo({
        top: window.innerHeight,
        behavior: "smooth",
      });
    }, 2000);
  };

  return (
    <div className="desktopLayout">
      <GallerySide />

      <div className="wrapperTema1">
        <EnvelopeSection
          open={open}
          showLetter={showLetter}
          isSlide2={isSlide2}
          onOpen={handleOpen}
        />

        {open && (
          <WeddingCardSection
            isSlide2={isSlide2}
            onQRClick={() => setShowQR(true)}
          />
        )}

        {open && <AyatSection />}
      </div>
    </div>
  );
};

export default PreviewTema3;
