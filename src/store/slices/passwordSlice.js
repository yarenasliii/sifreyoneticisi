// slices handle a piece of our data, this slice handles all the logic about password
import { createSlice } from '@reduxjs/toolkit';

// Helper function to calculate password strength
const calculatePasswordStrength = (password) => {
  if (!password) return 0;

  let score = 0;

  // Length checks
  if (password.length >= 8) score += 20;
  if (password.length >= 12) score += 10;
  if (password.length >= 16) score += 10;

  // Character variety checks
  if (/[A-Z]/.test(password)) score += 20; // Has uppercase
  if (/[0-9]/.test(password)) score += 20; // Has numbers
  if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) score += 20; // Has special chars

  // Deduct points for weak patterns
  if (/^(.)\1+$/.test(password)) score -= 30; // All same character (111, aaa)
  if (/(?:012|123|234|345|456|567|678|789|890|abc|bcd|cde)/.test(password)) score -= 15; // Sequential

  return Math.min(100, Math.max(0, score));
};

// This loads existing passwords from localStorage when app starts.
const initialState = (() => {
  const saved = localStorage.getItem('passwords');
  return saved ? JSON.parse(saved) : [];
})();

const passwordSlice = createSlice({
  name: 'passwords',
  initialState,
  reducers: {
    // Add new password
    addPassword: (state, action) => {
      const newPassword = {
        id: Date.now(),
        siteName: action.payload.siteName,
        siteUrl: action.payload.siteUrl || '',
        username: action.payload.username,
        encryptedPassword: action.payload.password,
        category: action.payload.category || 'Genel',
        isFavorite: false,
        securityScore: calculatePasswordStrength(action.payload.password),
        lastUsedTimestamp: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        passwordHistory: [action.payload.password],
      };
      state.unshift(newPassword);
      localStorage.setItem('passwords', JSON.stringify(state));
      // each action updates localStorage so data persists even after refresh
    },

    // Update existing password
    updatePassword: (state, action) => {
      const index = state.findIndex(p => p.id === action.payload.id);
      if (index !== -1) {
        const oldPassword = state[index].encryptedPassword;
        state[index] = {
          ...state[index],
          siteName: action.payload.siteName,
          siteUrl: action.payload.siteUrl || '',
          username: action.payload.username,
          encryptedPassword: action.payload.password,
          category: action.payload.category,
          securityScore: calculatePasswordStrength(action.payload.password),
          lastUsedTimestamp: new Date().toISOString(),
          passwordHistory: [action.payload.password, ...state[index].passwordHistory.slice(0, 4)],
        };
        localStorage.setItem('passwords', JSON.stringify(state));
      }
    },

    // Delete password
    deletePassword: (state, action) => {
      const filtered = state.filter(p => p.id !== action.payload);
      localStorage.setItem('passwords', JSON.stringify(filtered));
      return filtered;
    },

    // Toggle favorite
    toggleFavorite: (state, action) => {
      const password = state.find(p => p.id === action.payload);
      if (password) {
        password.isFavorite = !password.isFavorite;
        localStorage.setItem('passwords', JSON.stringify(state));
      }
    },

    // Import passwords
    importPasswords: (state, action) => {
      const imported = action.payload;
      const newState = [...imported, ...state];
      localStorage.setItem('passwords', JSON.stringify(newState));
      return newState;
    },

    // Clear all passwords
    clearAllPasswords: (state) => {
      localStorage.removeItem('passwords');
      return [];
    },
  },
});

export const {
  addPassword,
  updatePassword,
  deletePassword,
  toggleFavorite,
  importPasswords,
  clearAllPasswords,
} = passwordSlice.actions;

export default passwordSlice.reducer;