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
        console.log("Error TEST JG:");
        console.log(err);
    } else {
        const statement = connection.execute({
            sqlText: "CALL MARKETING_PROD.BIZ.SP_CUSTOMER_360_LOOKUP(P_VIN => '5FNRL6H78JB025038');",
            asyncExec: true,
            complete: async function (err, stmt, rows) {
                if (err) {
                    console.error(`Failed to execute statement due to the following error: ${err.message}`);
                } else {
                    console.log(`Successfully executed statement: ${stmt.getSqlText()}`);
                    console.log(`rows: ${stmt.getSqlText()}`);

                    const queryId = stmt.getQueryId();

                    connection.getResultsFromQueryId({
                        queryId: queryId,
                        complete: async function (err, _stmt, rows) {
                            console.log(rows);
                        }
                    });
                }
            }
        });
        //console.log("statement JG:");
        //console.log(statement);
    }
});
  
// Execute SQL statements.
const app = express();

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.post('/slitnow', (req, res) => {
    const userData = req.body;

    console.log(userData); 

    // Send a success response back to the client
    res.status(201).json({
        message: 'User created successfully',
        data: userData
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {console.log("TEST snowflake Server started on port " + PORT)});