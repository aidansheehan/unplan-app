import Link from "next/link"
  
/**
 * Generic 'Content Card'
 */
const ContentGridComponent = ({ contents }) => {
    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {contents.map((content) => (
                <Link
                    key={content.href}
                    href={content.href}
                    className="relative rounded-lg border border-lilac-300 bg-lilac-50 px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-lilac-500 focus-within:ring-offset-2 hover:border-lilac-400"
                >
                    <h2 className='text-center mb-4 font-semibold text-gray-700 font-heading'>{content.name}</h2>
                    <div className="flex items-center space-x-3">
                        <div className="flex-shrink-0 pr-4">
                            {/* Display content icon */}
                            {content.icon}
                        </div>
                        <div className="min-w-0 flex-1 text-sm text-gray-700">
                            <ul>
                                {content.listData.map((lD_, idx) => (
                                    <li key={`${content.href}-list-${idx}`}>
                                        {lD_}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default ContentGridComponent;
