
/**
 * Generic page header component
 */
const PageHeaderComponent = ({ text }) => {
    return (
        <div className="bg-lilac-200 border-b border-lilac-300 py-5 shadow-lg">
            <h1 className="font-semibold text-gray-700 text-center text-xl lg:text-2xl">
                {text}
            </h1>
        </div>
    );
};

export default PageHeaderComponent;
