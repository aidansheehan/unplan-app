import ButtonLinkSecondarySmallComponent from "./button/button.link.secondary.small.component"
import ButtonLinkPrimarySmallComponent from "./button/button.link.primary.small.component"

/**
 * Generic dashboard section to display lessons, media
*/
const DashboardSection = ({title, link1, link2, children}) => {

    return (
        <div className="border-b border-lilac-300 bg-lilac-100 px-4 py-5 sm:px-6">
            <div className="pb-5 sm:flex sm:items-center sm:justify-between">
                <h3 className="text-lg font-semibold leading-6 text-gray-700 font-heading">{title}</h3>
                <div className="mt-3 flex sm:ml-4 sm:mt-0">

                    <ButtonLinkSecondarySmallComponent href={link1.href} className="text-lilac-600">
                        {link1.text}
                    </ButtonLinkSecondarySmallComponent>

                    <ButtonLinkPrimarySmallComponent href={link2.href} className="bg-lilac-600 text-white">
                        {link2.text}
                    </ButtonLinkPrimarySmallComponent>
                </div>
            </div>

            {children}

        </div>
    )
}

export default DashboardSection