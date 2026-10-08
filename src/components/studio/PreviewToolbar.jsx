import React from 'react';
import { RotateCcw, Maximize2, ZoomIn, ZoomOut, Camera } from 'lucide-react';

export default function PreviewToolbar({
  zoomLevel = 100,
  onReset,
  onFit,
  onZoomIn,
  onZoomOut,
  onScreenshot
}) {
  return (
    <div className="preview-toolbar-container" role="toolbar" aria-label="3D Packaging Controls">
      <div className="preview-toolbar-group">
        <button
          type="button"
          className="toolbar-btn"
          onClick={onReset}
          title="Reset 3D View"
          aria-label="Reset 3D view"
        >
          <RotateCcw size={14} />
          <span className="toolbar-btn-text">Reset</span>
        </button>

        <button
          type="button"
          className="toolbar-btn"
          onClick={onFit}
          title="Fit to Center"
          aria-label="Fit box to center view"
        >
          <Maximize2 size={14} />
          <span className="toolbar-btn-text">Center</span>
        </button>

        <span className="toolbar-divider" aria-hidden="true" />

        <button
          type="button"
          className="toolbar-btn icon-only"
          onClick={onZoomOut}
          title="Zoom Out"
          aria-label="Zoom out"
        >
          <ZoomOut size={14} />
        </button>

        <span className="toolbar-zoom-display" aria-live="polite">
          {Math.round(zoomLevel)}%
        </span>

        <button
          type="button"
          className="toolbar-btn icon-only"
          onClick={onZoomIn}
          title="Zoom In"
          aria-label="Zoom in"
        >
          <ZoomIn size={14} />
        </button>

        <span className="toolbar-divider" aria-hidden="true" />

        <button
          type="button"
          className="toolbar-btn"
          onClick={onScreenshot}
          title="Capture High-Res Image"
          aria-label="Take screenshot of 3D box"
        >
          <Camera size={14} />
          <span className="toolbar-btn-text">Capture</span>
        </button>
      </div>
    </div>
  );
}
