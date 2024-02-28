
const ButtonPrimaryComponent = ({onClick, type, children}) => {

    return (
        <button
        type={type}
        className="font-nav rounded-md bg-indigo-700 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        onClick={onClick}
      >
          {children}
      </button>
    )

}

export default ButtonPrimaryComponent