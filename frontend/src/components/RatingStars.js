import React from 'react';

export default function RatingStars({ value, onChange, disabled }) {
  return (
    <div style={{ cursor: disabled ? 'not-allowed' : 'pointer' }}>
      {[1,2,3,4,5].map(n => (
        <span
          key={n}
          onClick={() => !disabled && onChange(n)}
          style={{ fontSize: '1.5rem', color: n <= value ? '#f5a623' : '#ccc' }}
        >
          {n <= value ? '★' : '☆'}
        </span>
      ))}
    </div>
  );
}
