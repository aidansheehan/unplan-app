
/**
 * Secondary button component
 */
const ButtonSecondaryComponent = ({onClick, type, children, disabled, style}) => {

    return (
        <button
        type={type}
        disabled={disabled}
        className={`inline-flex items-center justify-center rounded-md px-3 py-2 text-sm font-semibold text-gray-900 bg-white shadow-sm ring-1 ring-inset ring-primaryText hover:bg-indigo-50 font-nav ${style}`}
        onClick={onClick}
      >
          {children}
      </button>
    )
}

export default ButtonSecondaryComponent