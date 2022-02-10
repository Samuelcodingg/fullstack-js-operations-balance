const { User } = require("../db/db");
const bcrypt = require("bcrypt");

exports.register = (req, res) => {

    console.log(User);

    //validate request
    if (!req.body.name) { 
        res.status(400).send({ message: "Name can not be empty" });
        return;
    }

    if (!req.body.email) {
        res.status(400).send({ message: "Email can not be empty" });
        return;
    }

    if (!req.body.password) {
        res.status(400).send({ message: "Password can not be empty" });
        return;
    }

    

    //create user
    const user = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    };

    //hashing password
    const salt = bcrypt.genSaltSync(10);

    user.password = bcrypt.hashSync(user.password, salt);

    //save user in database
    User.create(user)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        }
        );
};
