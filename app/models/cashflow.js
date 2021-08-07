module.exports = (sequelize, DataTypes) => {
  const CashFlow = sequelize.define('CashFlow', {
    id: DataTypes.INTEGER,
    type: DataTypes.STRING,
    customerId: DataTypes.INTEGER,
    employeeId: DataTypes.INTEGER,
    serviceId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER,
    createdAt: DataTypes.STRING,
    updatedAt: DataTypes.STRING,
    deletedAt: DataTypes.STRING,
  });

  return CashFlow;
}