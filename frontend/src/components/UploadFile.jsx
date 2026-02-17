import React, { useRef } from "react";
import "../assets/css/UploadFile.css";
import uploadIcon from "../assets/icons/upload-file.svg";

const UploadFile = ({
  label,
  width = "100%",
  height = "80px",
  multiple = false,
  accept,
  onFileSelect,
}) => {
  const inputRef = React.useRef(null);

  const handleFiles = (files) => {
    const filtered = Array.from(files).filter(file =>
      ["image/jpeg", "image/png"].includes(file.type)
    );

    if (!filtered.length) {
      alert("Hanya file JPG, JPEG, atau PNG yang diperbolehkan");
      return;
    }

    onFileSelect(multiple ? filtered : filtered[0]);
  };

  return (
    <div
      style={{
        width,
        height,
        border: "2px dashed #ccc",
        borderRadius: 8,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
      }}
      onClick={() => inputRef.current.click()}
      onDragOver={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
      onDrop={(e) => {
        e.preventDefault();
        e.stopPropagation();
        handleFiles(e.dataTransfer.files);
      }}
    >
      <input
        ref={inputRef}
        type="file"
        hidden
        multiple={multiple}
        accept={accept}
        onChange={(e) => {
          handleFiles(e.target.files);
          e.target.value = null;
        }}
      />

      <span className="text-muted text-center">
        {label || "Drag & Drop file di sini atau klik"}
      </span>
    </div>
  );
};

export default UploadFile;
