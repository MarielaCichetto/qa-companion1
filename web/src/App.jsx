import { useMemo } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { CssBaseline, Box } from '@mui/material';
import NavBar from './components/NavBar';
import SideMenu from './components/SideMenu';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import TestCases from './pages/TestCases';
import Bugs from './pages/Bugs';
import Checklists from './pages/Checklists';
import ApiTester from './pages/ApiTester';
import SqlQueries from './pages/SqlQueries';
import Reports from './pages/Reports';
import useAuth from './hooks/useAuth';

const protectedRoutes = [
  { path: '/', element: <Dashboard /> },
  { path: '/test-cases', element: <TestCases /> },
  { path: '/bugs', element: <Bugs /> },
  { path: '/checklists', element: <Checklists /> },
  { path: '/api-tester', element: <ApiTester /> },
  { path: '/sql-queries', element: <SqlQueries /> },
  { path: '/reports', element: <Reports /> }
];

const App = () => {
  const { isAuthenticated } = useAuth();

  const layout = useMemo(() => {
    if (!isAuthenticated) {
      return <Login />;
    }

    return (
      <Box sx={{ display: 'flex', height: '100vh' }}>
        <SideMenu />
        <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
          <NavBar />
          <Box component="main" sx={{ flexGrow: 1, p: 3, overflow: 'auto' }}>
            <Routes>
              {protectedRoutes.map((route) => (
                <Route key={route.path} path={route.path} element={route.element} />
              ))}
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </Box>
        </Box>
      </Box>
    );
  }, [isAuthenticated]);

  return (
    <>
      <CssBaseline />
      {layout}
    </>
  );
};

export default App;
