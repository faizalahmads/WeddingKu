import { AnimatePresence, motion } from "framer-motion";
import { IoClose, IoLocationOutline, IoCalendarOutline } from "react-icons/io5";
import { HiOutlineDownload } from "react-icons/hi";
import { QRCodeCanvas } from "qrcode.react";

const overlay = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.25 },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.2 },
  },
};

const modal = {
  hidden: {
    opacity: 0,
    scale: 0.9,
    y: 40,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: "easeOut",
      when: "beforeChildren",
      staggerChildren: 0.08,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.92,
    y: 20,
  },
};

const item = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
  },
};

export default function GuestQrModal({ show, onClose, qrValue }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="guest-overlay"
          variants={overlay}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={onClose}
        >
          <motion.div
            className="guest-modal"
            variants={modal}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
          >
            <motion.button
              variants={item}
              className="guest-close"
              onClick={onClose}
            >
              <IoClose />
            </motion.button>

            <motion.h6 variants={item} className="guest-pass">
              GUEST ENTRY PASS
            </motion.h6>

            <motion.div variants={item}>
              <h1 className="guest-name">Eliano & Partner</h1>

              <p className="guest-role">Executive VIP Invitation</p>
            </motion.div>

            <motion.div variants={item} className="guest-qr">
              <QRCodeCanvas
                value={qrValue}
                size={200}
                level="H"
                marginSize={0}
              />
            </motion.div>

            <motion.p variants={item} className="guest-caption">
              Mohon Tampilkan QR Code Kepada Petugas
            </motion.p>

            <motion.div variants={item} className="guest-info">
              <div className="guest-item">
                <IoLocationOutline className="guest-icon" />

                <span>Venue</span>

                <strong>GOR Sunter</strong>
              </div>

              <div className="guest-divider" />

              <div className="guest-item">
                <IoCalendarOutline className="guest-icon" />

                <span>Date</span>

                <strong>26 • 09 • 2026</strong>
              </div>
            </motion.div>

            <motion.button
              variants={item}
              whileHover={{
                scale: 1.04,
              }}
              whileTap={{
                scale: 0.96,
              }}
              className="guest-download"
            >
              <HiOutlineDownload />
              Download QR
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
