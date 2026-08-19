const nodemailer = require('nodemailer')
require('dotenv').config()

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for port 465, false for 587
    auth: {
        user: process.env.EMAIL_USER,   // your gmail address
        pass: process.env.EMAIL_PASS    // the 16-char app password, NOT your real password
    },
    tls: {
        rejectUnauthorized: true,
        minVersion: 'TLSv1.2'
    }
})

const sendOtpEmail = async (toEmail, otp) => {
    try {
        const info = await transporter.sendMail({
            from: `${process.env.EMAIL_USER}`,
            to: toEmail,
            subject: 'Your OTP for password reset',
            html: `<p>Your OTP is <b>${otp}</b>. It expires in 10 minutes.</p>`
        })
        return info
    } catch (err) {
        console.log(err.message)
        throw err
    }
}

module.exports = sendOtpEmail