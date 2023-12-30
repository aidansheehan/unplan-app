import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.NEXT_PUBLIC_SEND_EMAIL,
        pass: process.env.NEXT_PUBLIC_SEND_EMAIL_PASS
    }
})

export default async function handler(req, res) {

    if (req.method === 'POST') {
        const feedback = req.body.feedback;

        const mailOptions = {
            from: process.env.NEXT_PUBLIC_SEND_EMAIL,
            to: process.env.NEXT_PUBLIC_TARGET_EMAIL,
            subject: 'New Feedback [EASY PLAN ESL]',
            text: feedback
        }

        console.log('HELLO WORLD')

        try {
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