const Nightmare = require('nightmare')
const nightmare = Nightmare({ show: true })
const nodemailer = require('nodemailer');
require("dotenv").config();
const keys = require("./keys.js")
const fs = require('fs');

const transporter = nodemailer.createTransport({
  service: keys.service,
  auth: keys.data
});



nightmare.goto("https://sites.google.com/taskrabbit.com/northamerica/available-ikea-tasks-for-pst")
  .wait(5000)
  .evaluate(function () {
    var jobs = document.getElementById("h.p_jNme5yJ2hWl8");
    return jobs.innerHTML;
  })
  .end()
  .then(result => {

    fs.writeFile('jobs.html', result, function (err) {
      if (err) throw err;
      console.log('Saved!');
    });

    var mailOptions = {
      from: 'artur.markov1860@gmail.com',
      to: "archivaldi95@yandex.ru",
      subject: 'Sending Email using Node.js',
      attachments: [
        { 
            filename: 'jobs.html',
            content: result
        }],
        text: "There are new Jobs!"
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  }); 