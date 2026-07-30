import { useState } from "react";
import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";

import HandUp from "../../../.././../assets/images/tema1/section7/handup.png";
import BankCard from "../../../.././../assets/images/tema1/section7/bank-card.png";
import BankCardLeft from "../../../.././../assets/images/tema1/section7/bank-card-left.png";
import BankCardRight from "../../../.././../assets/images/tema1/section7/bank-card-right.png";
import WaCard from "../../../.././../assets/images/tema1/section7/wa-card.png";

const smoothEase = [0.25, 0.1, 0.25, 1];

// Parent: atur urutan stagger
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.25,
      delayChildren: 0.1,
    },
  },
};

// Judul -> blur fade-in (konsisten dengan "The Bride")
const blurFade = {
  hidden: { opacity: 0, filter: "blur(10px)", y: 20 },
  visible: {
    opacity: 1,
    filter: "blur(0px)",
    y: 0,
    transition: { duration: 0.9, ease: smoothEase },
  },
};

// Deskripsi & teks fisik -> fade-up biasa
const fadeInUp = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: smoothEase },
  },
};

// Kartu BCA -> slide dari kiri
const slideFromLeft = {
  hidden: { opacity: 0, x: -60, rotate: -4 },
  visible: {
    opacity: 1,
    x: 0,
    rotate: 0,
    transition: { duration: 0.9, ease: smoothEase },
  },
};

// Kartu Mandiri -> slide dari kanan
const slideFromRight = {
  hidden: { opacity: 0, x: 60, rotate: 4 },
  visible: {
    opacity: 1,
    x: 0,
    rotate: 0,
    transition: { duration: 0.9, ease: smoothEase },
  },
};

// Banner WA -> scale-in dengan pulse halus setelah muncul
const waRevealVariant = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, ease: smoothEase },
  },
};

const BankAccountCard = ({
  frameImg,
  bankName,
  accountNumber,
  accountName,
  variants,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(accountNumber);
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = accountNumber;
        textArea.style.position = "fixed";
        textArea.style.opacity = "0";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
      }

      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Gagal menyalin nomor rekening:", err);
    }
  };

  return (
    <motion.div className="bank-card" variants={variants}>
      <img src={frameImg} className="bank-card-frame" alt="" />
      <div className="bank-card-content d-flex flex-column align-items-center">
        <div className="bank-name">{bankName}</div>
        <div className="bank-number">{accountNumber}</div>
        <div className="bank-account-name">A/n {accountName}</div>
        <motion.button
          className="bank-copy-btn"
          onClick={handleCopy}
          whileTap={{ scale: 0.9 }}
          animate={copied ? { scale: [1, 1.15, 1] } : { scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          {copied ? "Tersalin!" : "Salin Rekening"}
        </motion.button>
      </div>
    </motion.div>
  );
};

const WeddingGiftSection = () => {
  return (
    <motion.div
      className="wedding-gift-section d-flex flex-column align-items-center"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.2 }}
    >
      {/* Judul */}
      <motion.div
        className="gift-title-wrapper d-flex align-items-center justify-content-center"
        variants={blurFade}
      >
        <img src={HandUp} className="gift-hands-icon" alt="" />
        <div className="gift-title">WEDDING GIFT</div>
      </motion.div>

      {/* Deskripsi */}
      <motion.div className="gift-description text-center" variants={fadeInUp}>
        Doa restu anda merupakan karunia yang sangat berarti bagi kami.
        <br />
        <br />
        Dan jika memberi adalah tanda kasih, Anda dapat memberikan melalui
        dibawah ini.
      </motion.div>

      {/* Dua kartu bank berdampingan */}
      <div className="bank-cards-wrapper position-relative d-flex align-items-center justify-content-center">
        <BankAccountCard
          frameImg={BankCardLeft}
          bankName="BANK BCA"
          accountNumber="65127687"
          accountName="Nurul Alvi Novalinda"
          variants={slideFromLeft}
        />
        <BankAccountCard
          frameImg={BankCardRight}
          bankName="BANK MANDIRI"
          accountNumber="1200065127687"
          accountName="Faizal Ahmad Siddiq"
          variants={slideFromRight}
        />
      </div>

      {/* Teks hadiah fisik */}
      <motion.div
        className="gift-physical-text text-center"
        variants={fadeInUp}
      >
        Dan bisa mengirimkan hadiah dalam bentuk fisik melalui konfirmasi ke
        nomor berikut:
      </motion.div>

      {/* Banner nomor WA */}
      <motion.a
        href="https://wa.me/6287780955003"
        target="_blank"
        rel="noopener noreferrer"
        className="gift-phone-wrapper position-relative text-decoration-none"
        variants={waRevealVariant}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <img src={WaCard} className="gift-phone-banner" alt="" />
        <span className="gift-phone-number">087780955003</span>
      </motion.a>
    </motion.div>
  );
};

export default WeddingGiftSection;
