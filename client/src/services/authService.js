import http from '../lib/api/http';
import { ENDPOINTS } from '../lib/api/endpoints';

/**
 * Service for handling authentication requests.
 */
export const authService = {
  /**
   * Log in a user with credentials.
   * @param {Object} credentials { email, password }
   */
  login: (credentials) => http.post(ENDPOINTS.LOGIN, credentials),

  /**
   * Register a new student account.
   * @param {Object} data Registration data
   */
  register: (data) => http.post(ENDPOINTS.REGISTER, data),

  /**
   * Fetch current authenticated user profile.
   */
  getProfile: () => http.get(ENDPOINTS.PROFILE),

  /**
   * Log out the current user by removing the token.
   * (Client-side cleanup)
   */
  logout: () => {
    localStorage.removeItem('miu_token');
    // Note: window.location.href might be used here for a hard redirect 
    // if not handled by the AuthContext.
  },

  /**
   * Check if a token exists in storage.
   */
  hasToken: () => !!localStorage.getItem('miu_token'),
};

export default authService;
