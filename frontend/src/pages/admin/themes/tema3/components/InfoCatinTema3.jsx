import React from "react";


import coverImage from "../../../../../assets/images/tema3/coverCatin.png";

const Cover = () => {
  return (
    <section className="section4">

      <div className="cover-card">

        {/* Foto utama */}
        <div className="cover-image">

          <img
            src={coverImage}
            alt="Wedding Couple"
          />

          {/* Typography */}
          <div className="cover-title">
            <span className="the">THE</span>

            <div className="title-main">
              <span className="bride">BRIDE</span>
              <span className="groom">GROOM</span>
            </div>
          </div>

          {/* Nama pasangan */}
          <div className="couple-name">
            <span className="name-bride">Caca</span>

            <span className="name-and">&</span>

            <span className="name-groom">Faizal</span>
          </div>

        </div>

      </div>

    </section>
  );
};

export default Cover;