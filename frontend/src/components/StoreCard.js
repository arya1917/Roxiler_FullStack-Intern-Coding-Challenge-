import React, { useState } from 'react';
import RatingStars from './RatingStars';
import { submitRating } from '../api/api';

export default function StoreCard({ store, onRated }) {
  const [userRating, setUserRating] = useState(store.userRating || 0);
  const [submitting, setSubmitting] = useState(false);

  const handleRate = async (newRating) => {
    setSubmitting(true);
    try {
      await submitRating(store.id, newRating);
      setUserRating(newRating);
      onRated(); // refresh parent list (to update avgRating)
    } catch (err) {
      console.error('Rating failed', err.response?.data || err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ padding: '1rem', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h3>{store.name}</h3>
      <p>{store.address}</p>
      <p>Avg Rating: {store.avgRating?.toFixed(1) || '—'}</p>

      <div style={{ marginTop: '0.5rem' }}>
        <strong>Your Rating:</strong>
        <RatingStars
          value={userRating}
          onChange={handleRate}
          disabled={submitting}
        />
      </div>
    </div>
  );
}
