import React from "react";

const ThemeCard = ({ theme, onSelect }) => {
  return (
    <div className="card shadow-sm text-center" style={{ width: "18rem" }}>
      <img
        src={theme.thumbnail_url}
        className="card-img-top"
        alt={theme.name}
        style={{ height: "200px", objectFit: "cover" }}
      />
      <div className="card-body">
        <h5 className="card-title">{theme.name}</h5>
        <p className="card-text text-muted">{theme.description}</p>
        <div className="d-flex justify-content-around">
          <a
            href={theme.preview_url}
            target="_blank"
            rel="noreferrer"
            className="btn btn-outline-primary btn-sm"
          >
            Lihat Demo
          </a>
          <button
            className="btn btn-primary btn-sm"
            onClick={() => onSelect(theme.id)}
          >
            Pilih Tema
          </button>
        </div>
      </div>
    </div>
  );
};

export default ThemeCard;
