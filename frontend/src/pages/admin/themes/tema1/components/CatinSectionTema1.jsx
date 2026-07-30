import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";

import BrideBg from "../../../../../assets/images/tema1/section4/bingkai-foto.svg";
import BridePhoto from "../../../../../assets/images/tema1/section4/bride-profil.jpg";
import GroomPhoto from "../../../../../assets/images/tema1/section4/groom.png";
import Instagram from "../../../../../assets/icons/istagram.svg";

const CatinSection = () => {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const blurFade = {
    hidden: { opacity: 0, filter: "blur(10px)", y: 20 },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      transition: { duration: 0.9, ease: "easeOut" },
    },
  };

  const fadeScale = {
    hidden: { opacity: 0, scale: 0.85 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  const frameReveal = {
    hidden: { opacity: 0, rotate: -5, scale: 0.95 },
    visible: {
      opacity: 1,
      rotate: 0,
      scale: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const photoReveal = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8, ease: "easeOut", delay: 0.2 },
    },
  };

  // Tambahkan props: label, name, photo, parentLabel, fatherName, motherName, igUsername, igUrl
  const ProfileBlock = ({
    mtClass,
    label,
    name,
    photo,
    parentLabel,
    fatherName,
    motherName,
    igUsername,
    igUrl,
  }) => (
    <motion.div
      className={`bride-section-profile ${mtClass}`}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.3 }}
    >
      <motion.div variants={blurFade} className="the-bride text-center">
        {label}
      </motion.div>

      <motion.div
        variants={containerVariants}
        className="photo-frame-wrapper position-relative"
      >
        <motion.img
          src={BrideBg}
          className="bride-bg position-absolute"
          alt=""
          variants={frameReveal}
        />
        <motion.img
          src={photo}
          className="bride-photo position-absolute"
          alt=""
          variants={photoReveal}
        />
      </motion.div>

      <motion.div variants={fadeScale} className="nama-mempelai text-center">
        {name}
      </motion.div>

      <motion.div variants={fadeInUp} className="orang-tua text-center">
        <span className="text">{parentLabel}</span>
        <br />
        <span className="text">Bapak {fatherName}</span>
        <br />
        <span className="text">Ibu {motherName}</span>
      </motion.div>

      <motion.a
        variants={fadeInUp}
        href={igUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="ig-wrapper d-inline-flex align-items-center text-decoration-none"
      >
        <div className="ig-icon-wrapper">
          <img src={Instagram} alt="Instagram" className="ig-icon-img" />
        </div>
        <span className="ig-username">{igUsername}</span>
      </motion.a>
    </motion.div>
  );

  return (
    <div className="bride-section position-relative overflow-hidden">
      {/* Bride */}
      <ProfileBlock
        mtClass="mt-2"
        label="The Bride"
        name="Nurul Alvi Novalinda"
        photo={BridePhoto}
        parentLabel="Putri pertama dari"
        fatherName="Suwada"
        motherName="Nurhayati"
        igUsername="@nrlalvin_"
        igUrl="https://www.instagram.com/nrlalvin_"
      />

      {/* Groom */}
      <ProfileBlock
        mtClass="mt-4 mb-2"
        label="The Groom"
        name="Faizal Ahmad Siddiq"
        photo={GroomPhoto}
        parentLabel="Putra pertama dari"
        fatherName="Kardjamai"
        motherName="Gustia Supriyatin"
        igUsername="@faizal_a.s"
        igUrl="https://www.instagram.com/faizal_a.s"
      />
    </div>
  );
};

export default CatinSection;