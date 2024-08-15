"# NotificationService" 
Created an email service that tries to send an email using a primary SMTP server. If it fails, it will retry up to three times before switching to a backup SMTP server - Created file named emailService.js
Created an Express server that uses the sendEmail function to handle email notifications - Created file named index.js
Dummy credentials are provided which should be changed before running .Given primary mail as 'primaryemail@gmail.com' primary password as 'primarypassword' , backup email as 'backupmail@yahoo.co'm and backup password as 'backuppassword'.
