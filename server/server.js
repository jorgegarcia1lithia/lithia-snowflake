'use strict';

const cors = require('cors');
const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const jwt = require('jsonwebtoken');

const app = express().use(cors(corsOptions)).use(express.json()).use(cookieParser());

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {console.log("TEST snowflake Server started on port " + PORT)});