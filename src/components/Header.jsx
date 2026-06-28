import React from 'react';
import { Shield, Moon, Sun } from 'lucide-react';

export default function Header({ theme, setTheme }) {
  return (
    <header className="app-header">
      <div className="logo-area">
        <Shield size={24} color={theme === 'light' ? '#1a73e8' : '#8ab4f8'} />
        <span>Şifre Yöneticisi</span>
      </div>
      <button className="theme-toggle" onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
        {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
      </button>
    </header>
  );
}