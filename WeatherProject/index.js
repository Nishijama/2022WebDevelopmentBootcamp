const express = require("express");
const app = express();
const bodyParser = require("body-parser")
const https = require("node:https");

app.use(bodyParser.urlencoded({extended:true}))

const apiKey = 'cbf79b77dbb6f692180fd6e8e6c7b0b6'

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html")
})

app.post("/", (req, res) => {
    console.log(req.body.city);
    let query = req.body.city
    getWeatherData(query, res);
})

function getWeatherData(query, res) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}&units=metric`
    https.get(url, (response) => {
        response.on("data", (data) => {
            const weatherData = JSON.parse(data);
            const temp = String(weatherData.main.temp)
            const description = String(weatherData.weather[0].description)
            const icon = weatherData.weather[0].icon;
            const image = `http://openweathermap.org/img/wn/${icon}.png`
            res.write(`<h1>The weather in ${query} is ${description}</h1>`)
            res.write(`<p>Temperature  ${temp} C </p>`)
            res.write(`<img src=${image}>`)
            res.send();
        })
    })
}

app.listen(3000, () => {
    console.log("App running on port 3000");
})
