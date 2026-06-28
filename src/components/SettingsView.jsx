import React from 'react';
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
          <Download size={20} color="var(--accent-color)" />
        </button>
      </div>

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
      </div>
    </>
  );
}