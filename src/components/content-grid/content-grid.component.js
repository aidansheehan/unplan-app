import Link from "next/link"
  
/**
 * Generic 'Content Card'
 */
const ContentGridComponent = ({contents}) => {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {contents.map((content) => (
          <Link
            key={content.href}
            href={content.href}
            className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400"
          >
            <h2 className='text-center mb-4 font-semibold' >{content.name}</h2>

            <div className="flex items-center space-x-3" >
              <div className="flex-shrink-0 pr-4">
                {/* <content.icon /> */}
                {content.icon}
                {/* <img className="h-10 w-10 rounded-full" src={person.imageUrl} alt="" /> */}
              </div>
              <div className="min-w-0 flex-1 text-sm">
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
    )
}

export default ContentGridComponent