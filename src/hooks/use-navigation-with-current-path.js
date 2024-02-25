import NAVIGATION from '@/constants/navigation.constant'
import { useRouter } from 'next/router'

/**
 * Navigation path hook
 */
const useNavigationWithCurrentPath = () => {

    const { pathname } = useRouter()

    // Iterate over the navigation items to set the current property based on the current path
    const adaptedNavigation = NAVIGATION.map((item) => {
        // If the item has children, check if any child's href matches the current pathname
        if (item.children) {
        const updatedChildren = item.children.map((child) => ({
            ...child,
            // Set current to true if the child's href matches the pathname
            current: pathname === child.href,
        }))

        return {
            ...item,
            children: updatedChildren,
            // Set the parent item's current to true if any child is current
            current: updatedChildren.some((child) => child.current),
        }
        } else {
        return {
            ...item,
            // Set current to true if the item's href matches the pathname
            current: pathname === item.href,
        }
        }
    })

    return adaptedNavigation
}

export default useNavigationWithCurrentPath