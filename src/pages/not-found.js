import ButtonLinkPrimaryComponent from "@/components/button/button.link.primary.component";

export default function NotFound() {
    return (
      <>

        <div className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
          <div className="text-center">
            <p className="text-base font-semibold text-accent">404</p>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-primaryText sm:text-5xl">Page not found</h1>
            <p className="mt-6 text-base leading-7 text-secondaryText">Sorry, we couldn’t find the page you’re looking for.</p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
                <ButtonLinkPrimaryComponent 
                    href='/'
                >
                    Go back home
                </ButtonLinkPrimaryComponent>
{/* TODO
              <a href="#" className="text-sm font-semibold text-gray-900">
                Contact support <span aria-hidden="true">&rarr;</span>
              </a> */}
            </div>
          </div>
        </div>
      </>
    )
}
