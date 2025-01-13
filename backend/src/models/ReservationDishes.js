const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const ReservationDishes = sequelize.define('ReservationDishes', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    reservationId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Reservations',
        key: 'id'
      }
    },
    dishId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Dishes',
        key: 'id'
      }
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
    },
    notes: {
      type: DataTypes.TEXT
    }
  });

  return ReservationDishes;
};