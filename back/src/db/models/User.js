const sequelize = require('sequelize');

const { DataTypes, Model } = sequelize;


class User extends Model {
  static definition() {
    return [
      {
        id: {
          type: DataTypes.INTEGER(),
          primaryKey: true,
          autoIncrement: true
        },
        email: {
          type: DataTypes.STRING(100),
          allowNull: false,
          unique: true,
          validate: {
            isEmail: true
          }
        },
        password: {
          type: DataTypes.STRING(64),
          allowNull: false,
          validate: {
            notEmpty: true
          }
        },
        // date
        createdAt: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: sequelize.fn('NOW')
        },
        updatedAt: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: sequelize.fn('NOW')
        }
      },
      {
        tableName: 'users',
        timestamps: true
      }
    ];
  }

  static associate(models) {
    User.hasMany(models.Contact, { as: 'Contacts', foreignKey: 'userId', onDelete: 'cascade' });
  }
}

module.exports = User;
