'use strict';

const cors = require('cors');
const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const jwt = require('jsonwebtoken');
const snowflake = require('snowflake-sdk');
const crypto = require('crypto');

const privateKeyFile = Buffer.from(process.env.privateKey, 'base64').toString('utf-8');

const privateKeyObject = crypto.createPrivateKey({
    key: privateKeyFile,
    format: 'pem',
    passphrase: process.env.passphrase
});

// Extract the private key from the object as a PEM-encoded string.
const privateKey = privateKeyObject.export({
    format: 'pem',
    type: 'pkcs8'
});
  
// Use the private key for authentication.
const connection = snowflake.createConnection({
    account: process.env.account,
    username: process.env.user,
    role: process.env.role,
    authenticator: 'SNOWFLAKE_JWT',
    privateKey: privateKey
});
  
// Establish a connection.
connection.connect((err, conn) => {
    if (err) {
        // Handle any errors.
        console.log("Error TEST: \n\n");
        console.log(err);
      } else {
        // Execute SQL statements.
        const statement = connection.execute({
            "statement": "select * from STAGING.STG_SFMC_EXPRESSENTRYAUDIENCE;"
        });
        console.log("statement \n\n");
        console.log(statement);
      }
});
  
// Execute SQL statements.
const app = express();

app.get('/', (req, res) => {
    res.send('Hello World!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {console.log("TEST snowflake Server started on port " + PORT)});