import clsx from 'clsx';
import { NavLink, Outlet, useLocation } from 'react-router-dom';

import SystemeIoLogo from '@assets/systeme-io-logo.svg';
import { routesMap } from '@shared/config';

export const MainLayout = () => {
  return (
    <>
      <Header />
      <main className="layout">
        <Outlet />
      </main>
    </>
  );
};

const links = [
  {
    path: routesMap.products,
    label: 'Products',
  },
  {
    path: routesMap.pricePlans,
    label: 'Price plans',
  },
  {
    path: routesMap.systemePages,
    label: 'Pages',
  },
];

function Header() {
  const { pathname } = useLocation();

  return (
    <header className={clsx('mb-2 border-b-2', 'sticky left-0 top-0 bg-white')}>
      <div className="layout flex justify-between items-center">
        <SystemeIoLogo width={100} height={25} />
        <nav className="flex gap-6">
          {links.map(({ path, label }) => (
            <NavLink
              key={path}
              to={path}
              className={clsx({ 'text-blue-600': pathname === path })}
            >
              {label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
