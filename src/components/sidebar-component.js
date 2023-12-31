import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

  // Sidebar component
  const SidebarComponent = ({navItems, isNavOpen}) => {

    const router = useRouter()

    // Define a state to track the active page
    const [ activePage, setActivePage ] = useState('')

    useEffect(() => {
      setActivePage(router.pathname)
    }, [router])

    return (
<aside className={`bg-gray-200 md:bg-blue-600 flex mt-[var(--header-height)] flex-col justify-between fixed inset-x-0 md:inset-y-0 h-[calc(100%-var(--header-height)-var(--footer-height))] md:h-auto w-full md:w-[var(--sidebar-width)] z-5 ${isNavOpen ? 'flex' : 'hidden'} md:flex`}>
  <nav className="flex-grow">
    <ul className="space-y-4 h-full flex flex-col justify-center">
      {navItems.map(item => (
        <li key={item.href} className={`rounded-lg text-black md:text-white ${activePage === item.href ? 'bg-orange-500 md:bg-blue-700' : 'md:hover:bg-blue-500'} flex items-center justify-center md:justify-start text-center md:text-left`}>
          <Link href={item.href} className="flex items-center md:justify-start w-full p-3">
            <FontAwesomeIcon icon={item.icon} fixedWidth />
            <span className="text-lg ml-2">{item.text}</span>
          </Link>
        </li>
      ))}
    </ul>
  </nav>

</aside>


    )
};

export default SidebarComponent