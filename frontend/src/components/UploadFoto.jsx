import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/css/UploadFoto.css";

const UploadFoto = ({ name, label = "Upload Foto", width = 130, height = 130, onChange, defaultImage }) => {
  const [preview, setPreview] = useState(null);

  // Load gambar database hanya SEKALI
  useEffect(() => {
    if (defaultImage) {
      setPreview(defaultImage);
    }
  }, []); // hanya saat pertama render

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file)); // preview langsung muncul
      if (onChange) onChange(file);
    }
  };

  const handleRemove = (e) => {
    e.stopPropagation();
    setPreview(null);
    if (onChange) onChange(null);
    document.getElementById(name).value = "";
  };

  return (
    <div className="d-flex flex-column align-items-start gap-2 upload-foto-wrapper">
      <label className="sub-judul fw-bold">{label}</label>

      <label
        htmlFor={name}
        className="upload-box d-flex justify-content-center align-items-center position-relative"
        style={{ width: width, height: height }}
      >
        {preview ? (
          <>
            <img src={preview} alt="Preview" className="upload-preview" />
            <button
              type="button"
              className="btn-close btn-close-custom"
              aria-label="Hapus"
              onClick={handleRemove}
            ></button>
          </>
        ) : (
          <div className="upload-plus">+</div>
        )}
      </label>

      <input
        id={name}
        name={name}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        hidden
      />
    </div>
  );
};

export default UploadFoto;
