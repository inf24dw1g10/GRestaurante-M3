const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('Table', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    number: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true
    },
    capacity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('available', 'reserved', 'occupied'),
      defaultValue: 'available'
    }
  });
};