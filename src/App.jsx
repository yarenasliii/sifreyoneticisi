import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { Shield, Moon, Sun } from 'lucide-react';
import './App.css';

import { toggleTheme } from './store/slices/themeSlice';

// Page components (we'll create these next)
import Home from './components/Home';
import AddPassword from './components/AddPassword';
import HistoryView from './components/HistoryView';
import SettingsView from './components/SettingsView';
import BottomNav from './components/BottomNav';

function AppContent() {
  const dispatch = useDispatch();
  const theme = useSelector(state => state.theme);

  const handleThemeToggle = () => {
    dispatch(toggleTheme());
  };

  return (
    <div className="mobile-container" data-theme={theme}>
      {/* Header */}
      <header className="app-header">
        <div className="logo-area">
          <Shield size={24} color={theme === 'light' ? '#1a73e8' : '#8ab4f8'} />
          <span>Şifre Yöneticisi</span>
        </div>
        <button className="theme-toggle" onClick={handleThemeToggle}>
          {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
        </button>
      </header>

      {/* Main Content - Routes */}
      <main className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<AddPassword />} />
          <Route path="/history" element={<HistoryView />} />
          <Route path="/settings" element={<SettingsView />} />
        </Routes>
      </main>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}