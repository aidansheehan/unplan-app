import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

  // Sidebar component
  const SidebarComponent = ({navItems}) => {

    const router = useRouter()

    // Define a state to track the active page
    const [ activePage, setActivePage ] = useState('')

    useEffect(() => {
      setActivePage(router.pathname)
    }, [router])

    return (
<aside className="bg-blue-600 p-4 row-start-2 row-end-3 col-start-1 flex flex-col justify-center">
  <nav>
    <ul className="space-y-4">
    {navItems.map(item => (
        <li key={item.href} className={`rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg text-white ${activePage === item.href ? 'bg-blue-700' : 'hover:bg-blue-500'}`}>
          <Link href={item.href} className="flex items-center space-x-2 p-3">
            <FontAwesomeIcon icon={item.icon} fixedWidth />
            <span className="text-lg">{item.text}</span>
          </Link>
        </li>
      ))}
    </ul>
  </nav>
</aside>

    )
};

export default SidebarComponent