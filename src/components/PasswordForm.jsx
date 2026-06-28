import React, { useState } from 'react';
import { Key, Eye, EyeOff } from 'lucide-react';

export default function PasswordForm({
  siteName, setSiteName,
  username, setUsername,
  password, setPassword,
  category, setCategory,
  editingId, setEditingId,
  handleSave, setActiveTab
}) {
  const [showPass, setShowPass] = useState(false);

  const generatePassword = () => {
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";
    let generated = "";
    for (let i = 0; i < 14; i++) {
      generated += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setPassword(generated);
  };

  return (
    <form onSubmit={handleSave}>
      <h2 className="section-title" style={{ marginBottom: '20px' }}>
        {editingId ? 'Şifreyi Düzenle' : 'Yeni Şifre Ekle'}
      </h2>

      <div className="form-group">
        <label>Kategori</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="Genel">Genel</option>
          <option value="Sosyal Medya">Sosyal Medya</option>
          <option value="Banka">Banka</option>
          <option value="Alışveriş">Alışveriş</option>
        </select>
      </div>

      <div className="form-group">
        <label>Site Adı / Uygulama</label>
        <input 
          type="text" 
          placeholder="Örn: google.com" 
          value={siteName} 
          onChange={(e) => setSiteName(e.target.value)} 
        />
      </div>

      <div className="form-group">
        <label>Kullanıcı Adı veya E-posta</label>
        <input 
          type="text" 
          placeholder="Kullanıcı adı girin" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
        />
      </div>

      <div className="form-group">
        <label>Şifre</label>
        <div className="password-input-container">
          <input 
            type={showPass ? "text" : "password"} 
            placeholder="Şifre girin" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />
          <button type="button" className="eye-btn" onClick={() => setShowPass(!showPass)}>
            {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        <div className="generator-box">
          <button type="button" className="btn btn-secondary" style={{ marginTop: 0, padding: '8px' }} onClick={generatePassword}>
            <Key size={14} /> Güçlü Şifre Oluştur
          </button>
        </div>
      </div>

      <button type="submit" className="btn btn-primary">
        {editingId ? 'Değişiklikleri Kaydet' : 'Şifreyi Güvenle Kaydet'}
      </button>

      <button type="button" className="btn btn-secondary" onClick={() => {
        setEditingId(null);
        setSiteName('');
        setUsername('');
        setPassword('');
        setActiveTab('home');
      }}>
        İptal Et
      </button>
    </form>
  );
}