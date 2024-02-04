const nodemailer = require('nodemailer')

//Create a transporter using Brevo SMTP
const transporter = nodemailer.createTransport({
    host: 'smtp-relay.brevo.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.MY_EMAIL,
      pass: process.env.BREVO_SMTP_KEY
    }
})

/**
 * Function to send an email to myself if rate limit exceeded
 */
const sendRateLimitEmail = async (processName) => {

    //Get current timestamp
    const now = new Date()
  
    // Format the date and time
    const formattedTimestamp = now.getFullYear() + '-' +
    String(now.getMonth() + 1).padStart(2, '0') + '-' + // Months are zero-indexed
    String(now.getDate()).padStart(2, '0') + ' ' +
    String(now.getHours()).padStart(2, '0') + ':' +
    String(now.getMinutes()).padStart(2, '0') + ':' +
    String(now.getSeconds()).padStart(2, '0')
  
    //Configure mail options
    const mailOptions = {
      from: `"RATE LIMITER" <${process.env.MY_EMAIL}>`,
      to: process.env.MY_EMAIL,
      subject: 'RATE LIMIT EXCEEDED [EASY PLAN ESL]',
      text: `Rate limit for ${processName} exceeded at ${formattedTimestamp}`
    }
  
    //Send email
    await transporter.sendMail(mailOptions)
}

module.exports = { sendRateLimitEmail }