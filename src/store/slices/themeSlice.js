import { createSlice } from '@reduxjs/toolkit';

// Load theme from localStorage or default to 'light'
const initialState = localStorage.getItem('theme') || 'light';

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    // Toggle between light and dark
    toggleTheme: (state) => {
      const newTheme = state === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', newTheme);
      return newTheme;
    },

    // Set theme to specific value
    setTheme: (state, action) => {
      localStorage.setItem('theme', action.payload);
      return action.payload;
      // payload is the data that we send to the action
    },
  },
});

export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;