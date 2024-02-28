
/**
 * Generic page header component
 */
const PageHeaderComponent = ({ text }) => {
    return (
        <div className="py-5 ">
            <h1 className="font-semibold text-gray-700 text-center text-xl lg:text-2xl">
                {text}
            </h1>
        </div>
    );
};

export default PageHeaderComponent;
