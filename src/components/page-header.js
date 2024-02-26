
/**
 * Generic page header component
 */
const PageHeaderComponent = ({ text }) => {
    return (
        <div className="bg-softgrey border-b border-gray-300 py-5 shadow">
            <h1 className="font-semibold text-gray-800 text-center text-xl lg:text-2xl font-heading ">
                {text}
            </h1>
        </div>
    );
};

export default PageHeaderComponent;
