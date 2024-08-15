const express = require('express');
const EmailService = require('./emailService');

const app = express();
app.use(express.json());

const emailService = new EmailService();

app.post('/send-notification', async (req, res) => {
  const { to, subject, text } = req.body;

  if (!to || !subject || !text) {
    return res.status(400).send('Missing required fields: to, subject, text');
  }

  const emailOptions = {
    from: 'primaryemail@gmail.com', // Use the primary email
    to,
    subject,
    text,
  };

  try {
    await emailService.sendEmail(emailOptions);
    res.status(200).send('Notification sent successfully');
  } catch (error) {
    res.status(500).send('Failed to send notification');
  }
});

app.get('/', (req, res) => {
  res.send('Hello World! Notification service is running.');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
