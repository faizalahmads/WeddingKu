const QRIcon = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Body / frame */}
      <rect
        x="5"
        y="5"
        width="90"
        height="90"
        rx="8"
        fill="#EBCEBA"
        stroke="#590000"
        strokeWidth="3"
      />

      {/* Kotak pojok kiri atas */}
      <rect
        x="14"
        y="14"
        width="22"
        height="22"
        rx="3"
        fill="#F4EBD1"
        stroke="#590000"
        strokeWidth="3"
      />
      <rect x="20" y="20" width="10" height="10" fill="#590000" />

      {/* Kotak pojok kanan atas */}
      <rect
        x="64"
        y="14"
        width="22"
        height="22"
        rx="3"
        fill="#F4EBD1"
        stroke="#590000"
        strokeWidth="3"
      />
      <rect x="70" y="20" width="10" height="10" fill="#590000" />

      {/* Kotak pojok kiri bawah */}
      <rect
        x="14"
        y="64"
        width="22"
        height="22"
        rx="3"
        fill="#F4EBD1"
        stroke="#590000"
        strokeWidth="3"
      />
      <rect x="20" y="70" width="10" height="10" fill="#590000" />

      {/* Titik-titik pengisi tengah (pola QR) */}
      <rect x="44" y="14" width="6" height="6" fill="#590000" />
      <rect x="56" y="14" width="6" height="6" fill="#590000" />
      <rect x="44" y="26" width="6" height="6" fill="#590000" />
      <rect x="44" y="44" width="6" height="6" fill="#590000" />
      <rect x="56" y="44" width="6" height="6" fill="#590000" />
      <rect x="68" y="44" width="6" height="6" fill="#590000" />
      <rect x="80" y="44" width="6" height="6" fill="#590000" />
      <rect x="44" y="56" width="6" height="6" fill="#590000" />
      <rect x="64" y="56" width="6" height="6" fill="#590000" />
      <rect x="44" y="68" width="6" height="6" fill="#590000" />
      <rect x="56" y="68" width="6" height="6" fill="#590000" />
      <rect x="72" y="68" width="6" height="6" fill="#590000" />
      <rect x="44" y="80" width="6" height="6" fill="#590000" />
      <rect x="60" y="80" width="6" height="6" fill="#590000" />
      <rect x="76" y="80" width="6" height="6" fill="#590000" />

      {/* Lubang sekrup pojok, senada CassetteIcon */}
      <circle cx="12" cy="10" r="0" fill="none" />
    </svg>
  );
};

export default QRIcon;
