module.exports = (sequelize, type) => {
    return sequelize.define('user', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: type.STRING,
            allowNull: false
        },
        email: {
            type: type.STRING,
            allowNull: false,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: type.STRING,
            allowNull: false
        }
    });
}