import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from '../components/Layout';
import LoginPage from './LoginPage';
import DashboardPage from './DashboardPage';
import TestCasesPage from './TestCasesPage';
import BugsPage from './BugsPage';
import ChecklistsPage from './ChecklistsPage';
import ApiTesterPage from './ApiTesterPage';
import SqlQueriesPage from './SqlQueriesPage';
import ReportsPage from './ReportsPage';

const App = () => {
  return (
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
        path="/checklists"
        element={
          <Layout>
            <ChecklistsPage />
          </Layout>
        }
      />
      <Route
        path="/api-tester"
        element={
          <Layout>
            <ApiTesterPage />
          </Layout>
        }
      />
      <Route
        path="/sql-queries"
        element={
          <Layout>
            <SqlQueriesPage />
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
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default App;
