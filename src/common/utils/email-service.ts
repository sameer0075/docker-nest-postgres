export function emailService(mailservice, email, content) {
  mailservice
    .sendMail({
      to: email, // list of receivers
      from: process.env.EMAIL_USERNAME, // sender address
      subject: 'Sign Up EMail ✔', // Subject line
      html: content, // HTML body content
    })
    .then((success) => {
      console.log('success email', success);
    })
    .catch((err) => {
      console.log('err email', err);
    });
}
