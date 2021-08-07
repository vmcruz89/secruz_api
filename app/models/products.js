module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.DECIMAL(10,2),
    quantity: DataTypes.INTEGER,
    promotionPrice: DataTypes.DECIMAL(10,2),
    createdAt: DataTypes.STRING,
    updatedAt: DataTypes.STRING,
    deletedAt: DataTypes.STRING,
  });

  return Product;
}