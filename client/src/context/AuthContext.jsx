/**
 * @fileoverview Authentication context for MIU.
 *
 * Provides user state, login, logout, and an isAuthenticated flag to the
 * entire application. The http.js Axios instance reads the same localStorage
 * keys and clears them on 401 — this context reacts to that by having the
 * user become null on next render (or page reload).
 *
 * localStorage keys (must stay in sync with lib/api/http.js):
 *   miu_token — JWT access token string
 *   miu_user  — JSON-serialised user object
 */

import { createContext, useContext, useState, useEffect } from 'react';

/* -------------------------------------------------------------------------- */
/*                                  CONTEXT                                    */
/* -------------------------------------------------------------------------- */

/** @type {React.Context<AuthContextValue|null>} */
const AuthContext = createContext(null);

/* -------------------------------------------------------------------------- */
/*                                  PROVIDER                                   */
/* -------------------------------------------------------------------------- */

/**
 * Wrap your application (or protected subtree) with AuthProvider to give
 * descendant components access to authentication state and actions.
 *
 * @param {{ children: React.ReactNode }} props
 * @returns {JSX.Element}
 */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  /* ---- Rehydrate from localStorage on mount ---- */
  useEffect(() => {
    const token = localStorage.getItem('miu_token');
    const storedUser = localStorage.getItem('miu_user');

    if (token && storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        // Corrupted storage — start fresh
        localStorage.removeItem('miu_token');
        localStorage.removeItem('miu_user');
      }
    }
  }, []);

  /* ---- Actions ---- */

  /**
   * Persists the authenticated session to state and localStorage.
   * Call this immediately after a successful login API response.
   *
   * @param {Object} userData - The user object returned by the API.
   * @param {string} token    - The JWT access token returned by the API.
   */
  function login(userData, token) {
    localStorage.setItem('miu_token', token);
    localStorage.setItem('miu_user', JSON.stringify(userData));
    setUser(userData);
  }

  /**
   * Clears all session data from state and localStorage.
   * Safe to call even when the user is already logged out.
   */
  function logout() {
    localStorage.removeItem('miu_token');
    localStorage.removeItem('miu_user');
    setUser(null);
  }

  /* ---- Derived state ---- */

  /** @type {boolean} True when a user session is active. */
  const isAuthenticated = !!user;

  /* ---- Context value ---- */

  /**
   * @typedef {Object} AuthContextValue
   * @property {Object|null} user            - The authenticated user object, or null.
   * @property {boolean}     isAuthenticated - Derived boolean for guard checks.
   * @property {Function}    login           - Sets user + persists token to localStorage.
   * @property {Function}    logout          - Clears user + removes token from localStorage.
   */
  const value = {
    user,
    isAuthenticated,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/* -------------------------------------------------------------------------- */
/*                                CUSTOM HOOK                                  */
/* -------------------------------------------------------------------------- */

/**
 * Access the authentication context from any component inside AuthProvider.
 *
 * @returns {AuthContextValue}
 * @throws {Error} When called outside of an AuthProvider subtree.
 *
 * @example
 * const { user, isAuthenticated, login, logout } = useAuth();
 */
export function useAuth() {
  const ctx = useContext(AuthContext);

  if (ctx === null) {
    throw new Error(
      'useAuth() must be called inside an <AuthProvider>. ' +
        'Ensure your component is rendered within the provider tree.'
    );
  }

  return ctx;
}
