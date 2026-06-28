// This shows the password list with security score, search, and filters.
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Search, Star, Copy, Edit2, Trash2 } from 'lucide-react';
import { showSuccess } from '../utils/toast';
import {
  deletePassword,
  toggleFavorite,
  
} from '../store/slices/passwordSlice';
import {
  setSearchTerm,
  setSelectedCategory,
  setFormData,
  setEditingId,
} from '../store/slices/uiSlice';

export default function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get data from Redux
  const passwords = useSelector(state => state.passwords);
  const searchTerm = useSelector(state => state.ui.searchTerm);
  const selectedCategory = useSelector(state => state.ui.selectedCategory);

  // Calculate security score
  const calculateSecurityScore = () => {
    if (passwords.length === 0) return 0;
    const avgScore = passwords.reduce((sum, p) => sum + p.securityScore, 0) / passwords.length;
    return Math.round(avgScore);
  };

  // Filter passwords
  const filteredPasswords = passwords.filter(p => {
    const matchesSearch =
      p.siteName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.username.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === 'Tümü' ||
      (selectedCategory === 'Favoriler' && p.isFavorite) ||
      p.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  // Handle delete
  const handleDelete = (id, name) => {
    if (confirm(`${name} şifresini silmek istediğinize emin misiniz?`)) {
      dispatch(deletePassword(id));
    }
  };

  // Handle edit
  const handleEdit = (password) => {
    dispatch(
      setFormData({
        siteName: password.siteName,
        siteUrl: password.siteUrl,
        username: password.username,
        password: password.encryptedPassword,
        category: password.category,
      })
    );
    dispatch(setEditingId(password.id));
    navigate('/add');
  };

  // Handle copy to clipboard
  

    const handleCopy = (password) => {
    navigator.clipboard.writeText(password);
    showSuccess('Şifre başarıyla kopyalandı!');
    };

  return (
    <>
      {/* Security Card */}
      <div className="security-card">
        <div className="security-header">
          <span>Güvenlik Kontrolü</span>
          <span
            style={{
              color:
                calculateSecurityScore() < 50
                  ? 'var(--danger-color)'
                  : 'var(--success-color)',
            }}
          >
            %{calculateSecurityScore()} Güvenli
          </span>
        </div>
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{
              width: `${calculateSecurityScore()}%`,
              backgroundColor:
                calculateSecurityScore() < 50
                  ? 'var(--danger-color)'
                  : 'var(--success-color)',
            }}
          />
        </div>
      </div>

      {/* Search Box */}
      <div className="search-box">
        <Search size={18} color="var(--text-secondary)" />
        <input
          type="text"
          placeholder="Şifrelerde ara..."
          value={searchTerm}
          onChange={(e) => dispatch(setSearchTerm(e.target.value))}
        />
      </div>

      {/* Categories */}
      <div className="categories">
        {['Tümü', 'Favoriler', 'Genel', 'Sosyal Medya', 'Banka', 'Alışveriş'].map(
          (cat) => (
            <span
              key={cat}
              className={`category-chip ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => dispatch(setSelectedCategory(cat))}
            >
              {cat}
            </span>
          )
        )}
      </div>

      {/* Password List */}
      <h2 className="section-title">Kayıtlı Hesaplar ({filteredPasswords.length})</h2>

      {filteredPasswords.length === 0 ? (
        <div className="empty-state">Henüz kayıtlı şifre bulunamadı veya eşleşmedi.</div>
      ) : (
        <div className="password-list">
          {filteredPasswords.map((p) => (
            <div key={p.id} className="password-card">
              <div className="card-info">
                <div className="card-icon-wrapper">{p.siteName.charAt(0).toUpperCase()}</div>
                <div>
                  <div className="site-name">{p.siteName}</div>
                  <div className="user-name">{p.username}</div>
                </div>
              </div>
              <div className="card-actions">
                <button
                  className="action-btn"
                  onClick={() => dispatch(toggleFavorite(p.id))}
                  title="Favorilere ekle"
                >
                  <Star
                    size={18}
                    fill={p.isFavorite ? 'var(--warning-color)' : 'none'}
                    color={p.isFavorite ? 'var(--warning-color)' : 'var(--text-secondary)'}
                  />
                </button>
                <button
                  className="action-btn"
                  onClick={() => handleCopy(p.encryptedPassword)}
                  title="Şifreyi kopyala"
                >
                  <Copy size={18} />
                </button>
                <button
                  className="action-btn"
                  onClick={() => handleEdit(p)}
                  title="Düzenle"
                >
                  <Edit2 size={18} />
                </button>
                <button
                  className="action-btn"
                  onClick={() => handleDelete(p.id, p.siteName)}
                  title="Sil"
                >
                  <Trash2 size={18} color="var(--danger-color)" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}