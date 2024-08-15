const express = require('express');
const nodemailer = require('nodemailer');

const app = express();
app.use(express.json());

// Dummy emailid is given 
const primaryTransporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'primaryemail@gmail.com',        
    pass: 'primarypassword',
  },
});

const backupTransporter = nodemailer.createTransport({
  service: 'Yahoo',
  auth: {
    user: 'backupemail@yahoo.com',
    pass: 'backuppassword',
  },
});

async function sendEmailWithRetry(mailOptions, retries = 3) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      await primaryTransporter.sendMail(mailOptions);
      console.log('Email sent successfully via primary service');
      return { success: true };
    } catch (error) {
      console.error(`Failed to send email on attempt ${attempt}:`, error.message);
      if (attempt === retries) {
        console.log('Switching to backup service');
        try {
          await backupTransporter.sendMail(mailOptions);
          console.log('Email sent successfully via backup service');
          return { success: true };
        } catch (backupError) {
          console.error('Failed to send email via backup service:', backupError.message);
          return { success: false, error: backupError.message };
        }
      }
    }
  }
}

app.post('/api/notifications/send-email', async (req, res) => {
  const { to, subject, text } = req.body;

  const mailOptions = {
    from: 'youremail@gmail.com',
    to,
    subject,
    text,
  };

  const result = await sendEmailWithRetry(mailOptions);
  if (result.success) {
    res.status(200).send('Email sent successfully!');
  } else {
    res.status(500).send(`Failed to send email: ${result.error}`);
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
