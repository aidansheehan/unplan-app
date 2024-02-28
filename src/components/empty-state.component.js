import { PlusIcon, FolderIcon } from '@heroicons/react/20/solid'
import ButtonLinkPrimaryComponent from './button/button.link.primary.component';

// Adding a `size` prop to the component
const EmptyStateComponent = ({ size = 'default', text, href }) => {
  // Determine size classes based on the `size` prop
  const sizeClass = size === '2x' ? 'h-24 w-24' : 'h-12 w-12';
  const textSizeClass = size === '2x' ? 'text-lg' : 'text-sm';
  const iconSizeClass = size === '2x' ? 'h-6 w-6' : 'h-5 w-5';

  return (
    <div className={`text-center ${size === '2x' ? 'space-y-4' : 'space-y-2'}`}>
        <FolderIcon className={`mx-auto ${sizeClass} text-gray-400`}/>

      <h3 className={`mt-2 ${textSizeClass} font-semibold text-gray-900`}>Oops, nothing here yet!</h3>
      <p className={`mt-1 ${textSizeClass} text-gray-500`}>{text}</p>
      <div className="mt-8">
        <ButtonLinkPrimaryComponent style={`inline-flex mt-6`} href={href} >
            <PlusIcon className={`-ml-0.5 mr-1.5 ${iconSizeClass}`} aria-hidden="true" />
            Get Started
        </ButtonLinkPrimaryComponent>

      </div>
    </div>
  )
}

export default EmptyStateComponent
