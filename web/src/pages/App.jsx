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

const App = () => (
  <Routes>
    <Route path="/login" element={<LoginPage />} />
    <Route
      path="/"
      element={
        <Layout>
          <DashboardPage />
        </Layout>
      }
    />
    <Route
      path="/dashboard"
      element={
        <Layout>
          <DashboardPage />
        </Layout>
      }
    />
    <Route
      path="/user-stories"
      element={
        <Layout>
          <UserStoriesPage />
        </Layout>
      }
    />
    <Route
      path="/test-cases"
      element={
        <Layout>
          <TestCasesPage />
        </Layout>
      }
    />
    <Route
      path="/bugs"
      element={
        <Layout>
          <BugsPage />
        </Layout>
      }
    />
    <Route
      path="/tasks"
      element={
        <Layout>
          <TasksPage />
        </Layout>
      }
    />
    <Route
      path="/reports"
      element={
        <Layout>
          <ReportsPage />
        </Layout>
      }
    />
    <Route
      path="/settings"
      element={
        <Layout>
          <SettingsPage />
        </Layout>
      }
    />
    <Route path="*" element={<Navigate to="/login" replace />} />
  </Routes>
);

export default App;
