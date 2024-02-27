import Link from "next/link"

const ButtonLinkPrimarySmallComponent = ({href, children}) => {

    return (
        <Link
            type="button"
            href={href}
            className="ml-3 inline-flex items-center rounded-md bg-indigo-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-e34036 font-nav"
        >
            {children}
        </Link>
    )
}

export default ButtonLinkPrimarySmallComponent