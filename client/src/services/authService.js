/**
 * Service for handling authentication requests.
 * Refactored to use hardcoded mock data and localStorage.
 */
export const authService = {
  /**
   * Log in a user with credentials.
   * @param {Object} credentials { email, password }
   */
  login: async (credentials) => {
    // Mock login logic
    const { email, password } = credentials;
    
    // Simple mock check
    if (email && password) {
      const mockUser = {
        id: 'std_12345',
        name: 'Mahmoud',
        email: email,
        role: 'student',
        faculty: 'Engineering',
        year: 3
      };
      
      localStorage.setItem('miu_token', 'mock_jwt_token_12345');
      localStorage.setItem('miu_user', JSON.stringify(mockUser));
      
      return { data: { user: mockUser, token: 'mock_jwt_token_12345' } };
    }
    throw new Error('Invalid credentials');
  },

  /**
   * Register a new student account.
   * @param {Object} data Registration data
   */
  register: async (data) => {
    // Mock registration logic
    const mockUser = {
      ...data,
      id: 'std_' + Math.floor(Math.random() * 10000),
      role: 'student'
    };
    
    localStorage.setItem('miu_token', 'mock_jwt_token_new');
    localStorage.setItem('miu_user', JSON.stringify(mockUser));
    
    return { data: { user: mockUser, token: 'mock_jwt_token_new' } };
  },

  /**
   * Fetch current authenticated user profile.
   */
  getProfile: async () => {
    const user = localStorage.getItem('miu_user');
    if (user) {
      return { data: JSON.parse(user) };
    }
    throw new Error('Unauthorized');
  },

  /**
   * Log out the current user by removing the token.
   */
  logout: () => {
    localStorage.removeItem('miu_token');
    localStorage.removeItem('miu_user');
  },

  /**
   * Check if a token exists in storage.
   */
  hasToken: () => !!localStorage.getItem('miu_token'),
};

export default authService;
