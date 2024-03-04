import Link from "next/link"

const ButtonLinkPrimarySmallComponent = ({href, children}) => {

    return (
        <Link
            type="button"
            href={href}
            className="ml-3 inline-flex items-center rounded-md bg-primaryText px-3 py-2 text-sm font-semibold text-white shadow-sm hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent font-nav"
        >
            {children}
        </Link>
    )
}

export default ButtonLinkPrimarySmallComponent