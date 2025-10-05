import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from '../components/Layout';
import LoginPage from './LoginPage';
import DashboardPage from './DashboardPage';
import TestCasesPage from './TestCasesPage';
import BugsPage from './BugsPage';
import TasksPage from './TasksPage';
import ReportsPage from './ReportsPage';
import UserStoriesPage from './UserStoriesPage';
import SettingsPage from './SettingsPage';
import { useAuthStore } from '../store/useAuthStore';

const FullScreenLoader = () => (
  <div className="flex min-h-screen items-center justify-center bg-carbon text-slate-200">
    <div className="h-12 w-12 animate-spin rounded-full border-4 border-cobalt/40 border-t-neon" aria-label="Loading" />
  </div>
);

const RequireAuth = ({ children }) => {
  const { user, hydrated } = useAuthStore((state) => ({ user: state.user, hydrated: state.hydrated }));

  if (!hydrated) {
    return <FullScreenLoader />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

const App = () => (
  <Routes>
    <Route path="/login" element={<LoginPage />} />
    <Route
      element={
        <RequireAuth>
          <Layout />
        </RequireAuth>
      }
    >
      <Route index element={<DashboardPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/user-stories" element={<UserStoriesPage />} />
      <Route path="/test-cases" element={<TestCasesPage />} />
      <Route path="/bugs" element={<BugsPage />} />
      <Route path="/tasks" element={<TasksPage />} />
      <Route path="/reports" element={<ReportsPage />} />
      <Route path="/settings" element={<SettingsPage />} />
    </Route>
    <Route path="*" element={<Navigate to="/login" replace />} />
  </Routes>
);

export default App;
