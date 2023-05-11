const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { authenticate } = require('./auths/oauth2');

const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

const PORT = process.env.PORT || 4000;

const scopes = [
    'https://www.googleapis.com/auth/analytics.readonly'
  ];

authenticate(scopes);