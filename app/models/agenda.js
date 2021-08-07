module.exports = (sequelize, DataTypes) => {
  const Agenda = sequelize.define('Agenda', {
    id: DataTypes.INTEGER,
    dateBegin: DataTypes.STRING,
    dateEnd: DataTypes.STRING,
    customerId: DataTypes.INTEGER,
    serviceId: DataTypes.INTEGER,
    employeeId: DataTypes.INTEGER,
    createdAt: DataTypes.STRING,
    updatedAt: DataTypes.STRING,
    deletedAt: DataTypes.STRING,
  });

  return Agenda;
}