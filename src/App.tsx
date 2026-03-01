import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Landing from './pages/public/Landing';
import Architecture from './pages/public/Architecture';
import Alerts from './pages/public/Alerts';
import Results from './pages/public/Results';
import About from './pages/public/About';
import Login from './pages/auth/Login';
import UserDashboard from './pages/dashboards/UserDashboard';
import AdminDashboard from './pages/dashboards/AdminDashboard';
import { AuthProvider } from './context/AuthContext';
import { SystemProvider } from './context/SystemContext';
import RoleProtectedRoute from './components/RoleProtectedRoute';

import SystemControls from './pages/admin/SystemControls';
import Settings from './pages/admin/Settings';
import UserManagement from './pages/admin/UserManagement';

function App() {
  return (
    <AuthProvider>
      <SystemProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              {/* Public Routes */}
              <Route index element={<Landing />} />
              <Route path="architecture" element={<Architecture />} />
              <Route path="about" element={<About />} />
              <Route path="login" element={<Login />} />

              {/* User Routes */}
              <Route path="dashboard" element={<RoleProtectedRoute allowedRoles={['user']}><UserDashboard /></RoleProtectedRoute>} />
              <Route path="alerts" element={<RoleProtectedRoute allowedRoles={['user']}><Alerts /></RoleProtectedRoute>} />
              <Route path="results" element={<RoleProtectedRoute allowedRoles={['user']}><Results /></RoleProtectedRoute>} />

              {/* Admin Routes */}
              <Route path="admin" element={<Navigate to="/admin/dashboard" replace />} />
              <Route path="admin/dashboard" element={<RoleProtectedRoute allowedRoles={['admin']}><AdminDashboard /></RoleProtectedRoute>} />
              <Route path="admin/alerts" element={<RoleProtectedRoute allowedRoles={['admin']}><Alerts /></RoleProtectedRoute>} />
              <Route path="admin/results" element={<RoleProtectedRoute allowedRoles={['admin']}><Results /></RoleProtectedRoute>} />
              <Route path="admin/system-controls" element={<RoleProtectedRoute allowedRoles={['admin']}><SystemControls /></RoleProtectedRoute>} />
              <Route path="admin/settings" element={<RoleProtectedRoute allowedRoles={['admin']}><Settings /></RoleProtectedRoute>} />
              <Route path="admin/user-management" element={<RoleProtectedRoute allowedRoles={['admin']}><UserManagement /></RoleProtectedRoute>} />
            </Route>

            {/* Fallbacks */}
            <Route path="/user/dashboard" element={<Navigate to="/dashboard" replace />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </SystemProvider>
    </AuthProvider>
  );
}

export default App;
