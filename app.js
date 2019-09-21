const Nightmare = require("nightmare");
const nightmare = Nightmare();
require("dotenv").config();
const keys = require("./keys.js")
nightmare.goto("https://sites.google.com/taskrabbit.com/northamerica/available-ikea-tasks-for-pst#h.p_MZ5hNI0XhhTv")
            .wait(5000)
            .evaluate(function(){
                var jobs = document.getElementById("h.p_7hl2UO4_8Kwx");
                return jobs.textContent;
            })
            .end()
            .then(result => {
                console.log(result);
            })