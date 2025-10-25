import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";

const themes = [
  {
    id: 1,
    name: "Pisang",
    preview_image: "/images/pisang.png",
    description: "Tema elegan dengan nuansa bunga dan warna lembut.",
  },
  {
    id: 2,
    name: "Simple",
    preview_image: "/images/simple.png",
    description: "Tema minimalis dengan desain modern dan simpel.",
  },
];

const PreviewInvitation = () => {
  const { themeId } = useParams();
  const navigate = useNavigate();

  const theme = themes.find((t) => t.id === parseInt(themeId));

  if (!theme) return <p>Tema tidak ditemukan</p>;

  return (
    <div className="vh-100 vw-100 d-flex flex-column">
      <Navbar />
      <div
        className="flex-grow-1 d-flex justify-content-center align-items-center"
        style={{
          backgroundImage: `url(${theme.preview_image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: "100%",
        }}
      >
        <div
          className="text-center text-white p-4"
          style={{ backgroundColor: "rgba(0,0,0,0.5)", borderRadius: "12px" }}
        >
          <h1>{theme.name}</h1>
          <p>{theme.description}</p>
          <button
            className="btn btn-secondary me-2"
            onClick={() => navigate(-1)}
          >
            Kembali
          </button>
          <button
            className="btn btn-success"
            onClick={() => {
              localStorage.setItem("selectedTheme", theme.id);
              navigate("/admin/manage-invite");
            }}
          >
            Pilih Tema Ini
          </button>
        </div>
      </div>
    </div>
  );
};

export default PreviewInvitation;
