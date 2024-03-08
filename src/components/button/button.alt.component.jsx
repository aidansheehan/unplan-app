
/**
 * Alt button component
 */
const ButtonAltComponent = ({onClick, type, children}) => {

    return (
        <button
        type={type}
        className={`font-nav rounded-lg bg-accent px-3.5 py-2.5 text-sm font-semibold text-white opacity-90 hover:bg-darkPrimary hover:opacity-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent shadow-lg hover:shadow-xl transition duration-200 ease-in-out`}
        onClick={onClick}
      >
          {children}
      </button>
    )
}

export default ButtonAltComponent