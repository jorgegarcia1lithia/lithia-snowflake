'use strict';

const cors = require('cors');
const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const jwt = require('jsonwebtoken');
const snowflake = require('snowflake-sdk');

const privateKey = Buffer.from(process.env.privateKey, 'base64').toString('utf-8');
console.log(privateKey);

const app = express();

app.get('/', (req, res) => {
    res.send('Hello World!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {console.log("TEST snowflake Server started on port " + PORT)});