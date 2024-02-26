
const ButtonPrimaryComponent = ({onClick, type, children}) => {

    return (
        <button
            type={type ? type : "button"}
            className="rounded-md bg-button px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-brandRed focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brandRed uppercase"
            onClick={onClick}
        >
            {children}
        </button>
    )
}

export default ButtonPrimaryComponent