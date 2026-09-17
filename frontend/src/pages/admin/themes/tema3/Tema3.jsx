import { useState, useEffect, lazy, Suspense } from "react";
import axios from "axios";

import WeddingSideHero from "./components/WeddingSideHero.JSX";
import CatinSide from "../tema1/components/CatinSectionTema1.jsx";
import EnvelopeSection from "../tema1/components/EnvelopeSectionTema1.jsx";
import WeddingCardSection from "../tema1/components/WeddingCardSectionTema1.jsx";
import AyatSection from "../tema1/components/AyatSectionTema1.jsx";
import InfoCation from "../tema3/components/InfoCatinTema3.jsx";
import SaveTheDate from "../tema3/components/DateCatinTema3.jsx";
import DetailCatin from "../tema3/components/DetailCatinTema3.jsx";
import DetailAcara from "../tema3/components/DetailAcaraTema3.jsx";
const LoveStory = lazy(() => import("../tema3/components/LoveStoryTema3.jsx"));
const Gallery = lazy(() => import("../tema3/components/GalleryTema3.jsx"));
const WeddingGift = lazy(
  () => import("../tema3/components/WeddingGiftTema3.jsx"),
);
const Rsvp = lazy(() => import("./components/RsvpTema3.jsx"));
const ClosingSection = lazy(
  () => import("./components/ClosingSectionTema3.jsx"),
);

import { useSectionScrollLock } from "../tema1/hooks/useSectionScrollLock";
import "../../../../assets/css/PreviewTema3.css";

import QRButton from "../tema1/components/QRButton.jsx";
import MusicPlayer from "../tema1/components/MusicPlayer.jsx";

import QRModal from "../tema1/components/QRModal.jsx";
import BgMusic from "../../../../assets/audio/Thank God I Found You  Cover by BuDaKhelxKat (Lyrics).mp3";

const Tema3 = () => {
  const [invite, setInvite] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const queryParams = new URLSearchParams(location.search);
  const toParam = queryParams.get("to");
  const [name, code] = toParam ? toParam.split("/") : [];

  const [showQR, setShowQR] = useState(false);
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

  useEffect(() => {
    const fetchInvite = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/undangan/${name}/${code}`,
        );
        setInvite(res.data);
      } catch (err) {
        console.error(err);
        setError("Undangan tidak ditemukan");
      } finally {
        setLoading(false);
      }
    };

    if (name && code) fetchInvite();
  }, [name, code]);

  return (
    <div className="desktopLayout">
      <WeddingSideHero />

      <div className="wrapperTema1">
        <EnvelopeSection
          open={open}
          showLetter={showLetter}
          isSlide2={isSlide2}
          onOpen={handleOpen}
          guestName={
            invite?.guest_name ? `${invite.guest_name}` : "Tamu Undangan"
          }
        />

        {open && (
          <WeddingCardSection
            isSlide2={isSlide2}
            onQRClick={() => setShowQR(true)}
          />
        )}

        {open && <AyatSection />}

        {open && <InfoCation />}

        {open && <DetailCatin />}

        {open && <SaveTheDate />}

        {open && <DetailAcara />}

        {open && (
          <Suspense fallback={null}>
            <LoveStory />

            <Gallery />

            <WeddingGift invite={invite} />

            <Rsvp invite={invite} />

            <ClosingSection />
          </Suspense>
        )}
      </div>

      {open && <QRButton onClick={() => setShowQR(true)} />}
      {open && <MusicPlayer shouldPlay={open} src={BgMusic} />}

      <QRModal
        show={showQR}
        onClose={() => setShowQR(false)}
        qrValue={invite?.guest_code}
        guestName={
          invite?.guest_name ? `${invite.guest_name}` : "Tamu Undangan"
        }
        guestRole={
          invite?.guest_category === "VIP" ? "Executive VIP Invitation" : ""
        }
      />
    </div>
  );
};

export default Tema3;
