module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
      id : {
         type: Sequelize.INTEGER,
         autoIncrement: true,
         primaryKey: true
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      }
    },{
        sequelize,
        tableName: 'user'
      });
  
    return User;
  };