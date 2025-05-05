import React, { useEffect, useState } from 'react';
import { getMyStores, deleteStore } from '../api/api';

const OwnerDashboard = () => {
  const [stores, setStores] = useState([]);

  const fetchStores = async () => {
    try {
      const res = await getMyStores();
      setStores(res.data);
    } catch (err) {
      console.error('Error fetching stores', err.response?.data || err);
    }
  };

  useEffect(() => {
    fetchStores();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Delete this store?')) {
      try {
        await deleteStore(id);
        setStores(stores.filter(store => store.id !== id));
      } catch (err) {
        console.error('Error deleting store', err.response?.data || err);
      }
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Owner Dashboard</h1>
      <h2>Your Stores</h2>
      {stores.length === 0 ? (
        <p>No stores found.</p>
      ) : (
        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Average Rating</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {stores.map(store => (
              <tr key={store.id}>
                <td>{store.id}</td>
                <td>{store.name}</td>
                <td>{store.average_rating ? store.average_rating.toFixed(2) : 'No ratings yet'}</td>
                <td>
                  <button onClick={() => handleDelete(store.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default OwnerDashboard;
