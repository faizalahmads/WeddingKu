import { motion } from "framer-motion";

const CassetteIcon = ({ isPlaying }) => {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Body kaset */}
      <rect
        x="5"
        y="15"
        width="90"
        height="65"
        rx="8"
        fill="#EBCEBA"
        stroke="#590000"
        strokeWidth="3"
      />

      {/* Label tengah */}
      <rect
        x="20"
        y="25"
        width="60"
        height="22"
        rx="3"
        fill="#590000"
        stroke="#590000"
        strokeWidth="1"
      />
      <line x1="26" y1="32" x2="74" y2="32" stroke="#EBCEBA" strokeWidth="2" />
      <line x1="26" y1="39" x2="60" y2="39" stroke="#EBCEBA" strokeWidth="2" />

      {/* Lubang sekrup pojok */}
      <circle cx="12" cy="22" r="2" fill="#590000" />
      <circle cx="88" cy="22" r="2" fill="#590000" />
      <circle cx="12" cy="73" r="2" fill="#590000" />
      <circle cx="88" cy="73" r="2" fill="#590000" />

      {/* Reel kiri */}
      <motion.g
        animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
        transition={
          isPlaying
            ? { duration: 1.5, repeat: Infinity, ease: "linear" }
            : { duration: 0.3 }
        }
        style={{ originX: "32px", originY: "62px" }}
      >
        <circle
          cx="32"
          cy="62"
          r="12"
          fill="#F4EBD1"
          stroke="#590000"
          strokeWidth="2"
        />
        <circle cx="32" cy="62" r="4" fill="#590000" />
        <line
          x1="32"
          y1="52"
          x2="32"
          y2="56"
          stroke="#590000"
          strokeWidth="2"
        />
        <line
          x1="32"
          y1="68"
          x2="32"
          y2="72"
          stroke="#590000"
          strokeWidth="2"
        />
        <line
          x1="22"
          y1="62"
          x2="26"
          y2="62"
          stroke="#590000"
          strokeWidth="2"
        />
        <line
          x1="38"
          y1="62"
          x2="42"
          y2="62"
          stroke="#590000"
          strokeWidth="2"
        />
      </motion.g>

      {/* Reel kanan */}
      <motion.g
        animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
        transition={
          isPlaying
            ? { duration: 1.5, repeat: Infinity, ease: "linear" }
            : { duration: 0.3 }
        }
        style={{ originX: "68px", originY: "62px" }}
      >
        <circle
          cx="68"
          cy="62"
          r="12"
          fill="#F4EBD1"
          stroke="#590000"
          strokeWidth="2"
        />
        <circle cx="68" cy="62" r="4" fill="#590000" />
        <line
          x1="68"
          y1="52"
          x2="68"
          y2="56"
          stroke="#590000"
          strokeWidth="2"
        />
        <line
          x1="68"
          y1="68"
          x2="68"
          y2="72"
          stroke="#590000"
          strokeWidth="2"
        />
        <line
          x1="58"
          y1="62"
          x2="62"
          y2="62"
          stroke="#590000"
          strokeWidth="2"
        />
        <line
          x1="74"
          y1="62"
          x2="78"
          y2="62"
          stroke="#590000"
          strokeWidth="2"
        />
      </motion.g>
    </svg>
  );
};

export default CassetteIcon;
