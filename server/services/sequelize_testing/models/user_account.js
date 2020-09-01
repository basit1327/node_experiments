/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user_account', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    student_id: {
      type: DataTypes.STRING(15),
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    name: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    created_at: {
      type: DataTypes.STRING(15),
      allowNull: true
    },
    approve_by: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: {
          tableName: 'admin_account',
        },
        key: 'id'
      }
    },
    status: {
      type: DataTypes.INTEGER(1),
      allowNull: true,
      defaultValue: 2,
      comment: '0 mean deleted 1 mean active 2 mean not approvd'
    }
  }, {
    sequelize,
    tableName: 'user_account'
  });
};
