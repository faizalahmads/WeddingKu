import { useState, useEffect } from "react";
import GallerySide from "./components/GallerySideTema1";
import CatinSide from "./components/CatinSectionTema1.jsx";
import EnvelopeSection from "./components/EnvelopeSectionTema1.jsx";
import WeddingCardSection from "./components/WeddingCardSectionTema1.jsx";
import AyatSection from "./components/AyatSectionTema1.jsx";
import SaveDate from "./components/SaveDateTema1.jsx";
import EventDetailSection from "./components/EventDetailTema1.jsx";
import WeddingGift from "./components/WeddingGiftTema1.jsx";
import QRButton from "./components/QRButton.jsx";
import MusicPlayer from "./components/MusicPlayer.jsx";

import QRModal from "./components/QRModal.jsx";
import { useSectionScrollLock } from "./hooks/useSectionScrollLock";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../../../assets/css/PreviewTema1.css";

import BgMusic from "../../../../assets/audio/Thank God I Found You  Cover by BuDaKhelxKat (Lyrics).mp3";

const PreviewTema1 = () => {
  const [open, setOpen] = useState(false);
  const [showLetter, setShowLetter] = useState(false);
  const [showQR, setShowQR] = useState(false);
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
    <div className="desktop-layout">
      <GallerySide />

      <div className="wrapper-tema1">
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

        {open && (
          <section className="section-4">
            <CatinSide />
          </section>
        )}

        {open && <SaveDate />}

        {open && <EventDetailSection />}

        {open && <WeddingGift />}

        {open && <QRButton onClick={() => setShowQR(true)} />}
        {open && <MusicPlayer shouldPlay={open} src={BgMusic} />}
      </div>

      <QRModal
        show={showQR}
        onClose={() => setShowQR(false)}
        qrValue="https://undangan-kamu.com/rsvp?tamu=Juleha-Saprudin"
      />
    </div>
  );
};

export default PreviewTema1;
