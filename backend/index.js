const express = require('express');
const morgan = require('morgan');
const mysql = require('mysql');
const myconnection = require('express-myconnection');


require('dotenv').config();

const app = express();
const port = 7000;
const dbOptions = {
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    port: process.env.MYSQL_PORT,
    database: process.env.MYSQL_DATABASE
};

app.disable('x-powered-by');

//Midlewares
app.use(morgan('dev'));
app.use(myconnection(mysql, dbOptions, 'single'));
app.use(express.json());

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

