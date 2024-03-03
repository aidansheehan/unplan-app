// import Layout from "@/components/layout"
import { useErrorHandling } from "@/hooks/use-error-handling.hook"

const { useState } = require("react")

const Mailing = () => {

    const [ email, setEmail ]                       = useState('')      //Email state
    const [ success, setSuccess ]                   = useState(false)   //Success state
    const [ isLoading, setIsLoading ]               = useState(false)   //Loading state
    const [ duplicateUser, setDuplicateUser ]       = useState(false)   //Duplicate user state
    const [ isPledgeVisible, setIsPledgeVisible ]   = useState(false)   //Privacy pledge visible state

    const { handleError } = useErrorHandling()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)

        const data = {email}

        try {
            const response = await fetch('/api/subscribe', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            
            if (response.ok) {

                setSuccess(true)
            } else {
                const data = await response.json()
                
                //If duplicate user
                if (data.duplicateUser) {
                    setSuccess(true)        //Set attempt successful
                    setDuplicateUser(true)  //Set duplicate user state
                } else {
                    handleError('There was an error adding the user to the mailing list')
                }

            }
        } catch (error) {
            console.error('error: ', error)
            handleError(error)
            
        } finally {
            setIsLoading(false)
        }
    }

    return (
        // <Layout >
            <div className="w-full h-full p-4 flex justify-center items-center">
                <div className="bg-blue-100 rounded-lg p-6 shadow-lg w-full max-w-md leading-7 ">
                    <h2 className="text-2xl font-bold text-blue-900 mb-4 font-bree">Join Our Mailing List</h2>
                    <ul className="text-lg text-blue-700 list-disc list-inside mb-6 ">
                        <li >Be the first to know about new and exciting features as we roll them out.</li>
                        <li className="mt-2">Engage with us and play a crucial role in creating innovative tools that transform ESL teaching.</li>
                    </ul>
                    <p className="font-bree text-lg text-blue-700 mb-6 font-bold">
                        Subscribe now and let’s shape the future of ESL education together.
                    </p>
                    {/* Display the form or the success message */}
                    {!success ? (
                        <form onSubmit={handleSubmit} className="space-y-4">
                        <input 
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            className="w-full p-2 border border-gray-300 rounded-md"
                            required
                        />
                        <button type="submit" className="bg-orange-500 text-white font-bold py-2 px-4 w-full rounded-lg hover:bg-orange-600 transition-colors duration-300" disabled={isLoading}>
                            {isLoading ? 'Subscribing...' : 'Subscribe'}
                        </button>
                    </form>
                    ) : !duplicateUser ? (
                        <div className="text-center">
                            <h3 className="text-2xl font-bold text-green-600 mb-4">Congratulations & Welcome!</h3>
                            <p className="text-lg text-blue-700">
                                You're successfully subscribed. We're excited to have you with us!
                            </p>
                        </div>
                    ) : (
                        <div className="text-center">
                            <h3 className="text-2xl font-bold text-green-600 mb-4">You're already subscribed</h3>
                            <p className="text-lg text-blue-700">
                                You're successfully subscribed. We're excited to have you with us! 
                            </p>
                        </div>
                    )}

                    <div className="text-sm text-blue-600 mt-4">

            {isPledgeVisible ? (
                <div className="mt-2">
                    <p>Your trust is our top priority. We pledge to:</p>
                    <ul className="list-disc list-inside">
                        <li>Guard your personal data fiercely and use it solely to enhance your teaching journey.</li>
                        <li>Never sell or share your information with third parties for advertising.</li>
                        <li>Deliver only valuable, teacher-focused content and updates—directly from us, no one else.</li>
                    </ul>
                    <p className='mt-2'>
                        Our mailing list is managed through <a href='https://www.brevo.com/legal/privacypolicy/' target='_blank' className="hover:underline">Brevo</a>, ensuring compliance with the highest standards of data protection and privacy.
                    </p>
                </div>
            ) : (
                <button
                onClick={() => setIsPledgeVisible(!isPledgeVisible)}
                className="hover:underline focus:outline-none"
            >
                We value your privacy. Tap to see how we handle your data.
            </button>
            )}
        </div>
        </div>
        </div>
        // </Layout>

    )
}

export default Mailing