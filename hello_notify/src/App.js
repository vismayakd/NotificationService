import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import { Button, TextField, Typography, Container, Paper } from '@mui/material';
function App() {
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');

  const sendEmail = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/notifications/send-email', {
        to: email,
        subject: subject,
        text: message,
      });
      setStatus('Email sent successfully!');
      console.log("resposne", response)
    } catch (error) {
      setStatus('Failed to send email.');
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper style={{ padding: '20px', marginTop: '20px' }}>
        <Typography variant="h4" gutterBottom>
          Email Notification Service
        </Typography>
        <form onSubmit={sendEmail}>
          <TextField
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            required
            margin="normal"
          />
          <TextField
            label="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            fullWidth
            required
            margin="normal"
          />
          <TextField
            label="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            fullWidth
            required
            multiline
            rows={4}
            margin="normal"
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Send Email
          </Button>
        </form>
        {status && <Typography variant="body1" style={{ marginTop: '20px' }}>{status}</Typography>}
      </Paper>
    </Container>
  );
}

export default App;
