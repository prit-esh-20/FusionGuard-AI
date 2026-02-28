import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import DashboardLayout from './layouts/DashboardLayout';
import Landing from './pages/public/Landing';
import Architecture from './pages/public/Architecture';
import MachineLearning from './pages/public/MachineLearning';
import ExperimentalResults from './pages/public/ExperimentalResults';
import ResearchPaper from './pages/public/ResearchPaper';
import Login from './pages/auth/Login';
import UserDashboard from './pages/dashboards/UserDashboard';
import AdminDashboard from './pages/dashboards/AdminDashboard';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Landing />} />
            <Route path="architecture" element={<Architecture />} />
            <Route path="machine-learning" element={<MachineLearning />} />
            <Route path="experimental-results" element={<ExperimentalResults />} />
            <Route path="research-paper" element={<ResearchPaper />} />
            <Route path="login" element={<Login />} />
          </Route>

          {/* User Dashboard */}
          <Route path="/user" element={<ProtectedRoute allowedRoles={['user', 'admin']}><DashboardLayout role="user" /></ProtectedRoute>}>
            <Route path="dashboard" element={<UserDashboard />} />
            <Route index element={<Navigate to="dashboard" replace />} />
          </Route>

          {/* Admin Dashboard */}
          <Route path="/admin" element={<ProtectedRoute allowedRoles={['admin']}><DashboardLayout role="admin" /></ProtectedRoute>}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route index element={<Navigate to="dashboard" replace />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
