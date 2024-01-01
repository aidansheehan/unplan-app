const BREVO_BASE_URL = 'https://api.brevo.com/v3/'
const LIST_ID = 4

/**
 * Signup a user to mailing list
 */
export default async (req, res) => {

    if (req.method === 'POST') {
        const { email } = req.body

        if (!email) {
            return res.status(400).json({ error: 'Email is required' })
        }

        const BREVO_API_KEY = process.env.NEXT_PUBLIC_BREVO_API_KEY

        const data = {
            email: email,
            listIds: [
                LIST_ID
            ]
        }

        try {
            
            //Create user contact and add to list
            const response = await fetch(`${BREVO_BASE_URL}contacts`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'api-key': BREVO_API_KEY
                },
                body: JSON.stringify(data)
            })

            if (!response.ok) {

                //Assume contact already created if response status 400 TODO THIS IS A HACK REVISIT
                if (response.status === 400) {
                    
                    return res.status(400).json({ success: false, duplicateUser: true })
                }
                
                throw new Error(`HTTP error! Status: ${response.status}`)
            }

            return res.status(200).json({ success: true, message: 'Subscription successful' })
        } catch (error) {
            return res.status(500).json({ error: error.message || error.toString() })
        }
    } else {
        res.setHeader('Allow', ['POST'])
        res.status(405).end(`Method ${req.method} Not Allowed`)
    }
}