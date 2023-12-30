import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLaptopCode, faBookOpen, faClock, faPrint } from '@fortawesome/free-solid-svg-icons';
import Layout from '@/components/layout';

export default function Home() {
  return (
    <Layout>
      {/* Features Section */}
      <section className="flex-grow flex flex-col justify-center items-center bg-blue-50">
        <div className="text-center py-8 px-4">
          <h2 className="text-2xl font-semibold text-blue-700 mb-4">Why Choose EASY PLAN ESL?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {FeatureCard(faLaptopCode, 'Quick Lesson Generation', 'Generate custom lesson plans quickly with just a few clicks.', 'bg-orange-100', 'text-orange-500')}
            {FeatureCard(faBookOpen, 'Diverse Materials', 'Access a variety of ESL teaching materials for different levels and topics.', 'bg-green-100', 'text-green-500')}
            {FeatureCard(faClock, 'Save Time', 'Streamline your planning process to save time and enhance your teaching experience.', 'bg-orange-100', 'text-orange-500')}
            {FeatureCard(faPrint, 'Easy Printing', 'Effortlessly print your lesson materials ready for the classroom.', 'bg-green-100', 'text-green-500')}
          </div>
        </div>

        {/* Library Section */}
        <div className="w-full text-center py-8 bg-blue-200">
          <h3 className="text-2xl font-semibold text-blue-800 mb-4">Explore Our Lesson Library</h3>
          <p className="mb-4 text-blue-700">Browse through a curated selection of ready-to-use lesson plans.</p>
          <Link href="/library" className="inline-block bg-green-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-green-700 transition-colors duration-300">
              Visit Library
          </Link>
        </div>
      </section>
    </Layout>
  );
}

function FeatureCard(icon, title, description, bgColor, iconColor) {
  return (
    <div className={`rounded-xl p-6 shadow-lg bg-white`}>
      <div className={`p-4 inline-flex rounded-full ${bgColor} mb-4`}>
        <FontAwesomeIcon icon={icon} className={iconColor} size="2x" />
      </div>
      <h4 className="mb-2 font-semibold text-lg text-gray-800">{title}</h4>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}



// export default function Home() {
//   return (
//     <div className="flex flex-col min-h-screen">
//       <header className="text-center p-4 bg-blue-500 text-white">
//         <h1 className="text-2xl font-bold">{APP_TITLE}</h1>
//         <p>Effortless Lesson Planning for ESL Teachers</p>
//       </header>
      
//       <main className="flex-grow p-4">
//         <section className="h-full flex flex-col justify-center">
//           <h2 className="text-xl font-semibold text-center mb-4">Why Choose {APP_TITLE}?</h2>
//           <ul className="list-disc pl-5 space-y-2 text-center">
//             <li>Generate custom lesson plans quickly</li>
//             <li>Access a variety of ESL teaching materials</li>
//             <li>Save time and enhance your teaching experience</li>
//           </ul>
//         </section>
//       </main>
      
//       <div className="text-center p-4">
//         <Link href="/plan" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
//           Get Started
//         </Link>
//       </div>
      
//       <footer className="text-center p-4 bg-gray-200">
//         © 2023 Aidan Sheehan
//       </footer>
//     </div>
//   )
// }

