import Sidebar from './Sidebar';

const Layout = ({ children }) => (
  <div className="flex bg-slate-100 min-h-screen">
    <Sidebar />
    <main className="flex-1 p-8 overflow-y-auto">{children}</main>
  </div>
);

export default Layout;
