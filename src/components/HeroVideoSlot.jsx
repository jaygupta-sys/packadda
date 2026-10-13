import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';

export default function HeroVideoSlot({ videoSrc = '/hero video.mp4', onExplore }) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      if (video.duration) {
        setProgress((video.currentTime / video.duration) * 100);
      }
    };

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);

    // Attempt autoplay cleanly
    video.play().catch(() => {
      setIsPlaying(false);
    });

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
    };
  }, [videoSrc]);

  const togglePlay = (e) => {
    if (e) e.stopPropagation();
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  };

  const toggleMute = (e) => {
    if (e) e.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  return (
    <motion.div
      className="hero-video-slot-wrapper"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="hero-video-frame" onClick={togglePlay}>
        {videoSrc ? (
          <>
            <video
              ref={videoRef}
              src={videoSrc}
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              className="hero-video-element"
            />

            {/* Top-Left Ambient Luxury Tag */}
            <div className="video-top-tag-badge">
              <span className="live-pulse-dot" />
              <span>CUSTOM BOX PRINTING REEL</span>
            </div>

            {/* Ambient Play/Pause overlay icon on hover/pause */}
            {!isPlaying && (
              <div className="video-paused-overlay">
                <div className="video-paused-badge">
                  <Play size={20} fill="#FFFFFF" color="#FFFFFF" className="play-icon-arrow" />
                </div>
              </div>
            )}

            {/* Subtle luxury control pill buttons */}
            <div className="hero-video-controls-overlay" onClick={(e) => e.stopPropagation()}>
              <button
                type="button"
                className="video-action-pill-btn"
                onClick={togglePlay}
                aria-label={isPlaying ? 'Pause video' : 'Play video'}
              >
                {isPlaying ? <Pause size={13} /> : <Play size={13} fill="currentColor" />}
                <span className="pill-text">{isPlaying ? 'Pause' : 'Play'}</span>
              </button>

              <button
                type="button"
                className="video-action-pill-btn"
                onClick={toggleMute}
                aria-label={isMuted ? 'Turn sound on' : 'Mute sound'}
              >
                {isMuted ? <VolumeX size={13} /> : <Volume2 size={13} />}
                <span className="pill-text">{isMuted ? 'Muted' : 'Sound'}</span>
              </button>
            </div>

            {/* Bottom progress bar indicator */}
            <div className="video-progress-track">
              <div className="video-progress-fill" style={{ width: `${progress}%` }} />
            </div>
          </>
        ) : (
          <div className="hero-video-placeholder">
            {/* Ambient Warm Studio Backdrop */}
            <div className="video-placeholder-backdrop" />

            {/* Center Play Button & Title */}
            <div className="video-center-cta">
              <button
                type="button"
                className="video-play-btn-circle"
                aria-label="Play brand showcase video"
                onClick={() => setIsPlaying(!isPlaying)}
              >
                <div className="play-ripple-ring ring-1" />
                <Play size={24} fill="#FFFFFF" color="#FFFFFF" className="play-icon-arrow" />
              </button>

              <div className="video-placeholder-text">
                <span className="video-title">Brand Video Reel</span>
                <span className="video-subtitle">Video space reserved • Drop your MP4 / Vimeo video here</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
