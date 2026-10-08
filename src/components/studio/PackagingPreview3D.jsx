import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import PreviewToolbar from './PreviewToolbar';

// Generate procedural paper fiber texture for tactile realism
function createPaperTexture(type = 'kraft') {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  if (type === 'kraft') {
    ctx.fillStyle = '#C8A67B';
    ctx.fillRect(0, 0, 512, 512);

    // Subtle paper fibers
    const imgData = ctx.getImageData(0, 0, 512, 512);
    const data = imgData.data;
    for (let i = 0; i < data.length; i += 4) {
      const noise = (Math.random() - 0.5) * 18;
      data[i] = Math.min(255, Math.max(0, data[i] + noise));
      data[i + 1] = Math.min(255, Math.max(0, data[i + 1] + noise * 0.9));
      data[i + 2] = Math.min(255, Math.max(0, data[i + 2] + noise * 0.7));
    }
    ctx.putImageData(imgData, 0, 0);

    // Subtle organic flecks
    ctx.fillStyle = 'rgba(73, 41, 29, 0.08)';
    for (let j = 0; j < 300; j++) {
      const x = Math.random() * 512;
      const y = Math.random() * 512;
      const r = Math.random() * 1.5;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    }
  } else if (type === 'corrugated') {
    ctx.fillStyle = '#BA9465';
    ctx.fillRect(0, 0, 512, 512);

    // Subtle horizontal flute lines
    ctx.strokeStyle = 'rgba(73, 41, 29, 0.06)';
    ctx.lineWidth = 3;
    for (let y = 0; y < 512; y += 8) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(512, y);
      ctx.stroke();
    }
  } else {
    // Smooth premium paperboard
    ctx.fillStyle = type === 'rigid' ? '#382015' : '#FAF6EE';
    ctx.fillRect(0, 0, 512, 512);

    const imgData = ctx.getImageData(0, 0, 512, 512);
    const data = imgData.data;
    for (let i = 0; i < data.length; i += 4) {
      const noise = (Math.random() - 0.5) * 6;
      data[i] = Math.min(255, Math.max(0, data[i] + noise));
      data[i + 1] = Math.min(255, Math.max(0, data[i + 1] + noise));
      data[i + 2] = Math.min(255, Math.max(0, data[i + 2] + noise));
    }
    ctx.putImageData(imgData, 0, 0);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(2, 2);
  return texture;
}

// Generate default clean Pack Adda branding badge on lid if printing is selected
function createBrandedLidTexture(baseTextureType, printingType, customArtworkUrl) {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');

  // Fill base color matching material
  if (baseTextureType === 'kraft') {
    ctx.fillStyle = '#C8A67B';
  } else if (baseTextureType === 'corrugated') {
    ctx.fillStyle = '#BA9465';
  } else if (baseTextureType === 'rigid') {
    ctx.fillStyle = '#382015';
  } else {
    ctx.fillStyle = '#FAF6EE';
  }
  ctx.fillRect(0, 0, 1024, 1024);

  // Subtle grain
  const imgData = ctx.getImageData(0, 0, 1024, 1024);
  const data = imgData.data;
  for (let i = 0; i < data.length; i += 4) {
    const noise = (Math.random() - 0.5) * 12;
    data[i] = Math.min(255, Math.max(0, data[i] + noise));
    data[i + 1] = Math.min(255, Math.max(0, data[i + 1] + noise * 0.9));
    data[i + 2] = Math.min(255, Math.max(0, data[i + 2] + noise * 0.8));
  }
  ctx.putImageData(imgData, 0, 0);

  // If custom uploaded artwork exists, draw it
  if (customArtworkUrl) {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = customArtworkUrl;
    img.onload = () => {
      const maxDim = 600;
      let w = img.width;
      let h = img.height;
      if (w > maxDim || h > maxDim) {
        const ratio = Math.min(maxDim / w, maxDim / h);
        w *= ratio;
        h *= ratio;
      }
      ctx.drawImage(img, (1024 - w) / 2, (1024 - h) / 2, w, h);
      texture.needsUpdate = true;
    };
  } else if (printingType !== 'no-branding') {
    // Draw default sleek Pack Adda brand insignia
    const isDarkBase = baseTextureType === 'rigid';
    const textColor = isDarkBase ? '#FFFFFF' : '#49291D';
    const accentColor = '#D5683F';

    ctx.save();
    ctx.translate(512, 512);

    // Sleek geometric insignia frame
    ctx.strokeStyle = printingType === '1-colour' ? textColor : accentColor;
    ctx.lineWidth = 4;
    ctx.strokeRect(-180, -90, 360, 180);

    // Inner fine border
    ctx.strokeStyle = textColor;
    ctx.lineWidth = 1.5;
    ctx.strokeRect(-170, -80, 340, 160);

    // Typography
    ctx.fillStyle = textColor;
    ctx.font = 'bold 44px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.letterSpacing = '6px';
    ctx.fillText('PACK ADDA', 0, -15);

    ctx.fillStyle = printingType === '1-colour' ? textColor : accentColor;
    ctx.font = '600 16px sans-serif';
    ctx.letterSpacing = '4px';
    ctx.fillText('BESPOKE PACKAGING', 0, 32);

    ctx.restore();
  }

  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}

