const functions = require('firebase-functions');

const express = require('express');
const app = express();
const handleRoutes = require('./routes/handleRoutes');

app.use('/', handleRoutes);

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

exports.app = functions.https.onRequest(app);
