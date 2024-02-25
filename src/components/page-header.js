
/**
 * Generic page header component
 */
const PageHeaderComponent = ({text}) => {

    return (
        <div className="border-b border-gray-200 pb-5 mb-6">
            <h1 className="font-semibold leading-6 text-gray-900 text-center text-xl">{text}</h1>
        </div>
    )
}

export default PageHeaderComponent