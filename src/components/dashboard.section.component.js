import Link from "next/link"

/**
 * Generic dashboard section to display lessons, media
*/
const DashboardSection = ({title, link1, link2, children}) => {

    return (
        <div className="border-b border-gray-200 bg-white px-4 py-5 sm:px-6">
            <div className=" pb-5 sm:flex sm:items-center sm:justify-between">
                <h3 className="text-base font-semibold leading-6 text-gray-900">{title}</h3>
                <div className="mt-3 flex sm:ml-4 sm:mt-0">
                    <Link
                        type="button"
                        className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                        href={link1.href}
                    >
                        {link1.text}
                    </Link>
                    <Link
                        type="button"
                        className="ml-3 inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        href={link2.href}
                    >
                        {link2.text}
                    </Link>
                </div>
            </div>

            {children}

        </div>
    )
}

export default DashboardSection