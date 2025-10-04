import { NavLink } from 'react-router-dom';

const links = [
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/test-cases', label: 'Test Cases' },
  { to: '/bugs', label: 'Bugs' },
  { to: '/checklists', label: 'Checklists' },
  { to: '/api-tester', label: 'API Tester' },
  { to: '/sql-queries', label: 'SQL Queries' },
  { to: '/reports', label: 'Reportes' }
];

const Sidebar = () => (
  <aside className="w-64 bg-slate-900 text-white min-h-screen p-6">
    <h1 className="text-2xl font-semibold mb-6">QA Companion</h1>
    <nav className="space-y-2">
      {links.map((link) => (
        <NavLink
          key={link.to}
          to={link.to}
          className={({ isActive }) =>
            `block rounded px-3 py-2 text-sm font-medium transition hover:bg-slate-700 ${
              isActive ? 'bg-slate-700' : ''
            }`
          }
        >
          {link.label}
        </NavLink>
      ))}
    </nav>
  </aside>
);

export default Sidebar;
