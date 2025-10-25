import React from "react";

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  // Fungsi untuk menghasilkan daftar halaman
  const generatePages = () => {
    const pages = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push("...");

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) pages.push("...");
      pages.push(totalPages);
    }

    return pages;
  };

  const pages = generatePages();

  // Styling tombol
  const buttonStyle = (isActive) => ({
    width: 32,
    height: 32,
    padding: 10,
    background: isActive ? "#14AE5C" : "white",
    borderRadius: 32,
    border: "1px solid #F1F1F1",
    display: "inline-flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    color: isActive ? "white" : "#333333",
    fontSize: 13,
    fontFamily: "Open Sans",
    fontWeight: "600",
  });

  // Tombol navigasi (<< < > >>)
  const navButton = (label, disabled, onClick) => (
    <div
      onClick={!disabled ? onClick : undefined}
      style={{
        ...buttonStyle(false),
        opacity: disabled ? 0.5 : 1,
        pointerEvents: disabled ? "none" : "auto",
      }}
    >
      {label}
    </div>
  );

  // Hitung loncatan skip halaman
  const skip = Math.ceil(totalPages / 4);

  return (
    <div
      style={{
        alignSelf: "stretch",
        height: 44,
        justifyContent: "center",
        alignItems: "center",
        gap: 5,
        display: "flex",
      }}
    >
      {/* Tombol Skip Kiri (<<) */}
      {navButton("<<", currentPage === 1, () =>
        onPageChange(Math.max(1, currentPage - skip))
      )}

      {/* Tombol Prev (<) */}
      {navButton("<", currentPage === 1, () =>
        onPageChange(currentPage - 1)
      )}

      {/* Halaman */}
      {pages.map((p, i) =>
        p === "..." ? (
          <div
            key={i}
            style={{
              width: 32,
              height: 32,
              background: "white",
              borderRadius: 8,
              display: "inline-flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: 13,
              fontFamily: "Open Sans",
              fontWeight: "600",
              color: "#333",
            }}
          >
            ...
          </div>
        ) : (
          <div
            key={i}
            onClick={() => onPageChange(p)}
            style={buttonStyle(currentPage === p)}
          >
            {p}
          </div>
        )
      )}

      {/* Tombol Next (>) */}
      {navButton(">", currentPage === totalPages, () =>
        onPageChange(currentPage + 1)
      )}

      {/* Tombol Skip Kanan (>>) */}
      {navButton(">>", currentPage === totalPages, () =>
        onPageChange(Math.min(totalPages, currentPage + skip))
      )}
    </div>
  );
};

export default Pagination;
