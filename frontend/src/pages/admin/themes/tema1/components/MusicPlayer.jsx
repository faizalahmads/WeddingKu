import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import CassetteIcon from "./CassetteIcon.jsx";

const MusicPlayer = ({ shouldPlay, src }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (shouldPlay && audioRef.current) {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => {
          console.warn("Autoplay musik diblokir:", err);
          setIsPlaying(false);
        });
    }
  }, [shouldPlay]);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <>
      <audio ref={audioRef} src={src} loop />

      <motion.button
        className="music-toggle-btn"
        onClick={togglePlay}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        whileTap={{ scale: 0.9 }}
        aria-label={isPlaying ? "Pause musik" : "Putar musik"}
      >
        <CassetteIcon isPlaying={isPlaying} />
      </motion.button>
    </>
  );
};

export default MusicPlayer;
