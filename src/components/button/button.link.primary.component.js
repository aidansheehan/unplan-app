import Link from "next/link"

const ButtonLinkPrimaryComponent = ({href, children, style}) => {

    return (
        <Link
        className={`rounded-md bg-primaryText px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${style} font-nav`}
        href={href}
      >
          {children}
      </Link>
    )
}

export default ButtonLinkPrimaryComponent