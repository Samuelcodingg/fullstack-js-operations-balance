const { Type } = require('../db/db');

exports.create = (req, res) => {
    //validate request
    if (!req.body.name) {
        res.status(400).send({ message: "Name can not be empty" });
        return;
    }

    //create type
    const type = {
        name: req.body.name
    };

    //save type in database
    Type.create(type)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        }
        );
};