module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    surname: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    phone: DataTypes.INTEGER,
    address: DataTypes.STRING,
    type: DataTypes.STRING,
    cpf: DataTypes.INTEGER,
    photo: DataTypes.STRING,
    indicatedy: DataTypes.STRING,
    createdAt: DataTypes.STRING,
    updatedAt: DataTypes.STRING,
    deletedAt: DataTypes.STRING,
  }, {
    hooks: {
       beforeCreate: function (user, options, fn) {
           user.createdAt = new Date();
           user.updatedAt = new Date();
           fn(null, user);
       },
       beforeUpdate: function (user, options, fn) {
           user.updatedAt = new Date();
           fn(null, user);
       }
   }
});

  return User;
}