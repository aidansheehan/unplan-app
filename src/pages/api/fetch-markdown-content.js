import { storage } from "../../../firebaseConfig"
import { ref, getDownloadURL } from 'firebase/storage'

/**
 * Server side function to fetch markdown content from storage
 */
export default async function handler(req, res) {

    if (req.method === 'GET') {

        const { urlPath } = req.query

        try {
            const url       = await getDownloadURL(ref(storage, urlPath))
            const response  = await fetch(url)
            const text      = await response.text()

            res.status(200).json({ content: text })
        } catch (error) {
            console.error('Error fetching markdown content:', error)
            res.status(500).json({ error: 'Failed to fetch content' })
        }
    } else {
        res.setHeader('Allow', ['GET'])
        res.status(405).end(`Method ${req.method} Not Allowed`)
    }
}