import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Link from "next/link"

const ActivityLinkComponent = ({href, icon, title, description, bgColor, iconColor}) => {

    return (
        <Link className="border rounded-xl p-6 shadow-sm bg-white hover:shadow-md flex flex-col justify-center items-center transition-shadow border-gray-300 hover:border-gray-400" href={href} >
            <div className={`p-4 inline-flex rounded-full ${bgColor} mb-4`} >
                <FontAwesomeIcon icon={icon} className={iconColor} size="2x" />
            </div>
            <h3 className="text-lg font-semibold text-center mb-2 text-gray-800">{title}</h3>
            <p className="text-sm text-gray-600 text-center" >
                {description}
            </p>

        </Link>
    )
}

export default ActivityLinkComponent