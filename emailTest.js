const nodemailer = require('nodemailer');
require('dotenv').config();

const sendTestEmail = () => {
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: 'your_test_email@example.com',
        subject: 'Test Email',
        text: 'This is a test email sent from Nodemailer',
    };

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.error('Error sending test email:', err);
        } else {
            console.log('Test email sent:', info.response);
        }
    });
};

sendTestEmail();
