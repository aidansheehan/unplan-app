import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faClipboardList, faBook, faBars, faTimes, faScroll, faComments } from '@fortawesome/free-solid-svg-icons';
// import Link from 'next/link';
import SidebarComponent from './sidebar-component';

const NAV_ITEMS = [
  {
    href: '/',
    icon: faHome,
    text: 'Home'
  },
  {
    href: '/plan',
    icon: faClipboardList,
    text: 'Plan'
  },
  {
    href: '/library',
    icon: faBook,
    text: 'Lesson Library'
  },
  {
    href: '/terms',
    icon: faScroll,
    text: 'Terms'
  },
  {
    href: '/feedback',
    icon: faComments,
    text: 'Feedback'
  }
]

const Layout = ({ children, title }) => {
  const APP_TITLE = 'EASY PLAN ESL';
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => setIsNavOpen(!isNavOpen);

  return (
    <div className="grid grid-rows-layout grid-cols-layout min-h-screen">
      <header className="col-start-1 col-end-3 row-start-1 bg-blue-500 p-4 text-white">
        <h1 className="text-2xl font-bold font-permanent-marker">{APP_TITLE}</h1>
      </header>

      <SidebarComponent navItems={NAV_ITEMS} />

      <main className="row-start-2 row-end-3 col-start-2 col-end-3 p-4">
        <h2>{title}</h2>
        {children}
      </main>

      <footer className="col-start-1 col-end-3 row-start-3 bg-gray-200 p-4 text-center">
        © 2023 Aidan Sheehan
      </footer>
    </div>
  );
};

export default Layout;
