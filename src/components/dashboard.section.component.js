import ButtonLinkSecondarySmallComponent from "./button/button.link.secondary.small.component"
import ButtonLinkPrimarySmallComponent from "./button/button.link.primary.small.component"

/**
 * Generic dashboard section to display lessons, media
*/
const DashboardSection = ({title, link1, link2, children, hideButtons}) => {

    return (
        <div className="border-b border-divider px-4 py-5 sm:px-6">
            <div className="pb-5 sm:flex sm:items-center sm:justify-between">
                <h3 className="text-lg font-semibold leading-6 text-primaryText ">{title}</h3>
                <div className="mt-3 flex sm:ml-4 sm:mt-0">

                    {
                        !hideButtons ? (
                            <>
                            <ButtonLinkSecondarySmallComponent href={link1.href} >
                                {link1.text}
                            </ButtonLinkSecondarySmallComponent>

                            <ButtonLinkPrimarySmallComponent href={link2.href} >
                                {link2.text}
                            </ButtonLinkPrimarySmallComponent>
                            </>
                        ) : <></>
                    }

                </div>
            </div>

            {children}

        </div>
    )
}

export default DashboardSection