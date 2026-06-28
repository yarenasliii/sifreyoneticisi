// this file sets up the redux
import { configureStore } from '@reduxjs/toolkit';
import passwordReducer from './slices/passwordSlice';
import themeReducer from './slices/themeSlice';
import uiReducer from './slices/uiSlice';

// creating a store with 3 slices
export const store = configureStore({
  reducer: {
    passwords: passwordReducer,
    theme: themeReducer,
    ui: uiReducer,
  },
});

export default store;