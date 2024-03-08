
/**
 * Primary button component
 */
const ButtonPrimaryComponent = ({onClick, type, children, style}) => {

    return (
        <button
        type={type}
        className={`font-nav rounded-md bg-primaryText px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${style}`}
        onClick={onClick}
      >
          {children}
      </button>
    )

}

export default ButtonPrimaryComponent