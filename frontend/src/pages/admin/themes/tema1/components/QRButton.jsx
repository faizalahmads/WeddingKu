import { motion } from "framer-motion";
import QRIcon from "./QRIcon.jsx";

const QRButton = ({ onClick }) => {
  return (
    <motion.button
      className="qr-toggle-btn"
      onClick={onClick}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      whileTap={{ scale: 0.9 }}
      aria-label="Tampilkan QR Code"
    >
      <QRIcon />
    </motion.button>
  );
};

export default QRButton;
