import { Cog6ToothIcon, HomeIcon, PlusIcon, UserIcon, BookOpenIcon, ChatBubbleBottomCenterIcon } from "@heroicons/react/24/outline"

/**
 * Navigation constant
 */
const NAVIGATION = [
    { name: 'Dashboard', href: '/', icon: HomeIcon, current: false },
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
        name: 'Lesson Library',
        icon: BookOpenIcon,
        current: false,
        href: '/library'
    },
    {
        name: 'Feedback',
        icon: ChatBubbleBottomCenterIcon,
        current: false,
        href: '/feedback'
    },
    {
        name: 'Settings',
        icon: Cog6ToothIcon,
        href: '/settings',
        current: false,
        bottom: true
    }
]

export default NAVIGATION