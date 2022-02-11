const express = require('express');
const morgan = require('morgan');

require('dotenv').config();

const app = express();
const port = 7000;

app.disable('x-powered-by');
require('./db/db');

//Midlewares
app.use(morgan('dev'));
app.use(express.json());

app.use('/api/user', require('./routes/user.routes'));
app.use('/api/type', require('./routes/type.routes'));
app.use('/api/operation', require('./routes/operation.routes'));

app.get('/', (req, res) => {
    req.getConnection((err, connection) => {
        connection.query('CREATE DATABASE IF NOT EXISTS ' + process.env.MYSQL_DATABASE, (err, rows) => {
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

