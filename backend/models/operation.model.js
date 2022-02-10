//do a model with foreign key to user and type

module.exports = (sequelize, type) => {
    return sequelize.define('operation', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: type.INTEGER,
            allowNull: false
        },
        type_id: {
            type: type.INTEGER,
            allowNull: false
        },
        concept: {
            type: type.STRING,
            allowNull: false
        },
        amount: {
            type: type.INTEGER,
            allowNull: false
        },
        date: {
            type: type.DATE,
            allowNull: false
        }
    });
};
