import { useState, useEffect, useRef } from 'react';
import campusModel from '@/assets/3D-Models/Tcampus.glb';
import campusPoster from '@/assets/images/tools/campus.webp';

/**
 * CampusMap3D Component
 * Premium 3D campus model viewer using Google's <model-viewer>
 */
export default function CampusMap3D() {
  const [modelLoaded, setModelLoaded] = useState(false);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const viewerRef = useRef(null);

  useEffect(() => {
    // 1. Check if model-viewer is already defined
    if (window.customElements && window.customElements.get('model-viewer')) {
      setScriptLoaded(true);
    } else {
      // 2. Load script if not already present
      const scriptId = 'model-viewer-script';
      let script = document.getElementById(scriptId);

      if (!script) {
        script = document.createElement('script');
        script.id = scriptId;
        script.type = 'module';
        script.src = 'https://ajax.googleapis.com/ajax/libs/model-viewer/3.4.0/model-viewer.min.js';
        document.head.appendChild(script);
      }

      const handleScriptLoad = () => setScriptLoaded(true);
      script.addEventListener('load', handleScriptLoad);
      
      // If already loaded by the time we attach
      if (window.customElements && window.customElements.get('model-viewer')) {
        setScriptLoaded(true);
      }

      return () => {
        script.removeEventListener('load', handleScriptLoad);
      };
    }
  }, []);

  useEffect(() => {
    const viewer = viewerRef.current;
    if (!viewer) return;

    const handleLoad = () => {
      setModelLoaded(true);
    };

    viewer.addEventListener('load', handleLoad);
    return () => {
      viewer.removeEventListener('load', handleLoad);
    };
  }, [scriptLoaded]);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', minHeight: '450px', background: '#1A1A1A' }}>
      {/* Loading Placeholder / Skeleton */}
      {!modelLoaded && (
        <div style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '1.5rem',
          background: '#1A1A1A',
          zIndex: 10,
          color: '#FFFFFF'
        }}>
          <div style={{
            width: '48px',
            height: '48px',
            border: '3px solid rgba(139, 0, 0, 0.1)',
            borderTopColor: 'var(--brand-primary)',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
          }} />
          <style>{`
            @keyframes spin {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }
          `}</style>
          <div style={{ textAlign: 'center' }}>
            <p style={{ opacity: 0.9, fontSize: '1rem', fontWeight: '500', marginBottom: '0.25rem' }}>
              Initializing 3D Campus
            </p>
            <p style={{ opacity: 0.5, fontSize: '0.75rem', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              Optimizing Textures & Geometry
            </p>
          </div>
        </div>
      )}

      {scriptLoaded && (
        <model-viewer
          ref={viewerRef}
          src={campusModel}
          poster={campusPoster}
          alt="MIU Campus 3D Model"
          auto-rotate
          auto-rotate-delay="1000"
          camera-controls
          camera-orbit="45deg 75deg 60%"
          field-of-view="25deg"
          shadow-intensity="2"
          shadow-softness="0.5"
          exposure="1.1"
          environment-image="neutral"
          rotation-per-second="8deg"
          interaction-prompt="none"
          loading="eager"
          reveal="auto"
          interpolation-decay="200"
          style={{ 
            width: '100%', 
            height: '100%', 
            background: 'transparent',
            opacity: modelLoaded ? 1 : 0,
            transition: 'opacity 0.8s ease-in-out'
          }}
        />
      )}
    </div>
  );
}
