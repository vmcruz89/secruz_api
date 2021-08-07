module.exports = (sequelize, DataTypes) => {
  const Service = sequelize.define('Service', {
    id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.DECIMAL(10,2),
    quantity: DataTypes.INTEGER,
    promotionPrice: DataTypes.DECIMAL(10,2),
    averageMinutes: DataTypes.INTEGER,
    createdAt: DataTypes.STRING,
    updatedAt: DataTypes.STRING,
    deletedAt: DataTypes.STRING,
  });

  return Service;
}