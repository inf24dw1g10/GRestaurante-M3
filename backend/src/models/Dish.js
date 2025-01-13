const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Dish = sequelize.define('Dish', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    category: {
      type: DataTypes.ENUM('starter', 'main', 'dessert', 'beverage'),
      allowNull: false
    },
    isAvailable: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  });
  
  return Dish;
};