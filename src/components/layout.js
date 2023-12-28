// import Link from 'next/link';

const Layout = ({ children, title }) => {
  const APP_TITLE = title || 'ESL EasyPlan';

  return (
    <div className="flex flex-col min-h-screen">
      <header className="text-center p-4 bg-blue-500 text-white">
        <h1 className="text-2xl font-bold">{APP_TITLE}</h1>
        <p>Effortless Lesson Planning for ESL Teachers</p>
      </header>
      
      <main className="flex-grow p-4">
        {children}
      </main>
      
      <footer className="text-center p-4 bg-gray-200">
        © 2023 Aidan Sheehan
      </footer>
    </div>
  );
};

export default Layout;
