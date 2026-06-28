import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Shield, Plus, Clock, Settings } from 'lucide-react';

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  // Determine active tab based on URL
  const getActiveTab = () => {
    const path = location.pathname;
    if (path === '/') return 'home';
    if (path === '/add') return 'add';
    if (path === '/history') return 'history';
    if (path === '/settings') return 'settings';
    return 'home';
  };

  const activeTab = getActiveTab();

  const tabs = [
    { id: 'home', label: 'Şifreler', icon: Shield, path: '/' },
    { id: 'add', label: 'Ekle', icon: Plus, path: '/add' },
    { id: 'history', label: 'Geçmiş', icon: Clock, path: '/history' },
    { id: 'settings', label: 'Ayarlar', icon: Settings, path: '/settings' },
  ];

  return (
    <nav className="bottom-nav">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;

        return (
          <button
            key={tab.id}
            className={`nav-item ${isActive ? 'active' : ''}`}
            onClick={() => navigate(tab.path)}
            title={tab.label}
          >
            <Icon size={20} />
            <span>{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
}