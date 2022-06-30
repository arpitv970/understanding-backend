const Sequelize = require('sequelize');

const sequelize = new Sequelize('node-complete', 'root', 'admin', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;