import React from "react";
import { IoLocationOutline, IoCalendarOutline } from "react-icons/io5";
import { QRCode } from "react-qrcode-logo";

import Logo from "../../../assets/icons/Logo.svg";

const GuestQRCard = React.forwardRef(
  ({ guestName, guestRole, qrValue }, ref) => {
    return (
      <div
        ref={ref}
        style={{
          width: "420px",
          background: "#ffffff",
          padding: "35px 30px",
          boxSizing: "border-box",
          fontFamily: "Arial, sans-serif",
          textAlign: "center",
        }}
      >
        {/* TITLE */}
        <div
          style={{
            fontSize: "13px",
            fontWeight: "700",
            letterSpacing: "3px",
            marginBottom: "18px",
          }}
        >
          GUEST ENTRY PASS
        </div>

        {/* NAMA TAMU */}
        <div
          style={{
            fontSize: "30px",
            fontWeight: "600",
            marginBottom: "6px",
            wordBreak: "break-word",
          }}
        >
          {guestName || "Tamu Undangan"}
        </div>

        {/* ROLE */}
        {guestRole && (
          <div
            style={{
              fontSize: "13px",
              color: "#777",
              marginBottom: "22px",
            }}
          >
            {guestRole}
          </div>
        )}

        {/* QR CODE */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            margin: "10px 0 20px",
          }}
        >
          <QRCode
            value={qrValue || ""}
            size={200}
            logoImage={Logo}
            logoWidth={60}
            logoHeight={15}
            logoOpacity={1}
            removeQrCodeBehindLogo={true}
            qrStyle="dots"
            eyeRadius={8}
          />
        </div>

        {/* CAPTION */}
        <div
          style={{
            fontSize: "12px",
            color: "#555",
            marginBottom: "28px",
          }}
        >
          Mohon Tampilkan QR Code Kepada Petugas
        </div>

        {/* INFO */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "25px",
            borderTop: "1px solid #e5e5e5",
            paddingTop: "22px",
          }}
        >
          {/* VENUE */}
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "5px",
            }}
          >
            <IoLocationOutline
              style={{
                fontSize: "22px",
              }}
            />

            <span
              style={{
                fontSize: "11px",
                color: "#777",
              }}
            >
              Venue
            </span>

            <strong
              style={{
                fontSize: "13px",
              }}
            >
              GOR Sunter
            </strong>
          </div>

          {/* DIVIDER */}
          <div
            style={{
              width: "1px",
              height: "55px",
              background: "#ddd",
            }}
          />

          {/* DATE */}
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "5px",
            }}
          >
            <IoCalendarOutline
              style={{
                fontSize: "22px",
              }}
            />

            <span
              style={{
                fontSize: "11px",
                color: "#777",
              }}
            >
              Date
            </span>

            <strong
              style={{
                fontSize: "13px",
              }}
            >
              26 • 09 • 2026
            </strong>
          </div>
        </div>
      </div>
    );
  }
);

GuestQRCard.displayName = "GuestQRCard";

export default GuestQRCard;