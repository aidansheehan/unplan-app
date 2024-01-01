import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLaptopCode, faBookOpen, faClock, faPrint } from '@fortawesome/free-solid-svg-icons';
import Layout from '@/components/layout';

export default function Home() {

  return (
    <Layout>
          {/* Hero Section */}
          <section className="bg-blue-100 text-gray-800 px-4 py-12 md:py-24 w-full">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-bold text-center leading-tight text-blue-900 font-bree">
            Free, Effortless Lesson Planning for ESL Teachers
          </h2>
          <p className="mt-8 md:mt-12 text-lg md:text-xl text-center text-blue-700">
            Create custom lesson plans and activities in seconds.
          </p>
          <div className="mt-8 text-center">
            <Link href="/plan" className="inline-block bg-orange-500 text-white font-bold py-3 px-6 rounded-lg hover:bg-orange-600 transition-colors duration-300">
                Get Started
            </Link>
          </div>
        </div>
      </section>
      {/* Features Section */}
      <section className="flex-grow flex flex-col justify-center items-center bg-blue-50 w-full">
        <div className="text-center py-8 px-4">
          <h2 className="text-2xl font-semibold text-blue-700 mb-4 font-bree">Why Choose <span className='font-bold font-permanent-marker' >EASY PLAN ESL</span>?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {FeatureCard(faLaptopCode, 'Quick Lesson Generation', 'Generate custom lesson plans quickly with just a few clicks.', 'bg-orange-100', 'text-orange-500')}
            {FeatureCard(faBookOpen, 'Diverse Materials', 'Access a variety of ESL teaching materials for different levels and topics.', 'bg-green-100', 'text-green-500')}
            {FeatureCard(faClock, 'Save Time', 'Streamline your planning process to save time and enhance your teaching experience.', 'bg-orange-100', 'text-orange-500')}
            {FeatureCard(faPrint, 'Easy Printing', 'Effortlessly print your lesson materials ready for the classroom.', 'bg-green-100', 'text-green-500')}
          </div>
        </div>

        {/* Library Section */}
        <div className="w-full text-center py-8 bg-blue-200 px-4">
          <h3 className="text-2xl font-semibold text-blue-800 mb-4 font-bree">Explore Our Lesson Library</h3>
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
      <h4 className="mb-2 font-semibold text-lg text-gray-800 font-bree">{title}</h4>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}


