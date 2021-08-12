module.exports = (sequelize, DataTypes) => {
  const CashFlow = sequelize.define('CashFlow', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    type: DataTypes.STRING,
    customerId: DataTypes.INTEGER,
    employeeId: DataTypes.INTEGER,
    serviceId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER,
    createdAt: DataTypes.STRING,
    updatedAt: DataTypes.STRING,
    deletedAt: DataTypes.STRING,
  },
  {
    timestamps: false,
    paranoid: true,
    underscored: true,
    freezeTableName: true,
    tableName: 'cashflow'
  });

  return CashFlow;
}