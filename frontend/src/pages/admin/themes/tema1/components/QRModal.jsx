import { AnimatePresence, motion } from "framer-motion";
import { useRef } from "react";
import { IoClose, IoLocationOutline, IoCalendarOutline } from "react-icons/io5";
import { HiOutlineDownload } from "react-icons/hi";
import { QRCode } from "react-qrcode-logo";
import Logo from "../../../../../assets/icons/Logo.svg";

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

export default function GuestQrModal({ show, onClose, qrValue, guestName, guestRole }) {
const modalRef = useRef(null);

const handleDownloadQR = async () => {
  if (!modalRef.current) return;

  try {
    const html2canvas = (await import("html2canvas")).default;

    const canvas = await html2canvas(modalRef.current, {
      scale: 3,
      useCORS: true,
      backgroundColor: "#ffffff",
    });

    const image = canvas.toDataURL("image/png");

    const link = document.createElement("a");

    link.href = image;
    link.download = `guest-qr-${guestName || "tamu"}.png`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error("Gagal download QR:", error);
  }
};

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
            ref={modalRef}
            className="guest-modal"
            variants={modal}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
          >
            {/* CLOSE */}
            <motion.button
              variants={item}
              className="guest-close"
              onClick={onClose}
              data-html2canvas-ignore="true"
            >
              <IoClose />
            </motion.button>

            {/* TITLE */}
            <motion.h6 variants={item} className="guest-pass">
              GUEST ENTRY PASS
            </motion.h6>

            <motion.div variants={item}>
              <h1 className="guest-name">{guestName}</h1>

              {guestRole && <p className="guest-role">{guestRole}</p>}
            </motion.div>

            {/* QR CODE */}
            <motion.div variants={item} className="guest-qr">
              <QRCode
                value={qrValue || ""}
                size={200}
                logoImage={Logo}
                logoWidth={60}
                logoHeight={15}
                logoOpacity={1}
                removeQrCodeBehindLogo={true}
                qrStyle="dots"
                eyeRadius={8}
              />
            </motion.div>

            {/* CAPTION */}
            <motion.p variants={item} className="guest-caption">
              Mohon Tampilkan QR Code Kepada Petugas
            </motion.p>

            {/* INFO */}
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

            {/* DOWNLOAD */}
            <motion.button
              variants={item}
              whileHover={{
                scale: 1.04,
              }}
              whileTap={{
                scale: 0.96,
              }}
              className="guest-download"
              onClick={handleDownloadQR}
              data-html2canvas-ignore="true"
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
