import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/css/ToggleSwitch.css";

const ToggleSwitch = ({
  label,
  labelClass = "judul",
  optionLeft = "OFF",
  optionRight = "ON",
  defaultValue = false,
  onChange,

  switchWidth = 80,
  handleWidth = 36,
}) => {
  const [isRight, setIsRight] = useState(defaultValue);

  const handleToggle = () => {
    const newValue = !isRight;
    setIsRight(newValue);

    if (onChange) onChange(newValue);
  };

  const handleLeftPos = 2;
  const handleRightPos = switchWidth - handleWidth - 2;

  return (
    <div className="d-flex align-items-center gap-3">
      {label && (
        <label className={`${labelClass} fw-bold`}>
          {label}
        </label>
      )}

      <div
        className={`toggle-switch ${isRight ? "right" : "left"}`}
        onClick={handleToggle}
        style={{ width: switchWidth }}
      >
        <div className={`switch-option left ${!isRight ? "active" : ""}`}>
          {optionLeft}
        </div>

        <div className={`switch-option right ${isRight ? "active" : ""}`}>
          {optionRight}
        </div>

        <div
          className="switch-handle"
          style={{
            width: handleWidth,
            left: isRight ? handleRightPos : handleLeftPos,
          }}
        ></div>
      </div>
    </div>
  );
};

export default ToggleSwitch;