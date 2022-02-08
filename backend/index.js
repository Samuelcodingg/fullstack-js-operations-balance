const express = require('express');
const morgan = require('morgan');
const mysql = require('mysql');
const myconnection = require('express-myconnection');

const app = express();
const port = 7000;
const dbOptions = {
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE
};

app.disable('x-powered-by');

require('dotenv').config();

//Midlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(myconnection(mysql, dbOptions, 'single'));

app.get('/', (req, res) => {
    req.getConnection((err, connection) => {
        connection.query('CREATE DATABASE IF NOT EXISTS ' + dbOptions.database, (err, rows) => {
            if (err) {
                console.log(err);
                res.status(500).send(err);
            } else {
                res.status(200).send('Database connected');
            }
        });
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

