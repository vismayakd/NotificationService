const axios = require('axios');

async function sendHelloWorldNotification() {
  try {
    const response = await axios.post('http://localhost:3000/send-notification', {
      to: 'recipent@gmail.com',
      subject: 'Hello World!',
      text: 'This is a test email',
    });
    console.log(response.data);
  } catch (error) {
    console.error('Error sending notification:', error.response ? error.response.data : error.message);
  }
}

sendHelloWorldNotification();
