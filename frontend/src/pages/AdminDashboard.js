import React, { useEffect, useState } from 'react';
import { getAllUsers, getAllStores, deleteUser, deleteStore } from '../api/api';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [stores, setStores] = useState([]);

  const fetchData = async () => {
    try {
      const userRes = await getAllUsers();
      setUsers(userRes.data);

      const storeRes = await getAllStores();
      setStores(storeRes.data);
    } catch (err) {
      console.error('Failed to load admin data', err.response?.data || err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDeleteUser = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await deleteUser(id);
        setUsers(users.filter(user => user.id !== id));
      } catch (err) {
        console.error('Failed to delete user', err.response?.data || err);
      }
    }
  };

  const handleDeleteStore = async (id) => {
    if (window.confirm('Are you sure you want to delete this store?')) {
      try {
        await deleteStore(id);
        setStores(stores.filter(store => store.id !== id));
      } catch (err) {
        console.error('Failed to delete store', err.response?.data || err);
      }
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Admin Dashboard</h1>

      <section style={{ marginTop: '2rem' }}>
        <h2>All Users</h2>
        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>ID</th>
              <th>Email</th>
              <th>Role</th>
              <th>Created At</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>{new Date(user.created_at).toLocaleString()}</td>
                <td>
                  <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section style={{ marginTop: '2rem' }}>
        <h2>All Stores</h2>
        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Owner</th>
              <th>Average Rating</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {stores.map(store => (
              <tr key={store.id}>
                <td>{store.id}</td>
                <td>{store.name}</td>
                <td>{store.owner_username}</td>
                <td>{store.average_rating ? store.average_rating.toFixed(2) : 'No ratings yet'}</td>
                <td>
                  <button onClick={() => handleDeleteStore(store.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default AdminDashboard;
