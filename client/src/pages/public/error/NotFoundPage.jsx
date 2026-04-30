import React from 'react';

const NotFoundPage = () => {
  return (
    <div style={{ height: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: 'sans-serif' }}>
      <h1 style={{ fontSize: '4rem', color: 'var(--brand-primary, #8b0000)' }}>404</h1>
      <p style={{ fontSize: '1.5rem', color: '#666' }}>Page Not Found</p>
      <a href="/" style={{ marginTop: '20px', color: 'var(--brand-primary, #8b0000)', fontWeight: 'bold' }}>Return Home</a>
    </div>
  );
};

export default NotFoundPage;
