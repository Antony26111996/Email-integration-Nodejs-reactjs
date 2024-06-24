const express = require('express');
const nodemailerSmtpTransport = require('nodemailer-smtp-transport');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Create an SMTP transport with the configuration for your email service
const smtpTransport = nodemailer.createTransport(
  nodemailerSmtpTransport({
    host: 'HOST NAME', 
    port: 'PORT NUMBER', 
    secure: true, 
    auth: {
      user: 'USER ID',
      pass: 'PAss',
    },
  })
);

// Define an endpoint for sending emails
app.post('/send-email', (req, res) => {
  const { to, subject, body } = req.body;

  // Email data
  const mailOptions = {
    from: 'FROM ADDRESS',
    to,
    subject,
    text: body,
  };

  console.log(mailOptions)

  // Send the email using the configured SMTP transport
  smtpTransport.sendMail(mailOptions, (error, info) => {
    if (error) {
      
      res.status(500).json({ error: 'Email sending failed' });
      console.log('Error sending email:', error);
    } else {
      
      res.status(200).json({ message: 'Email sent successfully' });
      console.log('Email sent:', info.response);
    }
  });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});