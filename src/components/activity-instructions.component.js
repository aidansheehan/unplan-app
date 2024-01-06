import { useState } from "react"

/**
 * Component to display instructions for an activity
 */
const ActivityInstructionsComponent = ({instructionText}) => {

    //Show instructions state
    const [ showInstructions, setShowInstructions ] = useState(false)

    return (
        <>
            <div className="text-center mb-4">
                <button 
                    onClick={() => setShowInstructions(!showInstructions)}
                    className="text-blue-500 hover:text-blue-700 text-sm"
                >
                    {showInstructions ? 'Hide' : 'Show'} Instructions
                </button>
            </div>

            {
                showInstructions && (
                    <div className="bg-gray-100 p-4 rounded-md mb-4">
                        <p className="text-gray-700 text-sm">{instructionText}</p>
                    </div>
                )
            }
        </>
    )
}

export default ActivityInstructionsComponent