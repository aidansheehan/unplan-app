import nodemailer from 'nodemailer'

// Create a transporter using Brevo SMTP
const transporter = nodemailer.createTransport({
    host: 'smtp-relay.brevo.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.NEXT_PUBLIC_SEND_EMAIL,
        pass: process.env.NEXT_PUBLIC_BREVO_SMTP_KEY
    }
})

export default async function handler(req, res) {

    if (req.method === 'POST') {
        const feedback = req.body.feedback;

        // Configure mail options
        const mailOptions = {
            from: `"Easy Plan ESL" <${process.env.NEXT_PUBLIC_SEND_EMAIL}>`,
            to: process.env.NEXT_PUBLIC_SEND_EMAIL,
            subject: 'New Feedback [EASY PLAN ESL]',
            text: feedback
        }

        try {

            //Send mail
            await transporter.sendMail(mailOptions)
            res.status(200).json({ message: 'Feedback sent' })
        } catch (error) {
            console.error('ERROR: ', error)
            res.status(500).json({ message: 'Error sending feedback' })
        }

    } else {
        //Handle any other HTTP method
        res.status(405).end()
    }
}