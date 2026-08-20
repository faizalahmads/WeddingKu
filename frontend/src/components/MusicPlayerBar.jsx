import { useState, useRef, useEffect } from "react";
import "../assets/css/PreviewTema3.css";

const MusicPlayerBar = ({ src, autoPlay = false, onPlayPause }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isShuffle, setIsShuffle] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      if (audio.duration) {
        setProgress((audio.currentTime / audio.duration) * 100);
      }
    };

    audio.addEventListener("timeupdate", updateProgress);
    return () => audio.removeEventListener("timeupdate", updateProgress);
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.play().catch(() => {});
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  const togglePlay = () => {
    const next = !isPlaying;
    setIsPlaying(next);
    onPlayPause?.(next);
  };

  const handleSeek = (e) => {
    const audio = audioRef.current;
    const value = Number(e.target.value);
    setProgress(value);
    if (audio && audio.duration) {
      audio.currentTime = (value / 100) * audio.duration;
    }
  };

  return (
    <div className="mpb-bar">
      {src && (
        <audio
          ref={audioRef}
          src={src}
          loop={isRepeat}
          onEnded={() => !isRepeat && setIsPlaying(false)}
        />
      )}

      <input
        type="range"
        className="mpb-progress"
        min="0"
        max="100"
        step="0.1"
        value={progress}
        onChange={handleSeek}
        aria-label="Seek"
      />

      <div className="mpb-controls">
        <button
          type="button"
          className={`mpb-icon-btn ${isShuffle ? "is-active" : ""}`}
          onClick={() => setIsShuffle((v) => !v)}
          aria-label="Shuffle"
          aria-pressed={isShuffle}
        >
          <ShuffleIcon />
        </button>

        <button type="button" className="mpb-icon-btn" aria-label="Previous">
          <SkipBackIcon />
        </button>

        <button
          type="button"
          className="mpb-play-btn"
          onClick={togglePlay}
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? <PauseIcon /> : <PlayIcon />}
        </button>

        <button type="button" className="mpb-icon-btn" aria-label="Next">
          <SkipForwardIcon />
        </button>

        <button
          type="button"
          className={`mpb-icon-btn ${isRepeat ? "is-active" : ""}`}
          onClick={() => setIsRepeat((v) => !v)}
          aria-label="Repeat"
          aria-pressed={isRepeat}
        >
          <RepeatIcon />
        </button>
      </div>
    </div>
  );
};

/* ---------- inline icons (no external deps) ---------- */

const ShuffleIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 3 21 3 21 8" />
    <line x1="4" y1="20" x2="21" y2="3" />
    <polyline points="21 16 21 21 16 21" />
    <line x1="15" y1="15" x2="21" y2="21" />
    <line x1="4" y1="4" x2="9" y2="9" />
  </svg>
);

const RepeatIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="17 1 21 5 17 9" />
    <path d="M3 11V9a4 4 0 0 1 4-4h14" />
    <polyline points="7 23 3 19 7 15" />
    <path d="M21 13v2a4 4 0 0 1-4 4H3" />
  </svg>
);

const SkipBackIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
    <polygon points="19 20 9 12 19 4 19 20" />
    <rect x="5" y="4" width="2" height="16" />
  </svg>
);

const SkipForwardIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
    <polygon points="5 4 15 12 5 20 5 4" />
    <rect x="17" y="4" width="2" height="16" />
  </svg>
);

const PlayIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
    <polygon points="6 3 20 12 6 21 6 3" />
  </svg>
);

const PauseIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
    <rect x="6" y="4" width="4" height="16" />
    <rect x="14" y="4" width="4" height="16" />
  </svg>
);

export default MusicPlayerBar;
