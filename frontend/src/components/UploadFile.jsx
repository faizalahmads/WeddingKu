import React, { useRef } from "react";
import "../assets/css/UploadFile.css";
import uploadIcon from "../assets/icons/upload-file.svg";

const UploadBox = ({ 
    onFileSelect,
    label = "Silahkan Drag & Drop Lagu atau Browse File untuk di upload",
    width = "100%",
    height = "48px",
 }) => {
  const fileInputRef = useRef(null);

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    onFileSelect && onFileSelect(e.target.files[0]);
  };

  return (
    <>
      <div
        className="upload-simple d-flex align-items-center justify-content-center gap-2 px-3 py-2 mb-3"
        style={{ cursor: "pointer", width: width, height: height, }}
        onClick={handleClick}
      >
        <img src={uploadIcon} className="upload-icon" alt="upload icon" />
        <span className="upload-simple-text">
          {label}
        </span>
      </div>

      <input
        type="file"
        ref={fileInputRef}
        accept="audio/*"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
    </>
  );
};

export default UploadBox;
