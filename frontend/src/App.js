import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AdminDashboard from './pages/AdminDashboard';
import OwnerDashboard from './pages/OwnerDashboard';
import StoreList from './pages/StoreList';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute roles={['admin']} />}>
            <Route path="/admin" element={<AdminDashboard />} />
          </Route>

          <Route element={<ProtectedRoute roles={['owner']} />}>
            <Route path="/owner" element={<OwnerDashboard />} />
          </Route>

          <Route element={<ProtectedRoute roles={['user']} />}>
            <Route path="/user" element={<StoreList />} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
