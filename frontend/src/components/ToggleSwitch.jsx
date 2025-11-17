import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/css/ToggleSwitch.css";

const ToggleSwitch = ({
  label,
  optionLeft = "OFF",
  optionRight = "ON",
  defaultValue = false,
  onChange,
}) => {
  const [isRight, setIsRight] = useState(defaultValue);

  const handleToggle = () => {
    const newValue = !isRight;
    setIsRight(newValue);

    // 🔥 Kirim boolean ke parent, bukan string
    if (onChange) onChange(newValue);
  };

  return (
    <div className="d-flex align-items-center gap-3">
      {label && <label className="sub-judul fw-bold">{label}</label>}

      <div
        className={`toggle-switch ${isRight ? "right" : "left"}`}
        onClick={handleToggle}
      >
        <div className={`switch-option left ${!isRight ? "active" : ""}`}>
          {optionLeft}
        </div>
        <div className={`switch-option right ${isRight ? "active" : ""}`}>
          {optionRight}
        </div>

        <div className="switch-handle"></div>
      </div>
    </div>
  );
};

export default ToggleSwitch;