import React from 'react';

const STEPS = [
  { id: 1, number: '01', title: 'Dimensions' },
  { id: 2, number: '02', title: 'Material' },
  { id: 3, number: '03', title: 'Branding' },
  { id: 4, number: '04', title: 'Quantity' }
];

export default function StepNavigation({ currentStep, onSelectStep }) {
  return (
    <nav className="studio-step-nav" aria-label="Packaging configuration steps">
      <div className="step-nav-track">
        {STEPS.map((step) => {
          const isActive = currentStep === step.id;
          const isCompleted = currentStep > step.id;

          return (
            <button
              key={step.id}
              type="button"
              className={`step-tab-btn ${isActive ? 'is-active' : ''} ${
                isCompleted ? 'is-completed' : ''
              }`}
              onClick={() => onSelectStep(step.id)}
              aria-current={isActive ? 'step' : undefined}
            >
              <span className="step-num">{step.number}</span>
              <span className="step-label">{step.title}</span>
              {isActive && <span className="step-indicator-bar" aria-hidden="true" />}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
