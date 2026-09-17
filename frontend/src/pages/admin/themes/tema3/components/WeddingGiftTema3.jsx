import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { IoCopyOutline, IoCheckmarkOutline } from "react-icons/io5";
import { FaWhatsapp } from "react-icons/fa";

import gift from "../../../../../assets/images/tema3/giftIcon.svg";
import bungaPink from "../../../../../assets/images/tema3/bungaJuntaiPink.webp";
import bungaHijau from "../../../../../assets/images/tema3/bungaJuntaiHijau.webp";

/* ========================================
   EASING
======================================== */

const smoothEase = [0.16, 1, 0.3, 1];

/* ========================================
   FADE UP
======================================== */

const fadeUpVariant = {
  hidden: {
    opacity: 0,
    y: 20,
  },

  show: {
    opacity: 1,
    y: 0,

    transition: {
      duration: 1.5,
      ease: smoothEase,
    },
  },
};

/* ========================================
   TITLE
======================================== */

const titleVariant = {
  hidden: {
    opacity: 0,
    y: 22,
    scale: 0.97,
  },

  show: {
    opacity: 1,
    y: 0,
    scale: 1,

    transition: {
      duration: 1.7,
      ease: smoothEase,
    },
  },
};

/* ========================================
   BANK WRAPPER
======================================== */

const bankWrapperVariant = {
  hidden: {},

  show: {
    transition: {
      staggerChildren: 0.22,
      delayChildren: 0.15,
    },
  },
};

/* ========================================
   BANK CARD
======================================== */

const bankCardVariant = {
  hidden: {
    opacity: 0,
    y: 24,
    scale: 0.97,
  },

  show: {
    opacity: 1,
    y: 0,
    scale: 1,

    transition: {
      duration: 1.5,
      ease: smoothEase,
    },
  },
};

/* ========================================
   CONTACT
======================================== */

const contactVariant = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.97,
  },

  show: {
    opacity: 1,
    y: 0,
    scale: 1,

    transition: {
      duration: 1.4,
      ease: smoothEase,
    },
  },
};

