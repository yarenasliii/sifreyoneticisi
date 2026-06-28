<<<<<<< HEAD
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
=======
import React, { useState, useEffect } from 'react';
import { Shield, Plus, Search, Clock, Settings } from 'lucide-react';
import './App.css';

// Parçalara ayırdığımız bileşenleri içeri alıyoruz
import Header from './components/Header';
import PasswordCard from './components/PasswordCard';
import PasswordForm from './components/PasswordForm';
import HistoryView from './components/HistoryView';
import SettingsView from './components/SettingsView';

export default function App() {
  const [passwords, setPasswords] = useState(() => {
    const saved = localStorage.getItem('google_clone_passwords');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [activeTab, setActiveTab] = useState('home');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tümü');
  const [theme, setTheme] = useState('light');
  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem('google_clone_history');
    return saved ? JSON.parse(saved) : [];
  });

  // Form State'leri
  const [siteName, setSiteName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [category, setCategory] = useState('Genel');
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    localStorage.setItem('google_clone_passwords', JSON.stringify(passwords));
  }, [passwords]);

  useEffect(() => {
    localStorage.setItem('google_clone_history', JSON.stringify(history));
  }, [history]);

  const handleSave = (e) => {
    e.preventDefault();
    if (!siteName || !username || !password) return alert('Lütfen tüm alanları doldurun!');

    if (editingId) {
      setPasswords(passwords.map(p => p.id === editingId ? { ...p, siteName, username, password, category } : p));
      addHistory(`${siteName} şifresi güncellendi.`);
      setEditingId(null);
    } else {
      const newPass = {
        id: Date.now(),
        siteName,
        username,
        password,
        category,
        isFavorite: false,
        createdAt: new Date().toLocaleDateString('tr-TR')
      };
      setPasswords([newPass, ...passwords]);
      addHistory(`${siteName} şifresi eklendi.`);
    }

    setSiteName(''); setUsername(''); setPassword(''); setCategory('Genel');
    setActiveTab('home');
  };

  const handleDelete = (id, name) => {
    if(confirm(`${name} şifresini silmek istediğinize emin misiniz?`)) {
      setPasswords(passwords.filter(p => p.id !== id));
      addHistory(`${name} şifresi silindi.`);
    }
  };

  const startEdit = (p) => {
    setEditingId(p.id);
    setSiteName(p.siteName);
    setUsername(p.username);
    setPassword(p.password);
    setCategory(p.category);
    setActiveTab('add');
  };

  const toggleFavorite = (id) => {
    setPasswords(passwords.map(p => p.id === id ? { ...p, isFavorite: !p.isFavorite } : p));
  };

  const addHistory = (action) => {
    const log = {
      id: Date.now(),
      action,
      time: new Date().toLocaleTimeString('tr-TR') + ' ' + new Date().toLocaleDateString('tr-TR')
    };
    setHistory([log, ...history]);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert('Şifre başarıyla kopyalandı!');
  };

  const exportData = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(passwords));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", "google_sifrelerim_yedek.json");
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const importData = (e) => {
    const fileReader = new FileReader();
    fileReader.readAsText(e.target.files[0], "UTF-8");
    fileReader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target.result);
        if(Array.isArray(parsed)) {
          setPasswords([...parsed, ...passwords]);
          alert('Şifreler başarıyla içe aktarıldı!');
        }
      } catch (err) {
        alert('Geçersiz dosya formatı!');
      }
    };
  };

  const calculateSecurityScore = () => {
    if (passwords.length === 0) return 100;
    let weakPasswords = 0;
    passwords.forEach(p => {
      if (p.password.length < 8) weakPasswords++;
    });
    return Math.round(((passwords.length - weakPasswords) / passwords.length) * 100);
  };

  const filteredPasswords = passwords.filter(p => {
    const matchesSearch = p.siteName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          p.username.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Tümü' || 
                            (selectedCategory === 'Favoriler' && p.isFavorite) || 
                            p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="mobile-container" data-theme={theme}>
      <Header theme={theme} setTheme={setTheme} />

      <main className="content">
        {activeTab === 'home' && (
          <>
            <div className="security-card">
              <div className="security-header">
                <span>Güvenlik Kontrolü</span>
                <span style={{ color: calculateSecurityScore() < 50 ? 'var(--danger-color)' : 'var(--success-color)' }}>
                  %{calculateSecurityScore()} Güvenli
                </span>
              </div>
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ 
                    width: `${calculateSecurityScore()}%`, 
                    backgroundColor: calculateSecurityScore() < 50 ? 'var(--danger-color)' : 'var(--success-color)' 
                  }}
                />
              </div>
            </div>

            <div className="search-box">
              <Search size={18} color="var(--text-secondary)" />
              <input 
                type="text" 
                placeholder="Şifrelerde ara..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="categories">
              {['Tümü', 'Favoriler', 'Genel', 'Sosyal Medya', 'Banka', 'Alışveriş'].map(cat => (
                <span 
                  key={cat} 
                  className={`category-chip ${selectedCategory === cat ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                </span>
              ))}
            </div>

            <h2 className="section-title">Kayıtlı Hesaplar ({filteredPasswords.length})</h2>
            
            {filteredPasswords.length === 0 ? (
              <div className="empty-state">Henüz kayıtlı şifre bulunamadı veya eşleşmedi.</div>
            ) : (
              <div className="password-list">
                {filteredPasswords.map(p => (
                  <PasswordCard 
                    key={p.id}
                    p={p}
                    toggleFavorite={toggleFavorite}
                    copyToClipboard={copyToClipboard}
                    startEdit={startEdit}
                    handleDelete={handleDelete}
                  />
                ))}
              </div>
            )}
          </>
        )}

        {activeTab === 'add' && (
          <PasswordForm 
            siteName={siteName} setSiteName={setSiteName}
            username={username} setUsername={setUsername}
            password={password} setPassword={setPassword}
            category={category} setCategory={setCategory}
            editingId={editingId} setEditingId={setEditingId}
            handleSave={handleSave}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'history' && (
          <HistoryView history={history} setHistory={setHistory} />
        )}

        {activeTab === 'settings' && (
          <SettingsView exportData={exportData} importData={importData} />
        )}
      </main>

      <nav className="bottom-nav">
        <button className={`nav-item ${activeTab === 'home' ? 'active' : ''}`} onClick={() => setActiveTab('home')}>
          <Shield size={20} />
          <span>Şifreler</span>
        </button>
        <button className={`nav-item ${activeTab === 'add' ? 'active' : ''}`} onClick={() => setActiveTab('add')}>
          <Plus size={20} />
          <span>Ekle</span>
        </button>
        <button className={`nav-item ${activeTab === 'history' ? 'active' : ''}`} onClick={() => setActiveTab('history')}>
          <Clock size={20} />
          <span>Geçmiş</span>
        </button>
        <button className={`nav-item ${activeTab === 'settings' ? 'active' : ''}`} onClick={() => setActiveTab('settings')}>
          <Settings size={20} />
          <span>Ayarlar</span>
        </button>
      </nav>
    </div>
  );
>>>>>>> c9fead54b3cdf62368ab400d06cf5ce1ffb70f39
}