export default function PackagingPreview3D({
  width = 12,
  height = 8,
  depth = 4,
  material = 'kraft',
  printing = 'no-branding',
  finish = 'matte',
  artworkUrl = null
}) {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const boxGroupRef = useRef(null);
  const animationFrameRef = useRef(null);

  // Interaction State
  const [isDragging, setIsDragging] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(100);
  const previousPointerPos = useRef({ x: 0, y: 0 });
  const sphericalRef = useRef({
    radius: 7.5,
    theta: Math.PI / 4, // 45 deg horizontal
    phi: Math.PI / 3.4 // elevation
  });
  const targetSpherical = useRef({ ...sphericalRef.current });

  // Initialize Scene
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(0xfaf7f2);

    // Camera
    const camera = new THREE.PerspectiveCamera(
      38,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: 'high-performance',
      preserveDrawingBuffer: true
    });
    rendererRef.current = renderer;
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    container.appendChild(renderer.domElement);

    // Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xfff9f2, 0.85);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xfff7ed, 1.45);
    mainLight.position.set(6, 10, 7);
    mainLight.castShadow = true;
    mainLight.shadow.mapSize.width = 1024;
    mainLight.shadow.mapSize.height = 1024;
    mainLight.shadow.camera.near = 0.5;
    mainLight.shadow.camera.far = 25;
    mainLight.shadow.bias = -0.0005;
    scene.add(mainLight);

    const fillLight = new THREE.DirectionalLight(0xfcf3ea, 0.65);
    fillLight.position.set(-6, 4, -4);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xffffff, 0.45);
    rimLight.position.set(0, -5, -6);
    scene.add(rimLight);

    // Soft Studio Ground Shadow Receiver
    const floorGeo = new THREE.PlaneGeometry(30, 30);
    const floorMat = new THREE.ShadowMaterial({ opacity: 0.14 });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -1.5;
    floor.receiveShadow = true;
    scene.add(floor);

    // Master Group for Box Mesh
    const boxGroup = new THREE.Group();
    boxGroupRef.current = boxGroup;
    scene.add(boxGroup);

    // Render loop with smooth spherical interpolation
    const render = () => {
      animationFrameRef.current = requestAnimationFrame(render);

      // Smooth camera orbit damping
      sphericalRef.current.theta +=
        (targetSpherical.current.theta - sphericalRef.current.theta) * 0.12;
      sphericalRef.current.phi +=
        (targetSpherical.current.phi - sphericalRef.current.phi) * 0.12;
      sphericalRef.current.radius +=
        (targetSpherical.current.radius - sphericalRef.current.radius) * 0.12;

      // Keep phi within valid angles to avoid flipping
      sphericalRef.current.phi = Math.max(
        0.1,
        Math.min(Math.PI / 2 - 0.05, sphericalRef.current.phi)
      );

      const radius = sphericalRef.current.radius;
      const phi = sphericalRef.current.phi;
      const theta = sphericalRef.current.theta;

      camera.position.x = radius * Math.sin(phi) * Math.sin(theta);
      camera.position.y = radius * Math.cos(phi);
      camera.position.z = radius * Math.sin(phi) * Math.cos(theta);
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };
    render();

    // Resize handler
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  // Construct / Update 3D Custom Mailer Box based on configuration
  useEffect(() => {
    if (!boxGroupRef.current) return;
    const group = boxGroupRef.current;

    // Clear previous children
    while (group.children.length > 0) {
      const obj = group.children[0];
      if (obj.geometry) obj.geometry.dispose();
      if (obj.material) {
        if (Array.isArray(obj.material)) obj.material.forEach((m) => m.dispose());
        else obj.material.dispose();
      }
      group.remove(obj);
    }

    // Normalized dimensions (12x8x4 maps to approx 3.2 x 2.1 x 1.1 units)
    const scaleFactor = 0.26;
    const boxW = Math.max(1.2, width * scaleFactor);
    const boxD = Math.max(1.0, height * scaleFactor); // packaging length/depth
    const boxH = Math.max(0.6, depth * scaleFactor); // packaging wall height

    // Center box on top of ground plane
    group.position.y = boxH / 2 - 1.5;

    // Determine material parameters
    let baseColor = 0xc8a67b;
    let roughness = 0.85;
    let metalness = 0.02;
    let clearcoat = 0.0;

    if (material === '300-gsm') {
      baseColor = 0xf7f4ef;
      roughness = 0.44;
    } else if (material === '350-gsm') {
      baseColor = 0xefe8de;
      roughness = 0.38;
    } else if (material === 'corrugated') {
      baseColor = 0xba9465;
      roughness = 0.92;
    } else if (material === 'rigid') {
      baseColor = 0x382015;
      roughness = 0.32;
      metalness = 0.06;
    }

    // Finish adjustments
    if (finish === 'gloss') {
      roughness = 0.18;
      clearcoat = 0.85;
    } else if (finish === 'soft-touch') {
      roughness = 0.52;
    } else if (finish === 'foil') {
      metalness = 0.25;
    }

    // Textures
    const textureType =
      material === 'kraft'
        ? 'kraft'
        : material === 'corrugated'
        ? 'corrugated'
        : material === 'rigid'
        ? 'rigid'
        : 'paperboard';

    const bodyTexture = createPaperTexture(textureType);
    const lidTexture = createBrandedLidTexture(textureType, printing, artworkUrl);

    // Standard materials
    const bodyMat = new THREE.MeshPhysicalMaterial({
      color: baseColor,
      map: bodyTexture,
      roughness,
      metalness,
      clearcoat
    });

    const lidMat = new THREE.MeshPhysicalMaterial({
      color: baseColor,
      map: lidTexture,
      roughness,
      metalness,
      clearcoat
    });

    const innerMat = new THREE.MeshStandardMaterial({
      color: material === 'rigid' ? 0x24140d : 0xb59167,
      roughness: 0.9
    });

    // 1. Main Outer Box Tray (Bottom + 4 Walls with realistic bevel)
    // Multi-material box: [Right, Left, Top (Lid), Bottom, Front, Back]
    const materials = [bodyMat, bodyMat, lidMat, bodyMat, bodyMat, bodyMat];

    const mainBoxGeo = new THREE.BoxGeometry(boxW, boxH, boxD);
    const mainBox = new THREE.Mesh(mainBoxGeo, materials);
    mainBox.castShadow = true;
    mainBox.receiveShadow = true;
    group.add(mainBox);

    // 2. Realistic Mailer Box Fold Details:
    // A subtle folding lid lip/crease on the front
    const lipGeo = new THREE.BoxGeometry(boxW * 0.99, boxH * 0.28, 0.04);
    const lipMesh = new THREE.Mesh(lipGeo, bodyMat);
    lipMesh.position.set(0, boxH * 0.34, boxD / 2 + 0.02);
    lipMesh.castShadow = true;
    group.add(lipMesh);

    // Subtle side tuck-in wings
    const wingGeo = new THREE.BoxGeometry(0.04, boxH * 0.85, boxD * 0.7);
    const leftWing = new THREE.Mesh(wingGeo, innerMat);
    leftWing.position.set(-boxW / 2 - 0.015, 0, 0);
    group.add(leftWing);

    const rightWing = new THREE.Mesh(wingGeo, innerMat);
    rightWing.position.set(boxW / 2 + 0.015, 0, 0);
    group.add(rightWing);

    // 3. Subtle Lid Seam Line at back
    const seamGeo = new THREE.BoxGeometry(boxW * 1.002, 0.02, 0.03);
    const seamMat = new THREE.MeshBasicMaterial({ color: 0x49291d, transparent: true, opacity: 0.25 });
    const seamMesh = new THREE.Mesh(seamGeo, seamMat);
    seamMesh.position.set(0, boxH / 2 + 0.005, -boxD / 2);
    group.add(seamMesh);
  }, [width, height, depth, material, printing, finish, artworkUrl]);

  // Pointer / Touch Drag Orbit Handlers
  const handlePointerDown = (e) => {
    setIsDragging(true);
    previousPointerPos.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerMove = (e) => {
    if (!isDragging) return;
    const deltaX = e.clientX - previousPointerPos.current.x;
    const deltaY = e.clientY - previousPointerPos.current.y;

    previousPointerPos.current = { x: e.clientX, y: e.clientY };

    // Update spherical angles
    targetSpherical.current.theta -= deltaX * 0.009;
    targetSpherical.current.phi -= deltaY * 0.007;

    // Clamp phi to prevent below-ground look
    targetSpherical.current.phi = Math.max(
      0.15,
      Math.min(Math.PI / 2 - 0.06, targetSpherical.current.phi)
    );
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  // Wheel Zoom Handler
  const handleWheel = (e) => {
    e.preventDefault();
    const zoomDelta = e.deltaY * 0.003;
    const newRadius = Math.max(4.5, Math.min(12, targetSpherical.current.radius + zoomDelta));
    targetSpherical.current.radius = newRadius;

    // Compute percentage (base radius 7.5 = 100%)
    const pct = Math.round((7.5 / newRadius) * 100);
    setZoomLevel(pct);
  };

  // Touch Handlers for Mobile (Pinch zoom + 1-finger rotate)
  const touchStartDist = useRef(0);
  const handleTouchStart = (e) => {
    if (e.touches.length === 1) {
      setIsDragging(true);
      previousPointerPos.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    } else if (e.touches.length === 2) {
      setIsDragging(false);
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      touchStartDist.current = Math.hypot(dx, dy);
    }
  };

  const handleTouchMove = (e) => {
    if (e.touches.length === 1 && isDragging) {
      const deltaX = e.touches[0].clientX - previousPointerPos.current.x;
      const deltaY = e.touches[0].clientY - previousPointerPos.current.y;
      previousPointerPos.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };

      targetSpherical.current.theta -= deltaX * 0.01;
      targetSpherical.current.phi -= deltaY * 0.008;
      targetSpherical.current.phi = Math.max(
        0.15,
        Math.min(Math.PI / 2 - 0.06, targetSpherical.current.phi)
      );
    } else if (e.touches.length === 2) {
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      const dist = Math.hypot(dx, dy);
      const delta = (touchStartDist.current - dist) * 0.02;
      touchStartDist.current = dist;

      const newRadius = Math.max(4.5, Math.min(12, targetSpherical.current.radius + delta));
      targetSpherical.current.radius = newRadius;
      setZoomLevel(Math.round((7.5 / newRadius) * 100));
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  // Toolbar Actions
  const handleReset = useCallback(() => {
    targetSpherical.current = {
      radius: 7.5,
      theta: Math.PI / 4,
      phi: Math.PI / 3.4
    };
    setZoomLevel(100);
  }, []);

  const handleFit = useCallback(() => {
    targetSpherical.current.radius = 7.2;
    targetSpherical.current.phi = Math.PI / 3.6;
    setZoomLevel(104);
  }, []);

  const handleZoomIn = useCallback(() => {
    const newRadius = Math.max(4.5, targetSpherical.current.radius - 0.8);
    targetSpherical.current.radius = newRadius;
    setZoomLevel(Math.round((7.5 / newRadius) * 100));
  }, []);

  const handleZoomOut = useCallback(() => {
    const newRadius = Math.min(12, targetSpherical.current.radius + 0.8);
    targetSpherical.current.radius = newRadius;
    setZoomLevel(Math.round((7.5 / newRadius) * 100));
  }, []);

  const handleScreenshot = useCallback(() => {
    if (!rendererRef.current || !sceneRef.current || !cameraRef.current) return;
    rendererRef.current.render(sceneRef.current, cameraRef.current);
    const dataUrl = rendererRef.current.domElement.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = `pack-adda-custom-box-${width}x${height}x${depth}in.png`;
    link.href = dataUrl;
    link.click();
  }, [width, height, depth]);

  return (
    <div className="preview-3d-stage">
      {/* Top Header Badges */}
      <div className="preview-badges-row">
        <div className="preview-live-badge">
          <span className="live-dot" aria-hidden="true" />
          <span className="live-text">INTERACTIVE 3D PREVIEW</span>
        </div>

        <div className="preview-dimensions-badge">
          <span className="dim-text">{`${width} × ${height} × ${depth} in`}</span>
        </div>
      </div>

      {/* WebGL Canvas Container */}
      <div
        ref={containerRef}
        className={`preview-canvas-viewport ${isDragging ? 'is-dragging' : ''}`}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        onWheel={handleWheel}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        role="region"
        aria-label="3D packaging preview viewport. Drag to rotate, scroll to zoom."
        tabIndex={0}
      />

      {/* Under-Preview 3D Controls */}
      <PreviewToolbar
        zoomLevel={zoomLevel}
        onReset={handleReset}
        onFit={handleFit}
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
        onScreenshot={handleScreenshot}
      />

      {/* Subtle Helper Text */}
      <div className="preview-helper-caption" aria-hidden="true">
        <span>DRAG TO EXPLORE EVERY SIDE</span>
      </div>
    </div>
  );
}
