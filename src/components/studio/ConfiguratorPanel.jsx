import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
import StepNavigation from './StepNavigation';
import DimensionsStep from './DimensionsStep';
import MaterialStep from './MaterialStep';
import BrandingStep from './BrandingStep';
import QuantityStep from './QuantityStep';
import ConfigurationSummary from './ConfigurationSummary';

export default function ConfiguratorPanel({
  currentStep,
  setCurrentStep,
  config,
  onChangeDimension,
  onSelectMaterial,
  onSelectPrinting,
  onSelectFinish,
  onUploadArtwork,
  onRemoveArtwork,
  onChangeQuantity,
  onOpenQuoteModal
}) {
  const handleNext = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const handlePrev = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  return (
    <div className="studio-configurator-panel">
      {/* Top Header */}
      <div className="configurator-top-header">
        <span className="configurator-studio-tag">INTERACTIVE STUDIO</span>
        <h2 className="configurator-main-title">BUILD YOUR BOX</h2>
      </div>

      {/* 4-Step Navigation */}
      <StepNavigation currentStep={currentStep} onSelectStep={setCurrentStep} />

      {/* Active Step Body */}
      <div className="configurator-step-body">
        <AnimatePresence mode="wait">
          {currentStep === 1 && (
            <motion.div
              key="step-1"
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            >
              <DimensionsStep
                width={config.width}
                height={config.height}
                depth={config.depth}
                onChangeDimension={onChangeDimension}
              />
            </motion.div>
          )}

          {currentStep === 2 && (
            <motion.div
              key="step-2"
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            >
              <MaterialStep
                selectedMaterial={config.material}
                onSelectMaterial={onSelectMaterial}
              />
            </motion.div>
          )}

          {currentStep === 3 && (
            <motion.div
              key="step-3"
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            >
              <BrandingStep
                printing={config.printing}
                finish={config.finish}
                artworkFile={config.artworkFile}
                artworkUrl={config.artworkUrl}
                onSelectPrinting={onSelectPrinting}
                onSelectFinish={onSelectFinish}
                onUploadArtwork={onUploadArtwork}
                onRemoveArtwork={onRemoveArtwork}
              />
            </motion.div>
          )}

          {currentStep === 4 && (
            <motion.div
              key="step-4"
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            >
              <QuantityStep
                quantity={config.quantity}
                onChangeQuantity={onChangeQuantity}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Step Guided Pagination Navigation */}
      <div className="config-step-stepper-row">
        <button
          type="button"
          className="step-nav-arrow-btn"
          onClick={handlePrev}
          disabled={currentStep === 1}
          aria-label="Previous step"
        >
          <ChevronLeft size={16} />
          <span>Previous</span>
        </button>

        <span className="step-counter-label">{`Step ${currentStep} of 4`}</span>

        <button
          type="button"
          className="step-nav-arrow-btn"
          onClick={handleNext}
          disabled={currentStep === 4}
          aria-label="Next step"
        >
          <span>Next</span>
          <ChevronRight size={16} />
        </button>
      </div>

      {/* Live Configuration Summary */}
      <ConfigurationSummary
        width={config.width}
        height={config.height}
        depth={config.depth}
        material={config.material}
        printing={config.printing}
        finish={config.finish}
        quantity={config.quantity}
      />

      {/* Main Quote Call to Action */}
      <div className="configurator-cta-footer">
        <button
          type="button"
          className="btn-studio-get-quote"
          onClick={onOpenQuoteModal}
        >
          <span>GET A QUOTE FOR THIS BOX</span>
          <ArrowUpRight size={16} className="quote-cta-arrow" />
        </button>
      </div>
    </div>
  );
}
