import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { IoHeart } from "react-icons/io5";

import photoStory1 from "../../../../../assets/images/tema3/bride.png";
import photoStory2 from "../../../../../assets/images/tema3/groom.png";
import bungaStory from "../../../../../assets/images/tema3/bungaJuntaiHijau.svg";

import waxSeal from "../../../../../assets/images/tema3/waxSeal.svg";

const LoveStoryTema3 = ({ invite }) => {
  const defaultStories = [
    {
      id: 1,
      title: "Awal Pertemuan",
      description:
        "Tidak ada yang benar-benar kebetulan di dunia ini. Setiap pertemuan telah diatur dengan indah, hanya menunggu waktu yang tepat untuk terjadi. Berawal dari sebuah perkenalan sederhana, tanpa banyak rencana atau harapan berlebihan, kami dipertemukan dalam cara yang tidak pernah kami duga sebelumnya.",
    },
    {
      id: 2,
      title: "Perjalanan Bersama",
      description:
        "Seiring berjalannya waktu, kebersamaan kecil yang kami lalui perlahan tumbuh menjadi sesuatu yang lebih berarti. Dalam setiap cerita, tentu ada tawa, ada juga tantangan. Namun dari situlah kami belajar untuk saling memahami, menerima, dan melengkapi satu sama lain.",
    },
    {
      id: 3,
      title: "Komitmen",
      description:
        "Hingga akhirnya kami menyadari bahwa perjalanan ini bukan lagi tentang dua orang yang berjalan sendiri, melainkan tentang dua hati yang memilih untuk melangkah bersama. Dengan penuh rasa syukur dan keyakinan, kami memutuskan untuk mengikat janji suci dan memulai babak baru dalam kehidupan kami.",
    },
  ];

  /*
    Nanti kalau data story sudah berasal dari DB:
    
    const stories =
      invite?.stories?.length > 0
        ? invite.stories
        : defaultStories;
  */

  const stories = defaultStories;

  return (
    <section
      className="section9"
    >
      <div className="container-fluid px-0">
        {/* =========================
            TOP DECORATION
        ========================= */}
        <div className="love-story-visual position-relative mx-auto">
          {/* POLAROID KIRI */}
          <div className="story-polaroid story-polaroid-left">
            <img src={photoStory1} alt="Love story 1" className="img-fluid" />
          </div>

          {/* POLAROID KANAN */}
          <div className="story-polaroid story-polaroid-right">
            <img src={photoStory2} alt="Love story 2" className="img-fluid" />
          </div>

          {/* BUNGA */}
          <img src={bungaStory} alt="" className="story-flower" />

          {/* WAX SEAL */}
          <img src={waxSeal} alt="" className="story-wax-seal" />
        </div>

        {/* =========================
            TITLE
        ========================= */}
        <div className="text-center love-story-heading">
          <h2 className="mb-0">Love Story</h2>
        </div>

        {/* =========================
            TIMELINE
        ========================= */}
        <div className="love-story-content container">
          <div className="love-story-timeline position-relative">
            {stories.map((story, index) => (
              <div
                className="story-item position-relative"
                key={story.id || index}
              >
                {/* HEART TIMELINE */}
                <div className="story-heart">
                  <IoHeart />
                </div>

                {/* TEXT */}
                <div className="story-text">
                  <h3>{story.title}</h3>

                  <p className="mb-0">{story.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoveStoryTema3;
