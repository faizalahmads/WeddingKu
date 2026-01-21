import React from "react";
import "../assets/css/StepProgress.css";

const StepProgress = ({ activeStep, completedStep }) => {
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
        const stepNumber = index + 1;

        const isCompleted = stepNumber <= completedStep;
        const isActive = stepNumber === activeStep;

        return (
          <div
            key={index}
            className={`step-item ${isCompleted ? "completed" : ""} ${
              isActive ? "active" : ""
            }`}
          >
            <div className="step-circle"></div>
            <div className="step-label">{step}</div>

            {index < steps.length - 1 && (
              <div
                className={`step-line ${isCompleted ? "filled" : ""}`}
              ></div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default StepProgress;
