
/**
 * Generic page header component
 */
const PageHeaderComponent = ({ text }) => {
    return (
        <div className="py-5 ">
            <h1 className="font-semibold text-primaryText text-center text-xl lg:text-2xl font-heading">
                {text}
            </h1>
        </div>
    );
};

export default PageHeaderComponent;
