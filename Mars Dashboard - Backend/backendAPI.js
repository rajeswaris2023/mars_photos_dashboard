const handler = require('./requestHandler');
const marsApi = require('./marsApiHandler');
require('dotenv').config();
const https = require('node:https');
const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors({origin: process.env.ORIGIN, credentials: process.env.CREDENTIALS}));

const initialUrl = process.env.API_URL;
const apiKey = process.env.API_KEY;

app.get('/', (request, response) => {
    let params = handler.extractParams(request);
    let url = handler.getUrl(initialUrl, params, apiKey);
    let options = handler.getOptions();
    marsApi.callApi(https, url, options, response);
});
app.listen(process.env.LISTENING_PORT);