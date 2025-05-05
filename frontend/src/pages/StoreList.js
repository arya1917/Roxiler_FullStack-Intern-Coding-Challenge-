import React, { useState, useEffect } from 'react';
import { getStores } from '../api/api';
import StoreCard from '../components/StoreCard';

export default function StoreList() {
  const [stores, setStores] = useState([]);
  const [filters, setFilters] = useState({ name: '', address: '' });

  const fetchStores = async () => {
    try {
      const res = await getStores(filters);
      setStores(res.data);
    } catch (err) {
      console.error('Error fetching stores', err.response?.data || err);
    }
  };

  useEffect(() => {
    fetchStores();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchStores();
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Store List</h1>
      <form onSubmit={handleSearch} style={{ marginBottom: '1rem' }}>
        <input
          placeholder="Name"
          value={filters.name}
          onChange={e => setFilters({ ...filters, name: e.target.value })}
        />
        <input
          placeholder="Address"
          value={filters.address}
          onChange={e => setFilters({ ...filters, address: e.target.value })}
        />
        <button type="submit">Search</button>
      </form>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(250px,1fr))', gap: '1rem' }}>
        {stores.map(store => (
          <StoreCard key={store.id} store={store} onRated={() => fetchStores()} />
        ))}
      </div>
    </div>
  );
}
