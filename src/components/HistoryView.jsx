import React from 'react';
<<<<<<< HEAD
import { useSelector } from 'react-redux';

export default function HistoryView() {
  // Get passwords from Redux
  const passwords = useSelector(state => state.passwords);

  // Sort passwords by last used date (newest first)
  const sortedPasswords = [...passwords].sort((a, b) => {
    return new Date(b.lastUsedTimestamp) - new Date(a.lastUsedTimestamp);
  });

  // Format date
  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleDateString('tr-TR') + ' ' + date.toLocaleTimeString('tr-TR');
  };

  return (
    <>
      <h2 className="section-title">Şifre Geçmişi</h2>

      {sortedPasswords.length === 0 ? (
        <div className="empty-state">Henüz hiç şifre kaydı yok.</div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {sortedPasswords.map(password => (
            <div
              key={password.id}
              style={{
                padding: '12px',
                borderRadius: '8px',
                backgroundColor: 'var(--bg-secondary)',
                border: '1px solid var(--border-color)',
                fontSize: '13px',
              }}
            >
              {/* Site and username */}
              <div style={{ fontWeight: '500', marginBottom: '4px' }}>
                {password.siteName} - {password.username}
              </div>

              {/* Created date */}
              <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginBottom: '4px' }}>
                📅 Oluşturuldu: {formatDate(password.createdAt)}
              </div>

              {/* Last used date */}
              <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginBottom: '4px' }}>
                🕐 Son Kullanım: {formatDate(password.lastUsedTimestamp)}
              </div>

              {/* Security score */}
              <div style={{ fontSize: '11px', marginBottom: '4px' }}>
                <span
                  style={{
                    color:
                      password.securityScore < 50
                        ? 'var(--danger-color)'
                        : 'var(--success-color)',
                  }}
                >
                  🔒 Güvenlik: %{password.securityScore}
                </span>
              </div>

              {/* Category */}
              <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>
                📂 Kategori: {password.category}
              </div>

              {/* Password history */}
              {password.passwordHistory && password.passwordHistory.length > 1 && (
                <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '8px' }}>
                  💾 Önceki Sürümler: {password.passwordHistory.length}
                </div>
              )}
            </div>
          ))}
=======

export default function HistoryView({ history, setHistory }) {
  return (
    <>
      <h2 className="section-title">İşlem Geçmişi</h2>
      {history.length === 0 ? (
        <div className="empty-state">Henüz bir işlem kaydı yok.</div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {history.map(log => (
            <div key={log.id} style={{ padding: '12px', borderRadius: '8px', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', fontSize: '13px' }}>
              <div style={{ fontWeight: '500' }}>{log.action}</div>
              <div style={{ fontSize: '11px', color: 'var(--text-secondary)', marginTop: '4px' }}>{log.time}</div>
            </div>
          ))}
          <button className="btn btn-secondary" onClick={() => { setHistory([]); localStorage.removeItem('google_clone_history'); }}>
            Geçmişi Temizle
          </button>
>>>>>>> c9fead54b3cdf62368ab400d06cf5ce1ffb70f39
        </div>
      )}
    </>
  );
}