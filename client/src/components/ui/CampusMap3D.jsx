import { useState, useEffect, useRef } from 'react';
import { FiPlay, FiPause, FiMaximize, FiMinimize } from 'react-icons/fi';
import campusModel from '@/assets/3D-Models/Tcampus.glb';
import campusPoster from '@/assets/images/tools/campus.webp';

/**
 * CampusMap3D Component
 * Supports controlled camera position via cameraOrbit / fieldOfView props.
 * Handles script-loading race conditions robustly.
 */
export default function CampusMap3D({
  cameraOrbit = '45deg 75deg 60%',
  fieldOfView = '25deg',
  height = '100%',
  minHeight = '450px',
}) {
  const [modelLoaded, setModelLoaded] = useState(false);
  const [scriptReady, setScriptReady] = useState(false);
  const [isRotating, setIsRotating] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const viewerRef = useRef(null);
  const containerRef = useRef(null);
  const listenerAttached = useRef(false);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      if (containerRef.current) {
        containerRef.current.requestFullscreen().catch(err => console.error("Fullscreen error:", err));
      }
    } 
    else
        {
      document.exitFullscreen();
    }

  };

  /* ── Step 1: load the model-viewer CDN script ── */
  useEffect(() => {
    const checkDefined = () =>
      !!(window.customElements && window.customElements.get('model-viewer'));

    if (checkDefined()) {
      setScriptReady(true);
      return;
    }

    const scriptId = 'model-viewer-script';
    let script = document.getElementById(scriptId);

    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.type = 'module';
      script.src =
        'https://ajax.googleapis.com/ajax/libs/model-viewer/3.4.0/model-viewer.min.js';
      document.head.appendChild(script);
    }

    const onLoad = () => setScriptReady(true);
    script.addEventListener('load', onLoad);

    // poll for registration as a fallback (async module scripts can fire before custom element is defined)
    const poll = setInterval(() => {
      if (checkDefined()) {
        clearInterval(poll);
        setScriptReady(true);
      }
    }, 100);

    return () => {
      script.removeEventListener('load', onLoad);
      clearInterval(poll);
    };
  }, []);

  /* ── Step 2: attach 'load' listener once model-viewer element exists ── */
  useEffect(() => {
    if (!scriptReady) return;

    // Give React one tick to render the <model-viewer> element
    const timeout = setTimeout(() => {
      const viewer = viewerRef.current;
      if (!viewer || listenerAttached.current) return;
      listenerAttached.current = true;

      // Already loaded? (cached or fast network)
      if (viewer.loaded) {
        setModelLoaded(true);
        return;
      }

      const handleLoad = () => setModelLoaded(true);
      viewer.addEventListener('load', handleLoad);
    }, 50);

    return () => clearTimeout(timeout);
  }, [scriptReady]);

  /* ── Step 3: animate camera when props change ── */
  useEffect(() => {
    const viewer = viewerRef.current;
    if (!viewer) return;
    // Set via property (works even before full load — queued internally)
    viewer.cameraOrbit = cameraOrbit;
    viewer.fieldOfView = fieldOfView;
  }, [cameraOrbit, fieldOfView]);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100%',
        height,
        minHeight: isFullscreen ? '100vh' : minHeight,
        background: '#1A1A1A',
        borderRadius: isFullscreen ? '0' : 'inherit',
        overflow: 'hidden',
      }}
    >
      {/* Loading skeleton — shown until model fires its load event */}
      {!modelLoaded && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1.5rem',
            background: '#1A1A1A',
            zIndex: 10,
            color: '#FFFFFF',
            pointerEvents: 'none',
          }}
        >
          <div
            style={{
              width: '44px',
              height: '44px',
              border: '3px solid rgba(139,0,0,0.15)',
              borderTopColor: 'var(--brand-primary)',
              borderRadius: '50%',
              animation: 'mv-spin 1s linear infinite',
            }}
          />
          <style>{`
            @keyframes mv-spin {
              from { transform: rotate(0deg); }
              to   { transform: rotate(360deg); }
            }
          `}</style>
          <div style={{ textAlign: 'center' }}>
            <p style={{ opacity: 0.9, fontSize: '1rem', fontWeight: 500, marginBottom: '0.25rem' }}>
              Initializing 3D Campus
            </p>
            <p style={{ opacity: 0.5, fontSize: '0.75rem', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              Loading model…
            </p>
          </div>
        </div>
      )}

      {/* model-viewer — always render when script ready so it can start fetching the GLB */}
      {scriptReady && (
        <model-viewer
          ref={viewerRef}
          src={campusModel}
          poster={campusPoster}
          alt="MIU Campus 3D Model"
          {...(isRotating ? { 'auto-rotate': true } : {})}
          auto-rotate-delay="1000"
          camera-controls
          camera-orbit={cameraOrbit}
          field-of-view={fieldOfView}
          shadow-intensity="2"
          shadow-softness="0.5"
          exposure="1.1"
          environment-image="neutral"
          rotation-per-second="8deg"
          interaction-prompt="none"
          loading="eager"
          reveal="auto"
          interpolation-decay="300"
          style={{
            width: '100%',
            height: '100%',
            minHeight,
            background: 'transparent',
            opacity: modelLoaded ? 1 : 0,
            transition: 'opacity 0.8s ease-in-out',
            display: 'block',
          }}
        />
      )}

      {/* Controls Overlay */}
      {modelLoaded && (
        <div style={{
          position: 'absolute',
          bottom: '16px',
          right: '16px',
          display: 'flex',
          gap: '8px',
          zIndex: 20
        }}>
          <button
            onClick={() => setIsRotating(!isRotating)}
            style={{
              background: 'rgba(0,0,0,0.6)',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: '50%',
              width: '36px',
              height: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              cursor: 'pointer',
              backdropFilter: 'blur(4px)',
              transition: 'background 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(0,0,0,0.8)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(0,0,0,0.6)'}
            title={isRotating ? "Pause Rotation" : "Play Rotation"}
          >
            {isRotating ? <FiPause size={16} /> : <FiPlay size={16} />}
          </button>
          <button
            onClick={toggleFullscreen}
            style={{
              background: 'rgba(0,0,0,0.6)',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: '50%',
              width: '36px',
              height: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              cursor: 'pointer',
              backdropFilter: 'blur(4px)',
              transition: 'background 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(0,0,0,0.8)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(0,0,0,0.6)'}
            title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
          >
            {isFullscreen ? <FiMinimize size={16} /> : <FiMaximize size={16} />}
          </button>
        </div>
      )}
    </div>
  );
}
