import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faClipboardList, faBook, faBars, faTimes, faScroll, faComments, faChalkboardTeacher, faEnvelope, faTasks } from '@fortawesome/free-solid-svg-icons';
import SidebarComponent from './sidebar-component';
import ErrorDisplayComponent from './error-display.component';
import Link from 'next/link';

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
    href: '/activities',
    icon: faTasks,
    text: 'Classroom Activities'
  },
  {
    href: '/your-lessons',
    icon: faClipboardList,
    text: 'Your Lessons'
  },
  {
    href: '/library',
    icon: faBook,
    text: 'Lesson Library'
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
    text: 'Terms of Use',
    mobileOnly: true
  }
]

const Layout = ({ children, title }) => {
  const APP_TITLE = 'EASY PLAN ESL';
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => setIsNavOpen(!isNavOpen);

  return (
    <div className="flex flex-col min-h-screen relative">
      <header className="bg-blue-500 text-white h-[var(--header-height)] flex justify-between items-center pl-4 pr-4 text-2xl fixed w-full z-10 shadow-bottom">
        <span className="font-bold font-permanent-marker text-[#F8F8FF]">{APP_TITLE}</span>
        <button className="p-2 md:hidden" onClick={toggleNav} >
          <FontAwesomeIcon icon={isNavOpen ? faTimes : faBars} className="text-white" />
        </button>
      </header>

      <SidebarComponent navItems={NAV_ITEMS} isNavOpen={isNavOpen} />

      <main className="flex-grow flex flex-col items-center justify-center md:ml-[var(--sidebar-width)] mt-[var(--header-height)] mb-[var(--footer-height)] bg-white">
        { title ? <h1 className='text-2xl font-bold mb-2 mt-8' >{title}</h1> : <></> }
        {children}
      </main>

      <footer className="h-[var(--footer-height)] text-center bg-gray-200 flex justify-center items-center absolute w-full bottom-0 z-20 border-t border-gray-300 px-4 md:px-20">
      <Link href="/terms" className="text-blue-500 hover:text-blue-700 hover:underline hidden md:block absolute right-7">
            Terms of Use
        </Link>
        
        <span className="text-gray-600" >
          © 2024 Aidan Sheehan
        </span>
      </footer>
      <ErrorDisplayComponent />
    </div>
  );
};

export default Layout;
