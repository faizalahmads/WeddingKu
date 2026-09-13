import React from "react";
import { motion } from "framer-motion";

import coverImage from "../../../../../assets/images/tema3/coverCatin.png";

const smoothEase = [0.22, 1, 0.36, 1];

const Cover = () => {
  return (
    <motion.section
      className="section4"
      initial="hidden"
      whileInView="show"
      viewport={{
        once: false,
        amount: 0.45,
      }}
    >
      <motion.div
        className="cover-card"
        variants={{
          hidden: {
            opacity: 0,
            y: 50,
            scale: 0.96,
          },

          show: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
              duration: 1.1,
              ease: smoothEase,
            },
          },
        }}
      >
        {/* Foto utama */}
        <div className="cover-image">
          {/* Background / Couple Image */}
          <motion.img
            src={coverImage}
            alt="Wedding Couple"
            initial={{
              scale: 1.12,
              opacity: 0,
            }}
            whileInView={{
              opacity: 1,
              scale: [1.08, 1.02, 1.08],
            }}
            viewport={{
              once: false,
              amount: 0.4,
            }}
            transition={{
              opacity: {
                duration: 1.2,
              },

              scale: {
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
          />

          {/* Typography */}
          <div className="cover-title">
            {/* THE */}
            <motion.span
              className="the"
              initial={{
                opacity: 0,
                y: -15,
                letterSpacing: "20px",
              }}
              whileInView={{
                opacity: 1,
                y: 0,
                letterSpacing: "8px",
              }}
              viewport={{ once: false }}
              transition={{
                duration: 0.9,
                delay: 0.4,
                ease: smoothEase,
              }}
            >
              THE
            </motion.span>

            <div className="title-main">
              {/* BRIDE */}
              <motion.span
                className="bride"
                initial={{
                  opacity: 0,
                  x: -80,
                }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                }}
                viewport={{ once: false }}
                transition={{
                  duration: 1,
                  delay: 0.6,
                  ease: smoothEase,
                }}
              >
                BRIDE
              </motion.span>

              {/* GROOM */}
              <motion.span
                className="groom"
                initial={{
                  opacity: 0,
                  x: 80,
                }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                }}
                viewport={{ once: false }}
                transition={{
                  duration: 1,
                  delay: 0.75,
                  ease: smoothEase,
                }}
              >
                GROOM
              </motion.span>
            </div>
          </div>

          {/* Nama pasangan */}
          <motion.div
            className="couple-name"
            initial="hidden"
            whileInView="show"
            viewport={{
              once: false,
              amount: 0.5,
            }}
            variants={{
              hidden: {},

              show: {
                transition: {
                  staggerChildren: 0.18,
                  delayChildren: 1,
                },
              },
            }}
          >
            {/* CACA */}
            <motion.span
              className="name-bride"
              variants={{
                hidden: {
                  opacity: 0,
                  y: 30,
                  scale: 0.9,
                },

                show: {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: {
                    duration: 0.8,
                    ease: smoothEase,
                  },
                },
              }}
            >
              Caca
            </motion.span>

            {/* & */}
            <motion.span
              className="name-and"
              variants={{
                hidden: {
                  opacity: 0,
                  scale: 0.3,
                  rotate: -15,
                },

                show: {
                  opacity: 1,
                  scale: 1,
                  rotate: 0,
                  transition: {
                    duration: 0.7,
                    ease: smoothEase,
                  },
                },
              }}
            >
              &
            </motion.span>

            {/* FAIZAL */}
            <motion.span
              className="name-groom"
              variants={{
                hidden: {
                  opacity: 0,
                  y: 30,
                  scale: 0.9,
                },

                show: {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: {
                    duration: 0.8,
                    ease: smoothEase,
                  },
                },
              }}
            >
              Faizal
            </motion.span>
          </motion.div>
        </div>
      </motion.div>
    </motion.section>
  );
};

export default Cover;
