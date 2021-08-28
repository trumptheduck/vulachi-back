const sgMail = require('@sendgrid/mail')
sgMail.setApiKey("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");
var baseUrl = "codifyapp.tech"
function generateVerificationEmail(user) {
  return `<!DOCTYPE html>
  <html>
  <head>
      <meta charset='utf-8'>
      <meta http-equiv='X-UA-Compatible' content='IE=edge'>
      <title>Verification Email</title>
      <meta name='viewport' content='width=device-width, initial-scale=1'>
      <style>
          button {
              width: 200px;
              height: 70px;
              line-height: 70px;
              text-align: center;
              border: none;
              font-size: large;
              color: white;
              background-color: rgb(14, 159, 255);
              font-weight: bold;
              cursor: pointer;
          }
          body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
          }
      </style>
  </head>
  <body>
      <h1>Thank for your subscription!</h1>
      <h3>Press this button to verify your account:</h3>
      <a href="https://${baseUrl}/apis/user/verify?token=${user.verificationToken}&user=${user._id}"><button>Verify email</button></a>
  </body>
  </html>`
}

exports.sendVerificationEmail = (user,success=()=>{},error=()=>{}) => {
  const msg = {
    to: user.credential, // Change to your recipient
    from: 'nhatyt123@gmail.com', // Change to your verified sender
    subject: 'Hi there! Verify your email now!',
    html: generateVerificationEmail(user),
  }
  sgMail
    .send(msg)
    .then(() => {
      console.log('Email sent');
      success('Email sent');
    })
    .catch((err) => {
      console.error(err)
      error(err);
    })
}
