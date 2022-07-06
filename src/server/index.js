const express = require('express');
const weatherData = require('./data');
const cors = require('cors');
require('dotenv').config()

const app = express();
const port = process.env.SERVER_PORT;

app.use(cors());

app.get('/forecast', (req, res) => {
  
  weatherData.sort(()=>Math.random()>0.5?1:-1);
  res.send(weatherData);
})

app.listen(port, () => {
  console.log('server running in port: ',port);
})