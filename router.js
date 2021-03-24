const express = require('express');
const app = express();
const port = 3000;
const userInput2 = require('./userInput2');

//RUNNING FRONTEND

app.use(express.static('frontend'));

app.get('/', function(req, res){
    res.send('Hello World!');
});

//WEB SERVICE BACKEND (RUNNING ON SAME PORT AS FRONTEND )

app.get('/forecast', async function(req, res){
    let weatherForecast = await userInput2.getForecast(req.query.location);
    res.send(weatherForecast);
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

//could also have a different port for frontend and backend web service
//backend.js, frontend.js - look almost the same- different.Frontend would only have app.use static part and listen.