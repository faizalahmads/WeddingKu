import React from "react";
import "../assets/css/StepProgress.css";

const StepProgress = ({ currentStep }) => {
  const steps = [
    "Informasi Mempelai",
    "Informasi Acara",
    "Informasi Tambahan",
    "Cerita Cinta",
    "Cover",
  ];

  return (
    <div className="step-container">
      {steps.map((step, index) => {
        const stepClass =
          index + 1 < currentStep
            ? "completed"
            : index + 1 === currentStep
            ? "active"
            : "";

        return (
          <div key={index} className={`step-item ${stepClass}`}>
            <div className="step-circle"></div>
            <div className="step-label">{step}</div>

            {index < steps.length - 1 && (
              <div
                className={`step-line ${
                  index + 1 < currentStep ? "filled" : ""
                }`}
              ></div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default StepProgress;
