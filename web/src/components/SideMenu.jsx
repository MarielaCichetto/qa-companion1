import { NavLink } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemText, Toolbar } from '@mui/material';

const menuItems = [
  { label: 'Dashboard', path: '/' },
  { label: 'Casos de Prueba', path: '/test-cases' },
  { label: 'Bugs', path: '/bugs' },
  { label: 'Checklists', path: '/checklists' },
  { label: 'API Tester', path: '/api-tester' },
  { label: 'SQL Queries', path: '/sql-queries' },
  { label: 'Reportes', path: '/reports' }
];

const SideMenu = () => (
  <Drawer variant="permanent" sx={{ width: 240, '& .MuiDrawer-paper': { width: 240, boxSizing: 'border-box' } }}>
    <Toolbar />
    <List>
      {menuItems.map((item) => (
        <ListItem
          button
          key={item.path}
          component={NavLink}
          to={item.path}
          sx={{ '&.active': { backgroundColor: 'primary.light', color: 'primary.contrastText' } }}
        >
          <ListItemText primary={item.label} />
        </ListItem>
      ))}
    </List>
  </Drawer>
);

export default SideMenu;
