const express = require('express');
const mongoose = require('mongoose');
const routes = require('./Routes/routes')
const app = express()
const port = 3000;
const cors = require('cors');
const functions = require('firebase-functions');
// const nodemailer = require('nodemailer')

var corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

mongoose.connect('mongodb+srv://ghothini:test$jjklsj*&dsd@cluster0.mh9mnl8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/triple-t-gym')
    .catch((err) => console.log(err))

// Middlewares
app.use(express.json())
app.use(cors(corsOptions))
app.use(routes)

app.listen(port, () => {
    console.log('App running on port localhost:3000/');
})

exports.api = functions.https.onRequest(app);