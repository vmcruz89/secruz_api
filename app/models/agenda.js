module.exports = (sequelize, DataTypes) => {
  const Agenda = sequelize.define('Agenda', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    dateBegin: DataTypes.STRING,
    dateEnd: DataTypes.STRING,
    customerId: DataTypes.INTEGER,
    serviceId: DataTypes.INTEGER,
    employeeId: DataTypes.INTEGER,
    createdAt: DataTypes.STRING,
    updatedAt: DataTypes.STRING,
    deletedAt: DataTypes.STRING,
  },
  {
    timestamps: false,
    paranoid: true,
    underscored: true,
    freezeTableName: true,
    tableName: 'agenda'
  });

  return Agenda;
}