const functions = require('firebase-functions');

const express = require('express')

const cors = require('cors');
const { request, response } = require('express');

const stripe = require('stripe')('sk_test_51HluxEB0BcMb1Kt6mUG2PnmrolHPhfj5mMtCA8PL7BRFWkJY3ZmuvpYWGBJd369zRyCnCvLBjJQ2Fc3q8mggnNN100gOpHG82x')

//API

//express app Config
const app = express();

//Middle wares
app.use(cors ({origin: true}))
app.use(express.json())


//Api routes
app.get('/' , (request , response) => response.status(200).send('hello world'))
app.post('/payments/create' , async (request , response) => {
    const total = request.query.total;
    console.log(' Payment Request recied, total')
    const paymentIntent = await stripe.paymentIntents.create({
        amount: total, //subunits of the currency
        currency: "usd"
    });
    //ok everything was cretaed
    response.status(201).send({
        clientSecret: paymentIntent.client_secret
    })
})


//Listen Command
exports.api = functions.https.onRequest(app)

