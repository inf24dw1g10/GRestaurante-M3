// src/models/index.js
const { Sequelize } = require('sequelize');
const DishModel = require('./Dish');
const ReservationModel = require('./Reservation');
const CustomerModel = require('./Customer');
const TableModel = require('./Table');
const ReservationDishesModel = require('./ReservationDishes');

const sequelize = new Sequelize({
  database: process.env.DB_NAME || 'restaurant_db',
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '12345678',
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3306,
  dialect: 'mysql',
  logging: false
});

// Inicializa os modelos
const Dish = DishModel(sequelize);
const Reservation = ReservationModel(sequelize);
const Customer = CustomerModel(sequelize);
const Table = TableModel(sequelize);
const ReservationDishes = ReservationDishesModel(sequelize);

// Define as associações
Customer.hasMany(Reservation);
Reservation.belongsTo(Customer);

Table.hasMany(Reservation);
Reservation.belongsTo(Table);

Reservation.belongsToMany(Dish, { 
  through: ReservationDishes,
  foreignKey: 'reservationId'
});
Dish.belongsToMany(Reservation, { 
  through: ReservationDishes,
  foreignKey: 'dishId'
});

ReservationDishes.belongsTo(Dish);
ReservationDishes.belongsTo(Reservation);

// Exporta os modelos e a instância do Sequelize
module.exports = {
  sequelize,
  Dish,
  Reservation,
  Customer,
  Table,
  ReservationDishes
};