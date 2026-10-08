import React, { useState } from 'react';
import PackagingPreview3D from './PackagingPreview3D';
import ConfiguratorPanel from './ConfiguratorPanel';
import StudioQuoteModal from './StudioQuoteModal';

export default function PackagingStudio() {
  const [currentStep, setCurrentStep] = useState(1);
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);

  // Centralized Packaging Configuration State
  const [config, setConfig] = useState({
    boxType: 'Custom Mailer Box',
    width: 12,
    height: 8,
    depth: 4,
    material: 'kraft',
    printing: 'full-colour',
    finish: 'matte',
    quantity: 500,
    artworkFile: null,
    artworkUrl: null
  });

  const handleChangeDimension = (dim, val) => {
    setConfig((prev) => ({ ...prev, [dim]: val }));
  };

  const handleSelectMaterial = (materialId) => {
    setConfig((prev) => ({ ...prev, material: materialId }));
  };

  const handleSelectPrinting = (printingId) => {
    setConfig((prev) => ({ ...prev, printing: printingId }));
  };

  const handleSelectFinish = (finishId) => {
    setConfig((prev) => ({ ...prev, finish: finishId }));
  };

  const handleUploadArtwork = (file, url) => {
    setConfig((prev) => ({
      ...prev,
      artworkFile: file,
      artworkUrl: url
    }));
  };

  const handleRemoveArtwork = () => {
    if (config.artworkUrl) {
      URL.revokeObjectURL(config.artworkUrl);
    }
    setConfig((prev) => ({
      ...prev,
      artworkFile: null,
      artworkUrl: null
    }));
  };

  const handleChangeQuantity = (qty) => {
    setConfig((prev) => ({ ...prev, quantity: qty }));
  };

  return (
    <section className="packaging-studio-section" id="packaging-studio">
      <div className="studio-container">
        {/* Section Header */}
        <div className="studio-section-header">
          <div className="studio-eyebrow-wrapper">
            <span className="studio-eyebrow-pill">PACKAGING STUDIO / 01</span>
            <span className="studio-eyebrow-rule" aria-hidden="true" />
          </div>

          <div className="studio-heading-grid">
            <h2 className="studio-main-heading">
              <span className="heading-line">BUILD YOUR</span>
              <span className="heading-line accent-color">CUSTOM BOX.</span>
            </h2>

            <p className="studio-supporting-copy">
              Choose your size, material, branding and quantity. Preview your packaging in
              3D before requesting a quote.
            </p>
          </div>
        </div>

        {/* Large Split-Screen Experience: 55% 3D Preview | 45% Configurator */}
        <div className="studio-split-layout">
          {/* Left Column: 3D Packaging Preview */}
          <div className="studio-left-col">
            <PackagingPreview3D
              width={config.width}
              height={config.height}
              depth={config.depth}
              material={config.material}
              printing={config.printing}
              finish={config.finish}
              artworkUrl={config.artworkUrl}
            />
          </div>

          {/* Right Column: Interactive Configuration Panel */}
          <div className="studio-right-col">
            <ConfiguratorPanel
              currentStep={currentStep}
              setCurrentStep={setCurrentStep}
              config={config}
              onChangeDimension={handleChangeDimension}
              onSelectMaterial={handleSelectMaterial}
              onSelectPrinting={handleSelectPrinting}
              onSelectFinish={handleSelectFinish}
              onUploadArtwork={handleUploadArtwork}
              onRemoveArtwork={handleRemoveArtwork}
              onChangeQuantity={handleChangeQuantity}
              onOpenQuoteModal={() => setQuoteModalOpen(true)}
            />
          </div>
        </div>
      </div>

      {/* Quote Request Modal */}
      <StudioQuoteModal
        isOpen={quoteModalOpen}
        onClose={() => setQuoteModalOpen(false)}
        config={config}
      />
    </section>
  );
}
