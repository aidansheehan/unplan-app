import Link from "next/link"

const ButtonLinkPrimaryComponent = ({href, children, style}) => {

    return (
        <Link
        className={`rounded-md bg-indigo-700 px-3.5 py-2.5 text-md font-semibold text-white shadow-sm hover:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${style} font-nav`}
        href={href}
      >
          {children}
      </Link>
    )
}

export default ButtonLinkPrimaryComponent