const Nightmare = require("nightmare");
const nightmare = Nightmare();
var nodemailer = require('nodemailer');
require("dotenv").config();
const keys = require("./keys.js")

var transporter = nodemailer.createTransport({
    service: keys.service,
    auth: keys.data
  });


nightmare.goto("https://sites.google.com/taskrabbit.com/northamerica/available-ikea-tasks-for-pst#h.p_MZ5hNI0XhhTv")
            .wait(5000)
            .evaluate(function(){
                var jobs = document.getElementById("h.p_7hl2UO4_8Kwx");
                return jobs.textContent;
            })
            .end()
            .then(result => {
                console.log(result);

                var mailOptions = {
                    from: 'artur.markov1860@gmail.com',
                    to: "archivaldi95@yande.ru",
                    subject: 'Sending Email using Node.js',
                    text: result
                  };
                  
                  transporter.sendMail(mailOptions, function(error, info){
                    if (error) {
                      console.log(error);
                    } else {
                      console.log('Email sent: ' + info.response);
                    }
                  });
            })
