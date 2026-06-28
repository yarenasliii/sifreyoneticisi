// This shows the form for adding new passwords or editing existing ones.
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Key, Eye, EyeOff } from 'lucide-react';
import { addPassword, updatePassword } from '../store/slices/passwordSlice';
import { resetFormData, setEditingId } from '../store/slices/uiSlice';
import { showSuccess, showError } from '../utils/toast';

export default function AddPassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get data from Redux
  const formData = useSelector(state => state.ui.formData);
  const editingId = useSelector(state => state.ui.editingId);
  const passwords = useSelector(state => state.passwords);

  // Local state for form
  const [siteName, setSiteName] = useState('');
  const [siteUrl, setSiteUrl] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [category, setCategory] = useState('Genel');
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  // Calculate password strength
  const calculateStrength = (pwd) => {
    let score = 0;
    if (pwd.length >= 8) score += 20;
    if (pwd.length >= 12) score += 10;
    if (pwd.length >= 16) score += 10;
    if (/[A-Z]/.test(pwd)) score += 20;
    if (/[0-9]/.test(pwd)) score += 20;
    if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(pwd)) score += 20;
    if (/^(.)\1+$/.test(pwd)) score -= 30;
    if (/(?:012|123|234|345|456|567|678|789|890|abc|bcd|cde)/.test(pwd)) score -= 15;
    return Math.min(100, Math.max(0, score));
  };

  // Load form data on component mount (if editing)
  useEffect(() => {
    if (editingId) {
      setSiteName(formData.siteName);
      setSiteUrl(formData.siteUrl);
      setUsername(formData.username);
      setPassword(formData.password);
      setCategory(formData.category);
    }
  }, [editingId, formData]);

  // Update strength when password changes
  useEffect(() => {
    setPasswordStrength(calculateStrength(password));
  }, [password]);

  // Get strength color and label
  const getStrengthLabel = () => {
    if (passwordStrength <= 20) return { label: 'Çok Zayıf', color: 'var(--danger-color)' };
    if (passwordStrength <= 40) return { label: 'Zayıf', color: 'var(--warning-color)' };
    if (passwordStrength <= 60) return { label: 'Orta', color: '#FFA500' };
    if (passwordStrength <= 80) return { label: 'Güçlü', color: 'var(--success-color)' };
    return { label: 'Çok Güçlü', color: '#00C853' };
  };

  const strengthLabel = getStrengthLabel();

  // Generate random password
  const generatePassword = () => {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}";:,.<>?';
    let generated = '';
    for (let i = 0; i < 16; i++) {
      generated += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setPassword(generated);
  };

  // Handle save
  const handleSave = (e) => {
    e.preventDefault();

    // Validation
    if (!siteName || !username || !password) {
    showError('Lütfen tüm gerekli alanları doldurun (Site Adı, Kullanıcı Adı, Şifre)');
    return;
    }

    const passwordData = {
      siteName,
      siteUrl,
      username,
      password,
      category,
    };

    if (editingId) {
    dispatch(updatePassword({ id: editingId, ...passwordData }));
    showSuccess('Şifre başarıyla güncellendi!');
    } else {
    dispatch(addPassword(passwordData));
    showSuccess('Şifre başarıyla kaydedildi!');
    }

    // Reset and go back
    dispatch(resetFormData());
    dispatch(setEditingId(null));
    navigate('/');
  };

  // Handle cancel
  const handleCancel = () => {
    dispatch(resetFormData());
    dispatch(setEditingId(null));
    navigate('/');
  };

  return (
    <form onSubmit={handleSave}>
      <h2 className="section-title" style={{ marginBottom: '20px', marginTop: '0px' }}>
        {editingId ? 'Şifreyi Düzenle' : 'Yeni Şifre Ekle'}
      </h2>

      {/* Category */}
      <div className="form-group">
        <label>Kategori</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="Genel">Genel</option>
          <option value="Sosyal Medya">Sosyal Medya</option>
          <option value="Banka">Banka</option>
          <option value="Alışveriş">Alışveriş</option>
        </select>
      </div>

      {/* Site Name */}
      <div className="form-group">
        <label>Site Adı / Uygulama *</label>
        <input
          type="text"
          placeholder="Örn: Google, Netflix"
          value={siteName}
          onChange={(e) => setSiteName(e.target.value)}
        />
      </div>

      {/* Site URL (optional) */}
      <div className="form-group">
        <label>Site URL (İsteğe Bağlı)</label>
        <input
          type="url"
          placeholder="Örn: https://google.com"
          value={siteUrl}
          onChange={(e) => setSiteUrl(e.target.value)}
        />
      </div>

      {/* Username */}
      <div className="form-group">
        <label>Kullanıcı Adı / E-posta *</label>
        <input
          type="text"
          placeholder="Kullanıcı adınızı girin"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>

      {/* Password */}
      <div className="form-group">
        <label>Şifre *</label>
        <div className="password-input-container">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Şifrenizi girin"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            className="eye-btn"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        {/* Password Strength Indicator */}
        {password && (
          <div style={{ marginTop: '8px' }}>
            <div
              style={{
                height: '6px',
                backgroundColor: 'var(--border-color)',
                borderRadius: '3px',
                overflow: 'hidden',
                marginBottom: '4px',
              }}
            >
              <div
                style={{
                  height: '100%',
                  width: `${passwordStrength}%`,
                  backgroundColor: strengthLabel.color,
                  transition: 'width 0.3s',
                }}
              />
            </div>
            <div style={{ fontSize: '12px', color: strengthLabel.color }}>
              Şifre Gücü: {strengthLabel.label}
            </div>
          </div>
        )}

        {/* Password Generator */}
        <div className="generator-box">
          <button
            type="button"
            className="btn btn-secondary"
            style={{ marginTop: 0, padding: '8px', fontSize: '14px' }}
            onClick={generatePassword}
          >
            <Key size={14} /> Güçlü Şifre Oluştur
          </button>
        </div>
      </div>

      {/* Save Button */}
      <button type="submit" className="btn btn-primary">
        {editingId ? 'Değişiklikleri Kaydet' : 'Şifreyi Güvenle Kaydet'}
      </button>

      {/* Cancel Button */}
      <button type="button" className="btn btn-secondary" onClick={handleCancel}>
        İptal Et
      </button>
    </form>
  );
}