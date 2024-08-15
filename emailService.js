const nodemailer = require('nodemailer');

class EmailService {
  constructor() {
    // Primary email service configuration
    this.primaryTransporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'primarymail@gmail.com',
        pass: 'primarypassword',
      },
    });

    // Backup email service configuration
    this.backupTransporter = nodemailer.createTransport({
      service: 'yahoo',
      auth: {
        user: 'backupemail@yahoo.com',
        pass: 'backuppassword',
      },
    });

    this.maxRetries = 3;
  }

  async sendEmail(emailOptions, attempt = 1) {
    try {
      await this.primaryTransporter.sendMail(emailOptions);
      console.log('Email sent successfully using primary service');
    } catch (error) {
      console.error(`Failed to send email on attempt ${attempt}:`, error.message);

      if (attempt < this.maxRetries) {
        console.log(`Retrying... (Attempt ${attempt + 1})`);
        await this.sendEmail(emailOptions, attempt + 1);
      } else {
        console.log('Switching to backup service');
        try {
          await this.backupTransporter.sendMail(emailOptions);
          console.log('Email sent successfully using backup service');
        } catch (backupError) {
          console.error('Failed to send email using backup service:', backupError.message);
        }
      }
    }
  }
}

module.exports = EmailService;
