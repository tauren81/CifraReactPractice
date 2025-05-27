import { Outlet } from 'react-router-dom';

import Navbar from './navbar';

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow p-4">
        <Outlet />
      </main>
      <footer className="p-4 text-center bg-gray-100">
        Аггрегатор новостей {new Date().getFullYear()}
      </footer>
    </div>
  );
};

export default Layout;
