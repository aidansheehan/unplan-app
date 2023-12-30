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
  const APP_TITLE = title || 'ESL EasyPlan';
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => setIsNavOpen(!isNavOpen);

  return (
    <div className="grid grid-rows-layout grid-cols-layout min-h-screen">
      <header className="col-start-1 col-end-3 row-start-1 bg-blue-500 p-4 text-white">
        <h1 className="text-2xl font-bold">{title || 'ESL EasyPlan'}</h1>
        <p>Effortless Lesson Planning for ESL Teachers</p>
        {/* ... other header content */}
      </header>

      <SidebarComponent navItems={NAV_ITEMS} />

      {/* <nav className={`absolute top-full left-0 w-full bg-blue-600 p-4 md:p-0 md:static md:flex ${isNavOpen ? 'block' : 'hidden'} transition-all ease-in-out duration-300`}>
        <ul className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-6">
          <li className="hover:text-blue-300 transition-colors duration-200">
            <Link href="/"><FontAwesomeIcon icon={faHome} fixedWidth /> Home</Link>
          </li>
          <li className="hover:text-blue-300 transition-colors duration-200">
            <Link href="/plan"><FontAwesomeIcon icon={faClipboardList} fixedWidth /> Plan</Link>
          </li>
          <li className="hover:text-blue-300 transition-colors duration-200">
            <Link href="/library"><FontAwesomeIcon icon={faBook} fixedWidth /> Library</Link>
          </li>
          <li className="hover:text-blue-300 transition-colors duration-200">
            <Link href="/terms"><FontAwesomeIcon icon={faScroll} fixedWidth /> Terms</Link>
          </li>
          <li className="hover:text-blue-300 transition-colors duration-200">
            <Link href="/feedback"><FontAwesomeIcon icon={faComments} fixedWidth /> Feedback</Link>
          </li>
        </ul>
      </nav> */}

      <main className="row-start-2 row-end-3 col-start-2 col-end-3 p-4">
        {children}
      </main>

      <footer className="col-start-1 col-end-3 row-start-3 bg-gray-200 p-4 text-center">
        © 2023 Aidan Sheehan
      </footer>
    </div>
  );
};

export default Layout;
