const Sequelize = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME || 'restaurant_db',
  process.env.DB_USER || 'root',
  process.env.DB_PASSWORD || '12345678',
  {
    host: process.env.DB_HOST || 'localhost',  // Alterado de 'mysql' para 'localhost'
    dialect: 'mysql',
    port: process.env.DB_PORT || 3306,
    logging: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

module.exports = sequelize;