import React from 'react';
import { useRouteError } from 'react-router-dom';

const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);

  return (
    <div style={{ height: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '20px', fontFamily: 'sans-serif' }}>
      <h1 style={{ fontSize: '3rem', color: '#8b0000' }}>Application Error</h1>
      <p style={{ fontSize: '1.2rem', color: '#666', maxWidth: '600px' }}>
        {error?.statusText || error?.message || "An unexpected error occurred."}
      </p>
      <button onClick={() => window.location.reload()} style={{ marginTop: '20px', padding: '10px 20px', background: '#8b0000', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
        Reload Page
      </button>
    </div>
  );
};

export default ErrorPage;
