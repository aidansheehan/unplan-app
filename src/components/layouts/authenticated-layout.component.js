import { Fragment, useEffect, useState } from 'react'
import { Dialog, Transition, Disclosure } from '@headlessui/react'
import Link from 'next/link'
import {
  Bars3Icon,
  XMarkIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/outline'
import useNavigationWithCurrentPath from '@/hooks/use-navigation-with-current-path'
import { useRouter } from 'next/router'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function AuthLayoutComponent({children}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const router      = useRouter()
  const navigation  = useNavigationWithCurrentPath()

  // Subscribe to router event changes - NB may cause unintentional close, may need to look into adding click handlers to links as appropriate
  useEffect(() => {

    // Function to handle route change
    const handleRouteChange = () => {
      // Close the sidebar
      setSidebarOpen(false)
    }

    // Listen for route changes to close the sidebar
    router.events.on('routeChangeStart', handleRouteChange)

    // Cleanup listener on component unmount
    return () => {
      router.events.off('routeChangeStart', handleRouteChange)
    }

  }, [router.events])

  return (
    <>
      <div className='font-nav'>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog as="div" className="relative z-50 lg:hidden" onClose={setSidebarOpen}>
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-900/80" />
            </Transition.Child>

            <div className="fixed inset-0 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                      <button type="button" className="-m-2.5 p-2.5" onClick={() => setSidebarOpen(false)}>
                        <span className="sr-only">Close sidebar</span>
                        <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                      </button>
                    </div>
                  </Transition.Child>
                  {/* Sidebar component, swap this element with another sidebar if you like */}
                  <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-primary px-6 pb-2">
                    <div className="flex h-16 shrink-0 items-center mb-8 mt-4">
                      {/* <img
                        className="h-12 w-auto"
                        src="/unplan_logo.svg"
                        alt="Unplan"
                      /> */}
                      <h2 className='font-heading text-4xl text-primaryText' >UNPLAN.</h2>
                    </div>
                    <nav className="flex flex-1 flex-col">
                      <ul role="list" className="flex flex-1 flex-col gap-y-7">
                        <li>
                          <ul role="list" className="-mx-2 space-y-1">
                            {navigation.map((item) => (
                              <li key={item.name}>
                                {!item.children ? (
                                    <Link
                                        href={item.href}
                                        className={classNames(
                                            item.current
                                            ? 'bg-darkPrimary text-primaryText'
                                            : 'text-primaryText hover:text-primaryText hover:bg-darkPrimary',
                                            'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                                        )}
                                        >
                                        <item.icon
                                            className={classNames(
                                            item.current ? 'text-primaryText' : 'text-primaryText group-hover:text-primaryText',
                                            'h-6 w-6 shrink-0'
                                            )}
                                            aria-hidden="true"
                                        />
                                        {item.name}
                                    </Link>
                                ) : (
                                    <Disclosure as="div">
                                        {({ open }) => (
                                            <>
                                            <Disclosure.Button
                                                className={classNames(
                                                item.current ? 'bg-darkPrimary text-primaryText' : 'text-primaryText hover:text-primaryText hover:bg-darkPrimary',
                                                'flex items-center w-full text-left rounded-md p-2 gap-x-3 text-sm leading-6 font-semibold'
                                                )}
                                            >
                                                <item.icon className={classNames(
                                                    item.current 
                                                    ? 'text-primaryText' 
                                                    : 'text-primaryText group-hover:text-primaryText',
                                                    'h-6 w-6 shrink-0'
                                                )} aria-hidden="true" />
                                                {item.name}
                                                <ChevronRightIcon
                                                className={classNames(
                                                    open ? 'rotate-90 text-primaryText' : 'text-primaryText hover:text-primaryText',
                                                    'ml-auto h-5 w-5 shrink-0'
                                                )}
                                                aria-hidden="true"
                                                />
                                            </Disclosure.Button>
                                            <Disclosure.Panel as="ul" className="mt-1 px-2">
                                                {item.children.map((subItem) => (
                                                    <li key={subItem.name}>
                                                        {/* 44px */}
                                                        <Disclosure.Button
                                                        as={Link}
                                                        href={subItem.href}
                                                        className={classNames(
                                                            subItem.current ? 'bg-darkPrimary text-primaryText' : 'text-primaryText hover:text-primaryText hover:bg-darkPrimary',
                                                            'block rounded-md py-2 pr-2 pl-9 text-sm leading-6 font-semibold'
                                                        )}
                                                        >
                                                        {subItem.name}
                                                        </Disclosure.Button>
                                                    </li>
                                                ))}
                                            </Disclosure.Panel>
                                            </>
                                        )}
                                    </Disclosure>
                                )}

                              </li>
                            ))}
                          </ul>
                        </li>

                      </ul>
                    </nav>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-primary px-6">
            <div className="flex h-16 shrink-0 items-center mt-8 mb-8">
              {/* <img
                className="w-auto h-14"
                src="/unplan_logo.svg"
                alt="Unplan"
              /> */}
              <h2 className='font-heading text-5xl text-primaryText' >UNPLAN.</h2>
            </div>
            <nav className="flex flex-1 flex-col">
              <ul role="list" className="flex flex-1 flex-col gap-y-7">
                <li>
                  <ul role="list" className="-mx-2 space-y-1">
                    {navigation.filter(n => !n.bottom).map((item) => (
                      <li key={item.name}>
                        {!item.children ? (
                            <Link
                                href={item.href}
                                className={classNames(
                                    item.current
                                    ? 'bg-lightPrimary text-primaryText'
                                    : 'text-primaryText  hover:bg-darkPrimary hover:shadow-outline hover:text-primaryText',
                                    'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                                )}
                                >
                                <item.icon
                                    className={classNames(
                                    item.current ? 'text-primaryText' : 'text-primaryText group-hover:shadow-outline group-hover:text-primaryText',
                                    'h-6 w-6 shrink-0'
                                    )}
                                    aria-hidden="true"
                                />
                                {item.name}
                            </Link>
                        ) : (
                            <Disclosure as="div">
                                {({ open }) => (
                                    <>
                                    <Disclosure.Button
                                        className={classNames(
                                            item.current
                                                ? 'bg-lightPrimary text-primaryText'
                                                : 'text-primaryText hover:text-primaryText hover:bg-darkPrimary',
                                        'flex items-center w-full text-left rounded-md p-2 gap-x-3 text-sm leading-6 font-semibold text-gray-700'
                                        )}
                                    >
                                        <item.icon className={classNames(
                                                item.current 
                                                ? 'text-primaryText' 
                                                : 'text-primaryText group-hover:text-primaryText',
                                                'h-6 w-6 shrink-0'
                                        )} aria-hidden="true" />
                                        {item.name}
                                        <ChevronRightIcon
                                        className={classNames(
                                            open ? 'rotate-90 text-primaryText' : 'text-primaryText hover:text-primaryText',
                                            'ml-auto h-5 w-5 shrink-0'
                                        )}
                                        aria-hidden="true"
                                        />
                                    </Disclosure.Button>
                                    <Disclosure.Panel as="ul" className="mt-1 px-2">
                                        {item.children.map((subItem) => (
                                        <li key={subItem.name}>
                                            {/* 44px */}
                                            <Disclosure.Button
                                            as={Link}
                                            href={subItem.href}
                                            className={classNames(
                                                subItem.current
                                                ? 'bg-lightPrimary text-primaryText font-semibold'
                                                : 'text-primaryText hover:text-primaryText hover:bg-darkPrimary',
                                                'block rounded-md py-2 pr-2 pl-9 text-sm leading-6 text-gray-700 my-1 font-semibold'
                                            )}
                                            >
                                            {subItem.name}
                                            </Disclosure.Button>
                                        </li>
                                        ))}
                                    </Disclosure.Panel>
                                    </>
                                )}
                            </Disclosure>
                        )}

                      </li>
                    ))}
                  </ul>
                </li>

                </ul>
                <ul className='mt-auto' role="list" >
                {
                    navigation.filter(n => n.bottom).map((item) => (
                        <li key={item.name} className="-mx-6">
                          <Link
                            href={item.href}
                            className={classNames(
                                item.current
                                            ? 'bg-darkPrimary text-primaryText'
                                            : 'text-primaryText hover:text-primaryText hover:bg-darkPrimary',
                                            'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                            )}
                          >
                            <item.icon
                                className={classNames(
                                    item.current ? 'text-primaryText' : 'text-primaryText group-hover:text-primaryText',
                                    'h-6 w-6 shrink-0'
                                )}
                            />
                            <span className="sr-only">{item.name}</span>
                            <span aria-hidden="true">{item.name}</span>
                          </Link>
                        </li>
                    ))
                }

              </ul>
            </nav>
          </div>
        </div>

        <div className="sticky top-0 z-40 flex items-center gap-x-6 bg-primary px-4 py-4 shadow-sm sm:px-6 lg:hidden justify-between">
          <button type="button" className="-m-2.5 p-2.5 text-primaryText lg:hidden" onClick={() => setSidebarOpen(true)}>
            <span className="sr-only">Open sidebar</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
{/* 
          <img 
              className={`-m-2.5 lg:hidden shrink-0 h-8 mr-0.5 ${sidebarOpen && 'hidden'}`}
              src="/unplan_logo.svg"
          /> */}
            <h2 className='font-heading text-primaryText' >UNPLAN.</h2>


        </div>

        <main className="md:py-10 lg:pl-72">
          <div className="px-4 md:px-4  lg:px-8 font-body">
              {children}
          </div>
        </main>
      </div>
    </>
  )
}
