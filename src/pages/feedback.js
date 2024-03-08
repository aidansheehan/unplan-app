import { useState } from "react"
import Link from "next/link"
import ButtonPrimaryComponent from "@/components/button/button.primary.component"

/**
 * Page to give feedback
 */
const Feedback = () => {

    const [ feedback, setFeedback ] = useState('')
    const [ isSent, setIsSent ] = useState(false)
    
    const handleSubmit = async (event) => {
        event.preventDefault()

        try {
            //Send feedback email TODO this doesn't really need to wait or set loading
            fetch('/api/send-feedback', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ feedback })
            })
            setIsSent(true)


        } catch (error) {
            console.error(error)

            //TODO should handle better
            setIsSent(true)
        }

    }

    if (isSent) return (

            <div className="flex flex-col items-center justify-center min-h-screen">
                <div className="w-full max-w-md p-6 mx-auto bg-white rounded shadow-md">
                    <h2 className="text-lg font-semibold text-center">Thank You!</h2>
                    <p className="text-sm text-center mt-4">Your feedback is invaluable to us. We're constantly listening to our users and implementing your ideas to improve our platform.</p>
                    <p className="text-sm text-center mt-2">Sign up for our mailing list to see how your suggestions are shaping our future updates!</p>

                    <div className="mt-6 text-center">
                        <Link href="/mailing" className="inline-block bg-darkPrimary text-white font-bold py-3 px-6 rounded-lg hover:bg-orange-600 transition-colors duration-300">
                            Sign Up for Updates
                        </Link>
                    </div>
                </div>
                <div className="mt-4">
                    <Link href="/" className="text-blue-500 hover:underline">
                        Back to Home
                    </Link>
                </div>
        </div>

    )

    return (

            <div className="flex flex-col items-center justify-center min-h-screen">
                <form 
                    onSubmit={handleSubmit}
                    className="w-full max-w-md p-6 mx-auto bg-white rounded shadow-md space-y-4"
                >
                    <div>
                        <h2 className="text-lg font-semibold text-center">We Value Your Feedback</h2>
                        <p className="text-sm text-center">Let us know how we can improve your experience. Your suggestions, ideas for new features, or any challenges you're facing are greatly appreciated!</p>
                    </div>
                    <textarea
                        className="w-full h-40 p-4 border-2 border-gray-300 rounded resize-none focus:border-blue-500 focus:outline-none"
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                        placeholder="Type your feedback here..."
                    />
                    <ButtonPrimaryComponent 
                        type='submit'
                        style='w-full'
                    >
                        Submit Feedback
                    </ButtonPrimaryComponent>

                </form>
            </div>

    )

}

export default Feedback