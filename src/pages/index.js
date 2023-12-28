import { Inter } from 'next/font/google'
import Link from 'next/link'
import Layout from '@/components/layout'

const inter = Inter({ subsets: ['latin'] })

const APP_TITLE = 'ESL EasyPlan'

export default function Home() {
  return (
    <Layout>
      <section className="h-full flex flex-col justify-center">
        <h2 className="text-xl font-semibold text-center mb-4">Why Choose {APP_TITLE}?</h2>
        <ul className="list-disc pl-5 space-y-2 text-center">
          <li>Generate custom lesson plans quickly</li>
          <li>Access a variety of ESL teaching materials</li>
          <li>Save time and enhance your teaching experience</li>
        </ul>
      </section>
      
      <div className="text-center p-4">
        <Link href="/plan" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
          Get Started
        </Link>
      </div>
    </Layout>
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

