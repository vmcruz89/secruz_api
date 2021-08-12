module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.DECIMAL(10,2),
    quantity: DataTypes.INTEGER,
    promotionPrice: DataTypes.DECIMAL(10,2),
    createdAt: DataTypes.STRING,
    updatedAt: DataTypes.STRING,
    deletedAt: DataTypes.STRING,
  },
  {
    timestamps: false,
    paranoid: true,
    underscored: true,
    freezeTableName: true,
    tableName: 'products'
  });

  return Product;
}