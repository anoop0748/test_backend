const express = require('express');
const mongose = require('mongoose');
const port = 3000
const mongoDbURL = "mongodb://localhost:27017";
const endPoints = require('./src/endpoints');
const body_parser = require('body-parser')
let app = express();
mongose.set('strictQuery', true);
mongose.connect(mongoDbURL, console.log("Connected to Database"))


app.use(body_parser.json())
app.use(endPoints)
app.listen(port, (e)=>{
    if(e) console.log(e);
    console.log(`server is running on ${port}`)
})