require('dotenv').config({ path: '.env' });
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
var emailexistence = require('email-existence');

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'index.html'));
});

app.post('/contact', (req, res) => {
  let email = req.body.email;
  let text = req.body.message;

  console.log(text);
  console.log(email);
  emailexistence.check(email, function (error, response) {
    if (response === true) {
      sgMail.send({
        to: 'ddaf051@gmail.com',
        from: email,
        subject: 'Sending with SendGrid is Fun',
        text: 'and easy to do anywhere, even with Node.js',
        html: ` <strong>${text}</strong>`
      })
        .then(() => {
          res.send('Success!');
        })
        .catch(err => {
          console.error(err);
          res.status(500).send('An error occured');
        });
    } else {
      res.status(500).send(response);
    }
  }
  );
});

app.set('port', process.env.PORT || 5000);
const server = app.listen(app.get('port'), () => {
  console.log(`Express running → PORT ${server.address().port}`);
});
