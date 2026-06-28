import React from 'react';
import { Star, Copy, Edit2, Trash2 } from 'lucide-react';

export default function PasswordCard({ p, toggleFavorite, copyToClipboard, startEdit, handleDelete }) {
  return (
    <div className="password-card">
      <div className="card-info">
        <div className="card-icon-wrapper">
          {p.siteName.charAt(0).toUpperCase()}
        </div>
        <div>
          <div className="site-name">{p.siteName}</div>
          <div className="user-name">{p.username}</div>
        </div>
      </div>
      <div className="card-actions">
        <button className="action-btn" onClick={() => toggleFavorite(p.id)}>
          <Star 
            size={18} 
            fill={p.isFavorite ? "var(--warning-color)" : "none"} 
            color={p.isFavorite ? "var(--warning-color)" : "var(--text-secondary)"} 
          />
        </button>
        <button className="action-btn" onClick={() => copyToClipboard(p.password)}>
          <Copy size={18} />
        </button>
        <button className="action-btn" onClick={() => startEdit(p)}>
          <Edit2 size={18} />
        </button>
        <button className="action-btn" onClick={() => handleDelete(p.id, p.siteName)}>
          <Trash2 size={18} color="var(--danger-color)" />
        </button>
      </div>
    </div>
  );
}