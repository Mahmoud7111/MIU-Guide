import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

// Context Providers
import { LanguageProvider } from '../context/LanguageContext';
import { ThemeProvider } from '../context/ThemeContext';
import { AuthProvider } from '../context/AuthContext';

// Router configuration
import router from '../routes';

// Global Styles
import '../styles/index.css';

/**
 * Entry point for the MIU-Guide React application.
 * 
 * Provider Nesting Strategy:
 * 1. LanguageProvider: Outermost to set 'dir' and 'lang' on <html> immediately.
 * 2. ThemeProvider: Sets 'data-theme' on <html>, affecting all CSS variables.
 * 3. AuthProvider: Manages user state; nested inside UI providers.
 * 4. RouterProvider: Innermost to give all routes access to all three contexts.
 */
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LanguageProvider>
      <ThemeProvider>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </ThemeProvider>
    </LanguageProvider>
  </StrictMode>
);
