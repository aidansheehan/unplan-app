import { Fragment, useState } from 'react'
import { Dialog, Transition, Disclosure } from '@headlessui/react'
import {
  Bars3Icon,
  HomeIcon,
  XMarkIcon,
  ChevronRightIcon,
  PlusIcon,
  UserIcon,
  Cog6ToothIcon
} from '@heroicons/react/24/outline'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function AuthLayoutComponent({children}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const navigation = useNavigationWithCurrentPath()

  // Find bottom option NB will not support multiple bottom options
  const bottomOption = navigation.find(n => n.bottom)

  return (
    <>
      <div>
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
                  <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-indigo-600 px-6 pb-2">
                    <div className="flex h-16 shrink-0 items-center">
                      <img
                        className="h-8 w-auto"
                        src="https://tailwindui.com/img/logos/mark.svg?color=white"
                        alt="Your Company"
                      />
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
                                            ? 'bg-indigo-700 text-white'
                                            : 'text-indigo-200 hover:text-white hover:bg-indigo-700',
                                            'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                                        )}
                                        >
                                        <item.icon
                                            className={classNames(
                                            item.current ? 'text-white' : 'text-indigo-200 group-hover:text-white',
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
                                                item.current ? 'bg-indigo-700 text-white' : 'text-indigo-200 hover:text-white hover:bg-indigo-700',
                                                'flex items-center w-full text-left rounded-md p-2 gap-x-3 text-sm leading-6 font-semibold text-gray-700'
                                                )}
                                            >
                                                <item.icon className={classNames(
                                                    item.current 
                                                    ? 'text-white' 
                                                    : 'text-indigo-200 group-hover:text-white',
                                                    'h-6 w-6 shrink-0'
                                                )} aria-hidden="true" />
                                                {item.name}
                                                <ChevronRightIcon
                                                className={classNames(
                                                    open ? 'rotate-90 text-gray-500' : 'text-gray-400',
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
                                                            subItem.current ? 'bg-indigo-700 text-white' : 'text-indigo-200 hover:text-white hover:bg-indigo-700',
                                                            'block rounded-md py-2 pr-2 pl-9 text-sm leading-6 text-gray-700'
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
          <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-indigo-600 px-6">
            <div className="flex h-16 shrink-0 items-center">
              <img
                className="h-8 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=white"
                alt="Your Company"
              />
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
                                    ? 'bg-indigo-700 text-white'
                                    : 'text-indigo-200 hover:text-white hover:bg-indigo-700',
                                    'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                                )}
                                >
                                <item.icon
                                    className={classNames(
                                    item.current ? 'text-white' : 'text-indigo-200 group-hover:text-white',
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
                                                ? 'bg-indigo-700 text-white'
                                                : 'text-indigo-200 hover:text-white hover:bg-indigo-700',
                                        'flex items-center w-full text-left rounded-md p-2 gap-x-3 text-sm leading-6 font-semibold text-gray-700'
                                        )}
                                    >
                                        <item.icon className={classNames(
                                                item.current 
                                                ? 'text-white' 
                                                : 'text-indigo-200 group-hover:text-white',
                                                'h-6 w-6 shrink-0'
                                        )} aria-hidden="true" />
                                        {item.name}
                                        <ChevronRightIcon
                                        className={classNames(
                                            open ? 'rotate-90 text-gray-500' : 'text-gray-400',
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
                                                ? 'bg-indigo-700 text-white'
                                                : 'text-indigo-200 hover:text-white hover:bg-indigo-700',
                                                'block rounded-md py-2 pr-2 pl-9 text-sm leading-6 text-gray-700'
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

                <li className="-mx-6 mt-auto">
                  <Link
                    href={bottomOption.href}
                    className={classNames(
                        bottomOption.current
                                    ? 'bg-indigo-700 text-white'
                                    : 'text-indigo-200 hover:text-white hover:bg-indigo-700',
                                    'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                    )}
                  >
                    <Cog6ToothIcon 
                        className={classNames(
                            bottomOption.current ? 'text-white' : 'text-indigo-200 group-hover:text-white',
                            'h-6 w-6 shrink-0'
                        )}
                    />
                    <span className="sr-only">Settings</span>
                    <span aria-hidden="true">Settings</span>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="sticky top-0 z-40 flex items-center gap-x-6 bg-indigo-600 px-4 py-4 shadow-sm sm:px-6 lg:hidden">
          <button type="button" className="-m-2.5 p-2.5 text-indigo-200 lg:hidden" onClick={() => setSidebarOpen(true)}>
            <span className="sr-only">Open sidebar</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>

        </div>

        <main className="py-10 lg:pl-72">
          <div className="px-4 sm:px-6 lg:px-8">
              {children}
          </div>
        </main>
      </div>
    </>
  )
}


import { useRouter } from 'next/router';
import Link from 'next/link'

const useNavigationWithCurrentPath = () => {
  const { pathname } = useRouter();

  const navigation = [
    { name: 'Home', href: '/', icon: HomeIcon, current: false },
    {
      name: 'Create',
      icon: PlusIcon,
      current: false,
      children: [
        { name: 'Lesson Plan', href: '/plan', current: false },
        { name: 'Activities', href: '/activities', current: false }
      ]
    },
    {
        name: 'My Unplan',
        icon: UserIcon,
        current: false,
        children: [
            { name: 'Lessons', href: '/your-lessons', current: false },
            // { name: 'Activities', href: '' }
        ]
    },
    {
        name: 'Settings',
        icon: Cog6ToothIcon,
        href: '/settings',
        current: false,
        bottom: true
    }
  ];

  // Iterate over the navigation items to set the current property based on the current path
  const adaptedNavigation = navigation.map((item) => {
    // If the item has children, check if any child's href matches the current pathname
    if (item.children) {
      const updatedChildren = item.children.map((child) => ({
        ...child,
        // Set current to true if the child's href matches the pathname
        current: pathname === child.href,
      }));

      return {
        ...item,
        children: updatedChildren,
        // Set the parent item's current to true if any child is current
        current: updatedChildren.some((child) => child.current),
      };
    } else {
      return {
        ...item,
        // Set current to true if the item's href matches the pathname
        current: pathname === item.href,
      };
    }
  });

  return adaptedNavigation;
};
