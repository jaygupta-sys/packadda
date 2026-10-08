import React, { useRef } from 'react';
import { Upload, FileText, Check, X, Image as ImageIcon } from 'lucide-react';

const PRINTING_OPTIONS = [
  { id: 'no-branding', label: 'No Branding', desc: 'Raw unprinted natural surface' },
  { id: '1-colour', label: '1 Colour Print', desc: 'Single tone screen or flexo ink' },
  { id: 'full-colour', label: 'Full Colour Print', desc: 'CMYK high-definition offset print' },
  { id: 'inside-outside', label: 'Inside + Outside Print', desc: 'Complete bespoke dual unboxing' }
];

const FINISH_OPTIONS = [
  { id: 'matte', label: 'Matte', desc: 'Non-glare tactile elegance' },
  { id: 'gloss', label: 'Gloss', desc: 'Vibrant specular sheen' },
  { id: 'soft-touch', label: 'Soft Touch', desc: 'Velvet-like peach skin feel' },
  { id: 'foil', label: 'Foil', desc: 'Metallic hot stamp accents' },
  { id: 'emboss', label: 'Emboss', desc: 'Tactile 3D raised relief' }
];

export default function BrandingStep({
  printing,
  finish,
  artworkFile,
  artworkUrl,
  onSelectPrinting,
  onSelectFinish,
  onUploadArtwork,
  onRemoveArtwork
}) {
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Support PNG, JPG, JPEG, PDF
    const validTypes = ['image/png', 'image/jpeg', 'image/jpg', 'application/pdf'];
    if (!validTypes.includes(file.type)) {
      alert('Please upload a valid PNG, JPG, or PDF file.');
      return;
    }

    let previewUrl = null;
    if (file.type.startsWith('image/')) {
      previewUrl = URL.createObjectURL(file);
    }
    onUploadArtwork(file, previewUrl);
  };

  return (
    <div className="config-step-panel branding-panel">
      <div className="step-header">
        <h3 className="step-title">MAKE IT YOURS.</h3>
        <p className="step-desc">
          Configure bespoke print coverage, luxury surface lamination, and upload your vector/raster logo artwork.
        </p>
      </div>

      {/* 1. Printing Coverage Options */}
      <div className="sub-step-block">
        <h4 className="sub-step-title">Print Specification</h4>
        <div className="printing-chips-grid" role="radiogroup" aria-label="Select print coverage">
          {PRINTING_OPTIONS.map((opt) => {
            const isSelected = printing === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                className={`print-card ${isSelected ? 'is-selected' : ''}`}
                onClick={() => onSelectPrinting(opt.id)}
                role="radio"
                aria-checked={isSelected}
              >
                <div className="print-card-content">
                  <span className="print-card-name">{opt.label}</span>
                  <span className="print-card-desc">{opt.desc}</span>
                </div>
                <div className="print-check-circle" aria-hidden="true">
                  {isSelected && <Check size={11} color="#FFFFFF" strokeWidth={3} />}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Premium Finishes */}
      <div className="sub-step-block">
        <h4 className="sub-step-title">Surface Finish</h4>
        <div className="finish-chips-row" role="radiogroup" aria-label="Select surface finish">
          {FINISH_OPTIONS.map((f) => {
            const isSelected = finish === f.id;
            return (
              <button
                key={f.id}
                type="button"
                className={`finish-pill-btn ${isSelected ? 'is-selected' : ''}`}
                onClick={() => onSelectFinish(f.id)}
                role="radio"
                aria-checked={isSelected}
                title={f.desc}
              >
                <span>{f.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Artwork Upload Section */}
      <div className="sub-step-block">
        <div className="upload-header-row">
          <h4 className="sub-step-title">Upload Your Design</h4>
          <span className="upload-type-badge">PNG, JPG, PDF</span>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept=".png,.jpg,.jpeg,.pdf"
          className="hidden-file-input"
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />

        {!artworkFile ? (
          <div
            className="artwork-upload-dropzone"
            onClick={() => fileInputRef.current?.click()}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                fileInputRef.current?.click();
              }
            }}
            aria-label="Upload packaging design file"
          >
            <div className="upload-icon-bubble">
              <Upload size={18} color="#D5683F" strokeWidth={2.2} />
            </div>
            <div className="upload-text-stack">
              <span className="upload-action-text">Click to upload your logo or dieline artwork</span>
              <span className="upload-subtext">PNG, JPG will be rendered live onto the 3D box model</span>
            </div>
          </div>
        ) : (
          <div className="artwork-preview-card">
            <div className="artwork-meta-left">
              {artworkUrl ? (
                <img src={artworkUrl} alt="Uploaded logo preview" className="artwork-thumb-img" />
              ) : (
                <div className="artwork-pdf-icon">
                  <FileText size={20} color="#D5683F" />
                </div>
              )}
              <div className="artwork-file-info">
                <span className="artwork-file-name">{artworkFile.name}</span>
                <span className="artwork-file-size">
                  {(artworkFile.size / 1024).toFixed(1)} KB • Applied to 3D Lid
                </span>
              </div>
            </div>

            <button
              type="button"
              className="remove-artwork-btn"
              onClick={onRemoveArtwork}
              title="Remove uploaded artwork"
              aria-label="Remove uploaded artwork"
            >
              <X size={15} />
            </button>
          </div>
        )}

        <p className="upload-helper-note">
          “Final artwork placement is confirmed with your quote.”
        </p>
      </div>
    </div>
  );
}
