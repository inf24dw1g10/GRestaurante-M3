// src/models/Reservation.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('Reservation', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    customerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Customers',
        key: 'id'
      }
    },
    tableId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Tables',
        key: 'id'
      }
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    numberOfGuests: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 20
      }
    },
    status: {
      type: DataTypes.ENUM('pending', 'confirmed', 'cancelled'),
      defaultValue: 'pending'
    }
  });
};