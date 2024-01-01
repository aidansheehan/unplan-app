import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faClipboardList, faBook, faBars, faTimes, faScroll, faComments, faChalkboardTeacher, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import SidebarComponent from './sidebar-component';
import ErrorDisplayComponent from './error-display.component';

const NAV_ITEMS = [
  {
    href: '/',
    icon: faHome,
    text: 'Home'
  },
  {
    href: '/plan',
    icon: faChalkboardTeacher,
    text: 'New Lesson Plan'
  },
  {
    href: '/library',
    icon: faBook,
    text: 'Lesson Library'
  },
  {
    href: '/your-lessons',
    icon: faClipboardList,
    text: 'Your Lessons'
  },
  {
    href: '/feedback',
    icon: faComments,
    text: 'Feedback'
  },
  {
    href: '/signup',
    icon: faEnvelope,
    text: 'Join Mailing List'
  },
  {
    href: '/terms',
    icon: faScroll,
    text: 'Terms of Use'
  }
]

const Layout = ({ children, title }) => {
  const APP_TITLE = 'EASY PLAN ESL';
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => setIsNavOpen(!isNavOpen);

  return (
    <div className="flex flex-col min-h-screen relative">
      <header className="bg-blue-500 text-white h-[var(--header-height)] flex justify-between items-center pl-4 pr-4 text-2xl fixed w-full z-10">
        <span className="font-bold font-permanent-marker">{APP_TITLE}</span>
        <button className="p-2 md:hidden" onClick={toggleNav} >
          <FontAwesomeIcon icon={isNavOpen ? faTimes : faBars} className="text-white" />
        </button>
      </header>

      <SidebarComponent navItems={NAV_ITEMS} isNavOpen={isNavOpen} />

      <main className="flex-grow flex flex-col items-center justify-center md:ml-[var(--sidebar-width)] mt-[var(--header-height)] mb-[var(--footer-height)]">
        { title ? <h1 className='text-xl fontsemibold mb-2 mt-8 font-bree' >{title}</h1> : <></> }
        {children}
      </main>

      <footer className="h-[var(--footer-height)] text-center bg-gray-200 flex justify-center items-center absolute w-full bottom-0 z-20 border-t border-gray-300">
        © 2023 Aidan Sheehan
      </footer>
      <ErrorDisplayComponent />
    </div>
  );
};

export default Layout;
