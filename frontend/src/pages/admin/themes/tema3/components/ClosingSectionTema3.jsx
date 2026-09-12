import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import bungaKiriAtas from "../../../../../assets/images/tema3/bungaJuntaiHijau.svg";
import bungaKananAtas from "../../../../../assets/images/tema3/bungaJuntaiHijau.svg";
import frameEnvelope from "../../../../../assets/images/tema3/frameEnvelope.png";
import bungaKananBawah from "../../../../../assets/images/tema3/bungaJuntaiPink.svg";

const ClosingSectionTema3 = ({ invite }) => {
  const brideName = invite?.bride_name || "Caca";
  const groomName = invite?.groom_name || "Faizal";

  return (
    <section className="section11">
      <div className="container-fluid px-0">
        <div className="d-flex justify-content-center">
          <div
            className="closing-tema3-wrapper"
          >
            {/* =========================
                BUNGA KIRI ATAS
            ========================== */}
            <img
              src={bungaKiriAtas}
              alt=""
              className="closing-flower closing-flower-left"
            />

            {/* =========================
                BUNGA KANAN ATAS
            ========================== */}
            <img
              src={bungaKananAtas}
              alt=""
              className="closing-flower closing-flower-right"
            />

            {/* =========================
                FRAME + AMPLOP
            ========================== */}
            <img src={frameEnvelope} alt="" className="closing-main-frame" />

            {/* =========================
                TEXT CONTENT
            ========================== */}
            <div className="closing-content">
              <div className="closing-message">
                Menjadi sebuah kebahagiaan
                <br />
                bagi kami apabila Bapak/Ibu/Saudara/i
                <br />
                berkenan hadir dalam hari bahagia
                <br />
                kami. Terima kasih atas segala ucapan,
                <br />
                doa, dan perhatian yang diberikan.
                <br />
                <br />
                Sampai jumpa di hari pernikahan kami!
              </div>

              <div className="closing-couple">
                <div className="closing-name">{brideName}</div>

                <div className="closing-and">&amp;</div>

                <div className="closing-name">{groomName}</div>
              </div>
            </div>

            {/* =========================
                BUNGA KANAN BAWAH
            ========================== */}
            <img
              src={bungaKananBawah}
              alt=""
              className="closing-flower-bottom"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClosingSectionTema3;
