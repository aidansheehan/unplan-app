// import Link from 'next/link';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faClipboardList, faBook, faBars, faTimes, faScroll, faComments } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

const Layout = ({ children, title }) => {
  const APP_TITLE = title || 'ESL EasyPlan';
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => setIsNavOpen(!isNavOpen);

  return (
    <div className="flex flex-col min-h-screen">
      <header className="text-center p-4 bg-blue-500 text-white">
        <h1 className="text-2xl font-bold">{APP_TITLE}</h1>
        <p className="hidden md:block">Effortless Lesson Planning for ESL Teachers</p>
        <button className="absolute top-4 right-4 md:hidden" onClick={toggleNav}>
          <FontAwesomeIcon icon={isNavOpen ? faTimes : faBars} size="lg" />
        </button>
      </header>

      <nav className={`absolute top-full left-0 w-full bg-blue-600 p-4 md:p-0 md:static md:flex ${isNavOpen ? 'block' : 'hidden'} transition-all ease-in-out duration-300`}>
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
      </nav>

      <main className="flex-grow flex items-center justify-center">
        {children}
      </main>

      <footer className="text-center p-4 bg-gray-200">
        © 2023 Aidan Sheehan
      </footer>
    </div>
  );
};

export default Layout;
