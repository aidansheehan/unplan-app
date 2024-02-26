import Link from "next/link"

const ButtonLinkSecondarySmallComponent = ({href, children}) => {

    return (
        <Link 
            href={href}
            type='button'
            className='inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold text-gray-900 bg-white shadow-sm ring-1 ring-inset ring-e34036 hover:bg-red-50 font-nav'
        >
            {children}
        </Link>
    )
}

export default ButtonLinkSecondarySmallComponent