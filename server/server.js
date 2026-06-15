'use strict';

const cors = require('cors');
const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const jwt = require('jsonwebtoken');
const snowflake = require('snowflake-sdk');
const crypto = require('crypto');
  
const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    //res.send('Hello World!');
});

app.post('/slitnow', (req, res) => {
    const requestData = req.body;
    console.log(requestData);

    /*const privateKeyFile = Buffer.from(process.env.privateKey, 'base64').toString('utf-8');

    const privateKeyObject = crypto.createPrivateKey({
        key: privateKeyFile,
        format: 'pem',
        passphrase: requestData.passphrase
    });

    // Extract the private key from the object as a PEM-encoded string.
    const privateKey = privateKeyObject.export({
        format: 'pem',
        type: 'pkcs8'
    });
    
    // Use the private key for authentication.
    const connection = snowflake.createConnection({
        account: requestData.account,
        username: requestData.user,
        role: requestData.role,
        authenticator: requestData.authenticator,
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
                sqlText: requestData.sqlText,
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
                                //console.log(rows);

                                // Send a success response back to the client
                                res.status(201).json({
                                    data: rows
                                });
                            }
                        });
                    }
                }
            });
        }
    });*/
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {console.log("snowflake middleware Server started on port " + PORT)});