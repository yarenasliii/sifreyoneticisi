import React from 'react';

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
        </div>
      )}
    </>
  );
}