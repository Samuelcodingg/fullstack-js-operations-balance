const Sequelize = require('sequelize');

const UserModel = require('../models/user');
const TypeModel = require('../models/type');
const OperationModel = require('../models/operation');

const sequelize = new Sequelize(process.env.MYSQL_DATABASE, process.env.MYSQL_USER, process.env.MYSQL_PASSWORD, {
    host: process.env.MYSQL_HOST,
    dialect: 'mysql',
    port: process.env.MYSQL_PORT
});

const User = UserModel(sequelize, Sequelize);
const Type = TypeModel(sequelize, Sequelize);
const Operation = OperationModel(sequelize, Sequelize);

sequelize.sync({ force: false })
    .then(() => {
        console.log('Database & tables created!');
    })
    .catch(err => {
        console.log(err);
    }
);

module.exports = {
    User,
    Type,
    Operation
};