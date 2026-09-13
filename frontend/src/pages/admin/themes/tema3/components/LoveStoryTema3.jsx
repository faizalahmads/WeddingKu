import React from "react";
import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";
import { IoHeart } from "react-icons/io5";

import photoStory1 from "../../../../../assets/images/tema3/brideStory.png";
import photoStory2 from "../../../../../assets/images/tema3/groomStOry.png";
import bungaStory from "../../../../../assets/images/tema3/bungaJuntaiHijau.svg";
import waxSeal from "../../../../../assets/images/tema3/waxSeal.svg";

const smoothEase = [0.16, 1, 0.3, 1];

/* ========================================
   SECTION
======================================== */

const sectionVariant = {
  hidden: {},

  show: {
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.15,
    },
  },
};

/* ========================================
   HEADING
======================================== */

const headingVariant = {
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
      duration: 1.6,
      ease: smoothEase,
    },
  },
};

/* ========================================
   TIMELINE CONTAINER
======================================== */

const timelineVariant = {
  hidden: {},

  show: {
    transition: {
      staggerChildren: 0.35,
      delayChildren: 0.25,
    },
  },
};

/* ========================================
   TIMELINE ITEM
======================================== */

const storyVariant = {
  hidden: {
    opacity: 0,
    y: 28,
  },

  show: {
    opacity: 1,
    y: 0,

    transition: {
      duration: 1.6,
      ease: smoothEase,
    },
  },
};

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
    <motion.section
      className="section9"
      initial="hidden"
      whileInView="show"
      viewport={{
        once: false,
        amount: 0.2,
      }}
      variants={sectionVariant}
    >
      <div className="container-fluid px-0">
        {/* =====================================
            TOP DECORATION
        ====================================== */}

        <div className="love-story-visual position-relative mx-auto">
          {/* =====================================
              POLAROID KIRI
          ====================================== */}

          <motion.div
            className="story-polaroid story-polaroid-left"
            initial={{
              opacity: 0,
              x: -35,
              y: 25,
              rotate: -14,
              scale: 0.94,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
              y: 0,
              rotate: -10,
              scale: 1,
            }}
            viewport={{
              once: false,
              amount: 0.3,
            }}
            transition={{
              duration: 1.8,
              ease: smoothEase,
            }}
          >
            {/* Gerakan foto setelah masuk */}
            <motion.div
              className="story-photo"
              animate={{
                y: [0, -3, 0],
                rotate: [0, -0.5, 0],
              }}
              transition={{
                y: {
                  duration: 7,
                  repeat: Infinity,
                  ease: "easeInOut",
                },

                rotate: {
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              }}
            >
              <img src={photoStory1} alt="Love story 1" />
            </motion.div>
          </motion.div>

          {/* =====================================
              POLAROID KANAN
          ====================================== */}

          <motion.div
            className="story-polaroid story-polaroid-right"
            initial={{
              opacity: 0,
              x: 35,
              y: 25,
              rotate: 13,
              scale: 0.94,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
              y: 0,
              rotate: 9,
              scale: 1,
            }}
            viewport={{
              once: false,
              amount: 0.3,
            }}
            transition={{
              duration: 1.8,
              delay: 0.15,
              ease: smoothEase,
            }}
          >
            <motion.div
              className="story-photo"
              animate={{
                y: [0, 3, 0],
                rotate: [0, 0.5, 0],
              }}
              transition={{
                y: {
                  duration: 7.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                },

                rotate: {
                  duration: 8.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              }}
            >
              <img src={photoStory2} alt="Love story 2" />
            </motion.div>
          </motion.div>

          {/* =====================================
    BUNGA
====================================== */}

          <div className="story-flower-position">
            {/* Animasi saat pertama muncul */}
            <motion.div
              className="story-flower-enter"
              initial={{
                opacity: 0,
                y: -15,
                scale: 0.97,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              viewport={{
                once: false,
                amount: 0.3,
              }}
              transition={{
                duration: 1.8,
                delay: 0.3,
                ease: smoothEase,
              }}
            >
              {/* Animasi bunga setelah tampil */}
              <motion.img
                src={bungaStory}
                alt=""
                className="story-flower"
                animate={{
                  rotate: [-0.7, 0.7, -0.7],
                  y: [0, -1.5, 0],
                }}
                transition={{
                  rotate: {
                    duration: 7,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },

                  y: {
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                }}
              />
            </motion.div>
          </div>

          {/* =====================================
              WAX SEAL
          ====================================== */}

          <motion.img
            src={waxSeal}
            alt=""
            className="story-wax-seal"
            initial={{
              opacity: 0,
              scale: 0.65,
              rotate: -12,
            }}
            whileInView={{
              opacity: 1,
              scale: 1,
              rotate: 0,
            }}
            viewport={{
              once: false,
            }}
            transition={{
              duration: 1.6,
              delay: 0.6,
              ease: smoothEase,
            }}
          />
        </div>

        {/* =====================================
            TITLE
        ====================================== */}

        <motion.div
          className="text-center love-story-heading"
          variants={headingVariant}
        >
          <motion.h2
            className="mb-0"
            initial={{
              opacity: 0,
              letterSpacing: "5px",
            }}
            whileInView={{
              opacity: 1,
              letterSpacing: "0px",
            }}
            viewport={{
              once: false,
            }}
            transition={{
              duration: 1.8,
              ease: smoothEase,
            }}
          >
            Love Story
          </motion.h2>
        </motion.div>

        {/* =====================================
            TIMELINE
        ====================================== */}

        <div className="love-story-content container">
          <motion.div
            className="love-story-timeline position-relative"
            variants={timelineVariant}
          >
            {stories.map((story, index) => (
              <motion.div
                className="story-item position-relative"
                key={story.id || index}
                variants={storyVariant}
              >
                {/* =====================================
                    HEART TIMELINE
                ====================================== */}

                <motion.div
                  className="story-heart"
                  initial={{
                    opacity: 0,
                    scale: 0.5,
                  }}
                  whileInView={{
                    opacity: 1,
                    scale: 1,
                  }}
                  viewport={{
                    once: false,
                  }}
                  transition={{
                    duration: 1.2,
                    delay: 0.25,
                    ease: smoothEase,
                  }}
                >
                  <motion.div
                    animate={{
                      scale: [1, 1.07, 1],
                    }}
                    transition={{
                      duration: 3.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <IoHeart />
                  </motion.div>
                </motion.div>

                {/* =====================================
                    TEXT
                ====================================== */}

                <motion.div
                  className="story-text"
                  initial={{
                    opacity: 0,
                    x: 18,
                  }}
                  whileInView={{
                    opacity: 1,
                    x: 0,
                  }}
                  viewport={{
                    once: false,
                    amount: 0.3,
                  }}
                  transition={{
                    duration: 1.5,
                    delay: 0.25,
                    ease: smoothEase,
                  }}
                >
                  <motion.h3
                    initial={{
                      opacity: 0,
                      y: 10,
                    }}
                    whileInView={{
                      opacity: 1,
                      y: 0,
                    }}
                    viewport={{
                      once: false,
                    }}
                    transition={{
                      duration: 1.3,
                      delay: 0.3,
                      ease: smoothEase,
                    }}
                  >
                    {story.title}
                  </motion.h3>

                  <motion.p
                    className="mb-0"
                    initial={{
                      opacity: 0,
                      y: 12,
                    }}
                    whileInView={{
                      opacity: 1,
                      y: 0,
                    }}
                    viewport={{
                      once: false,
                    }}
                    transition={{
                      duration: 1.5,
                      delay: 0.45,
                      ease: smoothEase,
                    }}
                  >
                    {story.description}
                  </motion.p>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default LoveStoryTema3;
