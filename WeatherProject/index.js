const express = require("express");
const app = express();
const bodyParser = require("body-parser")
const https = require("node:https");

const apiKey = 'cbf79b77dbb6f692180fd6e8e6c7b0b6'

app.get("/", (req, res) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=Poznan&appid=${apiKey}&units=metric`
    https.get(url, (response) => {
        response.on("data", (data) => {
            const weatherData = JSON.parse(data);
            const temp = String(weatherData.main.temp)
            console.log(temp);
            // res.send(temp)
        })
    })
    res.send("Server is up and running.")
})

// app.use(bodyParser.urlencoded({extended:false}));

// //     res.sendFile(__dirname + "/index.html");
// // })

// app.post("/", (req, res) => {
//     let city = req.body.city;
//     let email = req.body.email;
//     res.send(`<p>Registered user: <strong>${city}</strong></p><p>Registered email: <strong>${email}</strong></p>`);
// })

app.listen(3000, () => {
    console.log("App running on port 3000");
})
