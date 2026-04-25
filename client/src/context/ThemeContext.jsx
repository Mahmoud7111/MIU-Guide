/**
 * @fileoverview Theme context for MIU — manages light / dark mode.
 *
 * Theme is toggled manually by the user (not via prefers-color-scheme).
 * The selected theme is persisted to localStorage under the key `miu_theme`
 * and applied as a `data-theme` attribute on <html> so that the CSS variables
 * defined in styles/variables.css pick up the correct token set.
 *
 * localStorage key: miu_theme — 'light' | 'dark'
 */

import { createContext, useContext, useState, useEffect } from 'react';

/* -------------------------------------------------------------------------- */
/*                                  CONTEXT                                    */
/* -------------------------------------------------------------------------- */

/** @type {React.Context<ThemeContextValue|null>} */
const ThemeContext = createContext(null);

/* -------------------------------------------------------------------------- */
/*                                  PROVIDER                                   */
/* -------------------------------------------------------------------------- */

/**
 * Provides theme state and toggle action to the entire component tree.
 * Place this at (or near) the root of your application.
 *
 * @param {{ children: React.ReactNode }} props
 * @returns {JSX.Element}
 */
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    // Initialise from storage synchronously to avoid a flash of wrong theme
    return localStorage.getItem('miu_theme') || 'light';
  });

  /* ---- Apply theme to DOM + persist on every change ---- */
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('miu_theme', theme);
  }, [theme]);

  /* ---- Action ---- */

  /**
   * Switches between 'light' and 'dark' modes.
   * CSS transitions on <html> (defined in animations.css) ensure a
   * smooth color swap without any JavaScript animation.
   */
  function toggleTheme() {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }

  /* ---- Context value ---- */

  /**
   * @typedef {Object} ThemeContextValue
   * @property {'light'|'dark'} theme        - Current active theme.
   * @property {Function}       toggleTheme  - Flips between light and dark.
   * @property {boolean}        isDark        - Convenience boolean for conditional rendering.
   */
  const value = {
    theme,
    toggleTheme,
    isDark: theme === 'dark',
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

/* -------------------------------------------------------------------------- */
/*                                CUSTOM HOOK                                  */
/* -------------------------------------------------------------------------- */

/**
 * Access the theme context from any component inside ThemeProvider.
 *
 * @returns {ThemeContextValue}
 * @throws {Error} When called outside of a ThemeProvider subtree.
 *
 * @example
 * const { theme, toggleTheme, isDark } = useTheme();
 */
export function useTheme() {
  const ctx = useContext(ThemeContext);

  if (ctx === null) {
    throw new Error(
      'useTheme() must be called inside a <ThemeProvider>. ' +
        'Ensure your component is rendered within the provider tree.'
    );
  }

  return ctx;
}
