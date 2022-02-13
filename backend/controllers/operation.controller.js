const { Operation, Type } = require('../db/db');
const { User } = require('../db/db');

exports.create = (req, res) => {
    //validate request
    if(!req.body.concept) {
        res.status(400).send({ message: "Concept can not be empty" });
    }

    if(!req.body.amount) {
        res.status(400).send({ message: "Amount can not be empty" });
    }

    if(!req.body.type_id) {
        res.status(400).send({ message: "Type can not be empty" });
    }

    //create operation
    const operation = {
        user_id: req.body.user_id,
        type_id: req.body.type_id,
        concept: req.body.concept,
        amount: req.body.amount,
        date: req.body.date
    };

    let adding = operation.amount;

    if(operation.type_id != 1) {
        adding = (-1)*operation.amount;
    }

    User.increment(
        { money: +adding },
        { where: { id: operation.user_id } }
    );

    //save operation in database
    Operation.create(operation)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        }
        );
};

exports.listById = (req, res) => {
    //get operations list
    Operation.findAll({
        where: {
            user_id: req.params.id
        }
        })
        .then(data => {
            res.send(data);
        }
        )
        .catch(err => {
            res.status(500).send({ message: err.message });
        }
        );
};