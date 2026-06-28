import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activeTab: 'home', // Which tab is active (home, add, history, settings)
  searchTerm: '', // Search box text
  selectedCategory: 'Tümü', // Filter category
  editingId: null, // Which password is being edited (null if adding new)
  
  // Form data for Add/Edit
  formData: {
    siteName: '',
    siteUrl: '',
    username: '',
    password: '',
    category: 'Genel',
  },
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    // Set active tab
    setActiveTab: (state, action) => {
      state.activeTab = action.payload;
    },

    // Set search term
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },

    // Set selected category filter
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },

    // Set which password is being edited
    setEditingId: (state, action) => {
      state.editingId = action.payload;
    },

    // Update one form field
    updateFormField: (state, action) => {
      const { field, value } = action.payload;
      state.formData[field] = value;
    },

    // Set entire form data (useful when editing existing password)
    setFormData: (state, action) => {
      state.formData = action.payload;
    },

    // Reset form to empty
    resetFormData: (state) => {
      state.formData = {
        siteName: '',
        siteUrl: '',
        username: '',
        password: '',
        category: 'Genel',
      };
      state.editingId = null;
    },

    // Reset all UI to defaults
    resetAllUI: (state) => {
      state.activeTab = 'home';
      state.searchTerm = '';
      state.selectedCategory = 'Tümü';
      state.editingId = null;
      state.formData = {
        siteName: '',
        siteUrl: '',
        username: '',
        password: '',
        category: 'Genel',
      };
    },
  },
});

export const {
  setActiveTab,
  setSearchTerm,
  setSelectedCategory,
  setEditingId,
  updateFormField,
  setFormData,
  resetFormData,
  resetAllUI,
} = uiSlice.actions;

export default uiSlice.reducer;