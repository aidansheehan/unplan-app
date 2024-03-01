import Link from "next/link"

const ButtonLinkSecondarySmallComponent = ({href, children}) => {

    return (
        <Link 
            href={href}
            type='button'
            className='inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold text-gray-900 bg-white shadow-sm ring-1 ring-inset ring-buttonBg hover:bg-indigo-50 font-nav'
        >
            {children}
        </Link>
    )
}

export default ButtonLinkSecondarySmallComponent