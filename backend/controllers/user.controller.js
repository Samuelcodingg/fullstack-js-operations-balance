const { User } = require("../db/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = (req, res) => {
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

exports.login = (req, res) => {
    //validate request
    if (!req.body.email) {
        res.status(400).send({ message: "Email can not be empty" });
        return;
    }

    if (!req.body.password) {
        res.status(400).send({ message: "Password can not be empty" });
        return;
    }

    //find user by email
    User.findOne({
        where: {
            email: req.body.email
        }
    })
        .then(user => {
            //check if user exists
            if (!user) {
                res.status(401).send({ message: "Invalid Email or Password" });
                return;
            }

            //check if password is correct
            const passwordIsValid = bcrypt.compareSync(
                req.body.password,
                user.password
            );

            if (!passwordIsValid) {
                res.status(401).send({ message: "Invalid Email or Password" });
                return;
            }

            //if user is found and password is valid, create a token
            const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
                expiresIn: 86400 // expires in 24 hours
            });

            res.status(200).send({ auth: true, token: token });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};