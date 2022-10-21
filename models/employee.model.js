module.exports = (sequelize, Sequelize) => {
    const Employee = sequelize.define("employee", {
      id : {
         type: Sequelize.INTEGER,
         autoIncrement: true,
         primaryKey: true
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      surname: {
        type: Sequelize.STRING,
        allowNull: false
      },
      level: {
        type: Sequelize.STRING,
        allowNull: false
      },
      salary: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      }
    },{
        sequelize,
        tableName: 'employee'
      });
  
    return Employee;
  };