const WeddingGift = ({ invite }) => {
  const [copied, setCopied] = useState(null);

  const bankAccounts = [
    {
      id: "bride",
      number: invite?.bride_norek,
      bank: invite?.bride_bank_name,
      name: invite?.bride_name_bank,
    },

    {
      id: "groom",
      number: invite?.groom_norek,
      bank: invite?.groom_bank_name,
      name: invite?.groom_name_bank,
    },
  ].filter((account) => account.number);

  const contacts = [
    {
      id: 1,
      phone: "0877 7833 2021",
      whatsapp: "6287778332021",
      name: "Caca",
    },

    {
      id: 2,
      phone: "0877 8095 5003",
      whatsapp: "6287780955003",
      name: "Faizal",
    },
  ];

  const handleCopy = async (account) => {
    const number = String(account.number || "").trim();

    if (!number) {
      console.error("Nomor rekening kosong");
      return;
    }

    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(number);
      } else {
        const textarea = document.createElement("textarea");

        textarea.value = number;
        textarea.style.position = "fixed";
        textarea.style.left = "-9999px";
        textarea.style.top = "-9999px";

        document.body.appendChild(textarea);

        textarea.focus();
        textarea.select();

        const success = document.execCommand("copy");

        document.body.removeChild(textarea);

        if (!success) {
          throw new Error("Fallback copy gagal");
        }
      }

      setCopied(account.id);

      setTimeout(() => {
        setCopied(null);
      }, 1500);
    } catch (error) {
      console.error("Gagal menyalin nomor rekening:", error);
    }
  };

  return (
    <section
      className="section8"
    >
      {/* BUNGA ATAS KIRI */}
      <img
        src={bungaHijau}
        alt=""
        className="gift-flower gift-flower-top-left"
      />

      {/* BUNGA ATAS KANAN */}
      <img
        src={bungaHijau}
        alt=""
        className="gift-flower gift-flower-top-right"
      />

      <div className="gift-tema3-wrapper container-fluid">
        {/* =====================================
            TITLE
        ====================================== */}

        <motion.div
          className="gift-tema3-header text-center"
          variants={titleVariant}
        >
          <motion.h2
            className="gift-tema3-title"
            initial={{
              opacity: 0,
              y: 16,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 1.5,
              ease: smoothEase,
            }}
          >
            Wedding Gift
          </motion.h2>

          <img src={gift} alt="" className="gift-icon gift-icon-float" />
        </motion.div>

        {/* =====================================
            DESCRIPTION
        ====================================== */}

        <motion.div
          className="gift-tema3-description text-center"
          variants={fadeUpVariant}
        >
          <motion.p
            initial={{
              opacity: 0,
              y: 12,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 1.4,
              ease: smoothEase,
            }}
          >
            Doa restu dan kehadiran Anda merupakan
            <br />
            karunia yang sangat berarti bagi kami.
          </motion.p>

          <motion.p
            initial={{
              opacity: 0,
              y: 12,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 1.4,
              delay: 0.2,
              ease: smoothEase,
            }}
          >
            Namun, jika memberi adalah ungkapan tanda kasih,
            <br />
            Anda dapat memberi melalui di bawah ini.
          </motion.p>
        </motion.div>

        {/* =====================================
            BANK ACCOUNT
        ====================================== */}

        {bankAccounts.length > 0 && (
          <motion.div
            className="gift-bank-wrapper row g-3 justify-content-center"
            variants={bankWrapperVariant}
          >
            {bankAccounts.map((account) => (
              <motion.div
                className="col-6 text-center"
                key={account.id}
                variants={bankCardVariant}
              >
                <motion.div
                  className="gift-bank-item"
                  whileHover={{
                    y: -3,
                    scale: 1.015,
                  }}
                  transition={{
                    duration: 0.35,
                    ease: smoothEase,
                  }}
                >
                  <motion.p
                    className="gift-bank-number"
                    initial={{
                      opacity: 0,
                      y: 8,
                    }}
                    whileInView={{
                      opacity: 1,
                      y: 0,
                    }}
                    viewport={{
                      once: true,
                    }}
                    transition={{
                      duration: 1.2,
                      delay: 0.2,
                      ease: smoothEase,
                    }}
                  >
                    {account.number}
                  </motion.p>

                  <p className="gift-bank-name">{account.bank || "-"}</p>

                  <p className="gift-bank-owner">a.n {account.name}</p>

                  <motion.button
                    type="button"
                    className="gift-copy-btn"
                    onClick={() => handleCopy(account)}
                    whileHover={{
                      scale: 1.04,
                    }}
                    whileTap={{
                      scale: 0.95,
                    }}
                    transition={{
                      duration: 0.25,
                    }}
                  >
                    <AnimatePresence mode="wait">
                      {copied === account.id ? (
                        <motion.span
                          key="copied"
                          className="d-flex align-items-center gap-1"
                          initial={{
                            opacity: 0,
                            y: 5,
                          }}
                          animate={{
                            opacity: 1,
                            y: 0,
                          }}
                          exit={{
                            opacity: 0,
                            y: -5,
                          }}
                          transition={{
                            duration: 0.25,
                          }}
                        >
                          <IoCheckmarkOutline />

                          <span>Copied</span>
                        </motion.span>
                      ) : (
                        <motion.span
                          key="copy"
                          className="d-flex align-items-center gap-1"
                          initial={{
                            opacity: 0,
                          }}
                          animate={{
                            opacity: 1,
                          }}
                          exit={{
                            opacity: 0,
                          }}
                          transition={{
                            duration: 0.25,
                          }}
                        >
                          <IoCopyOutline />

                          <span>Copy</span>
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </motion.button>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* =====================================
            PHYSICAL GIFT
        ====================================== */}

        <motion.div
          className="gift-physical-description text-center"
          variants={fadeUpVariant}
        >
          <p>
            Dan bisa mengirimkan hadiah dalam bentuk fisik
            <br />
            bisa kirim melalui alamat di bawah dan konfirmasi ke nomor berikut:
          </p>
        </motion.div>

        {/* =====================================
            CONTACT / WHATSAPP
        ====================================== */}

        <motion.div
          className="gift-contact-wrapper row g-3 justify-content-center"
          variants={{
            hidden: {},

            show: {
              transition: {
                staggerChildren: 0.2,
                delayChildren: 0.15,
              },
            },
          }}
        >
          {contacts.map((contact) => (
            <motion.div
              className="col-6 text-center"
              key={contact.id}
              variants={contactVariant}
            >
              <motion.a
                href={`https://wa.me/${contact.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="gift-contact-card"
                whileHover={{
                  y: -3,
                  scale: 1.02,
                }}
                whileTap={{
                  scale: 0.97,
                }}
                transition={{
                  duration: 0.3,
                  ease: smoothEase,
                }}
              >
                <div className="gift-whatsapp-icon">
                  <FaWhatsapp className="gift-contact-icon" />
                </div>

                <span className="gift-contact-phone">{contact.phone}</span>

                <span className="gift-contact-name">{contact.name}</span>
              </motion.a>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* =====================================
          BUNGA BAWAH
      ====================================== */}

      {/* BUNGA BAWAH KANAN */}
      <img
        src={bungaPink}
        alt=""
        className="gift-flower gift-flower-bottom-right"
      />
    </section>
  );
};

export default WeddingGift;
