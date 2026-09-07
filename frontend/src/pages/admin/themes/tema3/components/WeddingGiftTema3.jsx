import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import { IoCopyOutline } from "react-icons/io5";

import gift from "../../../../../assets/images/tema3/giftIcon.svg";
import bungaPink from "../../../../../assets/images/tema3/bungaJuntaiPink.svg";
import bungaHijau from "../../../../../assets/images/tema3/bungaJuntaiHijau.svg";

const WeddingGift = ({ invite }) => {
  const [copied, setCopied] = useState(null);

  const bankAccounts = [
    {
      id: "groom",
      number: invite?.groom_norek,
      bank: invite?.groom_bank_name,
      name: invite?.groom_name_bank,
    },
    {
      id: "bride",
      number: invite?.bride_norek,
      bank: invite?.bride_bank_name,
      name: invite?.bride_name_bank,
    },
  ].filter((account) => account.number);

  const contacts = [
    {
      id: 1,
      phone: "0811 2233 4455",
      whatsapp: "6281122334455",
      name: "Airin",
    },
    {
      id: 2,
      phone: "0811 2233 4455",
      whatsapp: "6281122334455",
      name: "Airin",
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

      console.log("Berhasil copy:", number);

      setCopied(account.id);

      setTimeout(() => {
        setCopied(null);
      }, 1500);
    } catch (error) {
      console.error("Gagal menyalin nomor rekening:", error);
    }
  };

  return (
    <section className="section8">
      {/* ORNAMEN ATAS */}
      <img
        src={bungaHijau}
        alt=""
        className="gift-flower gift-flower-top-left"
      />

      <img
        src={bungaHijau}
        alt=""
        className="gift-flower gift-flower-top-right"
      />

      <div className="gift-tema3-wrapper container-fluid">
        {/* TITLE */}
        <div className="gift-tema3-header text-center">
          <h2 className="gift-tema3-title">Wedding Gift</h2>

          <img src={gift} alt="" className="gift-icon" />
        </div>

        {/* DESCRIPTION */}
        <div className="gift-tema3-description text-center">
          <p>
            Doa restu dan kehadiran Anda merupakan
            <br />
            karunia yang sangat berarti bagi kami.
          </p>

          <p>
            Namun, jika memberi adalah ungkapan tanda kasih,
            <br />
            Anda dapat memberi melalui di bawah ini.
          </p>
        </div>

        {/* BANK ACCOUNT */}
        {bankAccounts.length > 0 && (
          <div className="gift-bank-wrapper row g-3 justify-content-center">
            {bankAccounts.map((account) => (
              <div className="col-6 text-center" key={account.id}>
                <div className="gift-bank-item">
                  <p className="gift-bank-number">{account.number}</p>

                  <p className="gift-bank-name">{account.bank || "-"}</p>

                  <p className="gift-bank-owner">a.n {account.name}</p>

                  <button
                    type="button"
                    className="gift-copy-btn"
                    onClick={() => handleCopy(account)}
                  >
                    <IoCopyOutline />

                    <span>{copied === account.id ? "Copied" : "Copy"}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* DESCRIPTION PHYSICAL GIFT */}
        <div className="gift-physical-description text-center">
          <p>
            Dan bisa mengirimkan hadiah dalam bentuk fisik
            <br />
            bisa kirim melalui alamat di bawah dan konfirmasi ke nomor berikut:
          </p>
        </div>

        {/* CONTACT / WHATSAPP */}
        <div className="gift-contact-wrapper row g-3 justify-content-center">
          {contacts.map((contact) => (
            <div className="col-6 text-center" key={contact.id}>
              <a
                href={`https://wa.me/${contact.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="gift-contact-card"
              >
                <span className="gift-contact-phone">{contact.phone}</span>

                <span className="gift-contact-name">{contact.name}</span>
              </a>
            </div>
          ))}
        </div>
      </div>

      <img
        src={bungaPink}
        alt=""
        className="gift-flower gift-flower-middle-left"
      />

      <img
        src={bungaPink}
        alt=""
        className="gift-flower gift-flower-bottom-right"
      />
    </section>
  );
};

export default WeddingGift;
