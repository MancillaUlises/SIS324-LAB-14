const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'userdb.sqlite'
});

module.exports = sequelize;
