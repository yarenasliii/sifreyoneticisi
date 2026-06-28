import React from 'react';
<<<<<<< HEAD
import { useDispatch, useSelector } from 'react-redux';
import { Download, Upload, Trash2 } from 'lucide-react';
import { importPasswords, clearAllPasswords } from '../store/slices/passwordSlice';
import { showSuccess, showError, showWarning } from '../utils/toast';

export default function SettingsView() {
  const dispatch = useDispatch();
  const passwords = useSelector(state => state.passwords);

  // Handle export
  const handleExport = () => {
    if (passwords.length === 0) {
      showWarning('Dışa aktarmak için en az bir şifre kayıtlı olmalıdır!');
      return;
    }

    const dataStr = JSON.stringify(passwords, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `passwords_backup_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    showSuccess('Şifreler başarıyla dışa aktarıldı!');
  };

  // Handle import
  const handleImport = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const imported = JSON.parse(event.target?.result);

        // Validate structure
        if (!Array.isArray(imported)) {
          throw new Error('Dosya geçersiz formatta!');
        }

        dispatch(importPasswords(imported));
        showSuccess(`${imported.length} şifre başarıyla içe aktarıldı!`);
      } catch (error) {
        alert('Dosya içe aktarılırken hata oluştu: ' + error.message);
      }
    };

    reader.readAsText(file);
  };

  // Handle clear all
  const handleClearAll = () => {
    const confirmed = window.confirm(
      'TÜM ŞİFRELERİ SİLECEKSİNİZ! Bu işlem geri alınamaz. Devam etmek istiyor musunuz?'
    );

    if (confirmed) {
      const doubleConfirmed = window.confirm('Son kez soruyor: Devam etmek istiyor musunuz?');

      if (doubleConfirmed) {
        dispatch(clearAllPasswords());
        alert('Tüm şifreler silindi!');
      }
    }
  };

  return (
    <>
      <h2 className="section-title">Uygulama Ayarları</h2>

      {/* Offline Mode */}
      <div className="settings-item">
        <div>
          <div style={{ fontWeight: '500' }}>📡 Çevrimdışı Mod</div>
          <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
            İnternet bağlantısı olmadan çalışır
          </div>
        </div>
        <span style={{ color: 'var(--success-color)', fontSize: '13px', fontWeight: 'bold' }}>
          ✓ Aktif
        </span>
      </div>

      {/* Saved Passwords Count */}
      <div className="settings-item">
        <div>
          <div style={{ fontWeight: '500' }}>🔐 Kayıtlı Şifreler</div>
          <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
            Toplam {passwords.length} hesap kaydı
          </div>
        </div>
        <span style={{ color: 'var(--accent-color)', fontSize: '13px', fontWeight: 'bold' }}>
          {passwords.length}
        </span>
      </div>

      {/* Export Data */}
      <div className="settings-item">
        <div>
          <div style={{ fontWeight: '500' }}>💾 Verileri Dışa Aktar</div>
          <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
            Tüm şifreleri JSON dosyası olarak indir
          </div>
        </div>
        <button
          className="action-btn"
          onClick={handleExport}
          title="Dışa aktar"
        >
=======
import { Download, Upload } from 'lucide-react';

export default function SettingsView({ exportData, importData }) {
  return (
    <>
      <h2 className="section-title">Uygulama Ayarları</h2>
      
      <div className="settings-item">
        <div>
          <div style={{ fontWeight: '500' }}>Çevrimdışı Mod</div>
          <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>İnternet gerekmeden yerel çalışır</div>
        </div>
        <span style={{ color: 'var(--success-color)', fontSize: '13px', fontWeight: 'bold' }}>Aktif</span>
      </div>

      <div className="settings-item">
        <div>
          <div style={{ fontWeight: '500' }}>Verileri Dışa Aktar</div>
          <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Tüm şifreleri JSON dosyası olarak indir</div>
        </div>
        <button className="action-btn" onClick={exportData}>
>>>>>>> c9fead54b3cdf62368ab400d06cf5ce1ffb70f39
          <Download size={20} color="var(--accent-color)" />
        </button>
      </div>

<<<<<<< HEAD
      {/* Import Data */}
      <div className="settings-item">
        <div>
          <div style={{ fontWeight: '500' }}>📂 Verileri İçe Aktar</div>
          <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
            Yedek dosyasından şifreleri yükle
          </div>
        </div>
        <label className="file-input-label" style={{ cursor: 'pointer' }}>
          <Upload size={20} />
          <input
            type="file"
            accept=".json"
            onChange={handleImport}
            style={{ display: 'none' }}
          />
        </label>
      </div>

      {/* Danger Zone */}
      <div style={{ marginTop: '30px', paddingTop: '20px', borderTop: '1px solid var(--border-color)' }}>
        <h3
          style={{
            fontSize: '14px',
            fontWeight: '500',
            color: 'var(--danger-color)',
            marginBottom: '12px',
          }}
        >
          ⚠️ Tehlikeli İşlemler
        </h3>

        {/* Clear All */}
        <div className="settings-item">
          <div>
            <div style={{ fontWeight: '500', color: 'var(--danger-color)' }}>
              🗑️ Tüm Şifreleri Sil
            </div>
            <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
              Tüm kayıtlı şifreleri kalıcı olarak silin
            </div>
          </div>
          <button
            className="action-btn"
            onClick={handleClearAll}
            title="Tüm şifreleri sil"
          >
            <Trash2 size={20} color="var(--danger-color)" />
          </button>
        </div>
      </div>

      {/* App Info */}
      <div
        style={{
          marginTop: '30px',
          textAlign: 'center',
          fontSize: '12px',
          color: 'var(--text-secondary)',
          paddingBottom: '20px',
        }}
      >
        <div>Google Şifre Yöneticisi Clone v1.0.0</div>
        <div style={{ marginTop: '8px' }}>Redux + React Router</div>
        <div style={{ marginTop: '8px', fontSize: '11px' }}>
          © 2026 Şifre Yöneticisi. Tüm hakları saklıdır.
        </div>
=======
      <div className="settings-item">
        <div>
          <div style={{ fontWeight: '500' }}>Verileri İçe Aktar</div>
          <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Yedek dosyandan şifreleri yükle</div>
        </div>
        <label className="file-input-label">
          <Upload size={20} />
          <input type="file" accept=".json" onChange={importData} style={{ display: 'none' }} />
        </label>
      </div>

      <div style={{ marginTop: '30px', textAlign: 'center', fontSize: '12px', color: 'var(--text-secondary)' }}>
        Google Password Manager Clone v1.0.0
>>>>>>> c9fead54b3cdf62368ab400d06cf5ce1ffb70f39
      </div>
    </>
  );
}