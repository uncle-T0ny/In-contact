const sequelize = require('sequelize');

const { DataTypes, Model } = sequelize;


class Contact extends Model {
  static definition() {
    return [
      {
        id: {
          type: DataTypes.INTEGER(),
          primaryKey: true,
          autoIncrement: true
        },
        userId: {
          type: DataTypes.INTEGER(),
          allowNull: true,
          references: {
            model: 'users',
            key: 'id'
          }
        },
        firstName: {
          type: DataTypes.STRING(50),
          allowNull: true
        },
        lastName: {
          type: DataTypes.STRING(50),
          allowNull: true
        },
        phone: {
          type: DataTypes.STRING(50),
          allowNull: true
        },
        // address
        town: {
          type: DataTypes.STRING(36),
          allowNull: true
        },
        postcode: {
          type: DataTypes.STRING(30),
          allowNull: true
        },
        street: {
          type: DataTypes.STRING(32),
          allowNull: true
        },
        build: {
          type: DataTypes.STRING(30),
          allowNull: true
        },
        apartment: {
          type: DataTypes.STRING(30),
          allowNull: true
        },
        state: {
          type: DataTypes.STRING(40),
          allowNull: true
        },
        country: {
          type: DataTypes.CHAR(3),
          allowNull: true,
          references: {
            model: 'countries',
            key: 'code'
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
        tableName: 'contacts',
        timestamps: true
      }
    ];
  }
}

module.exports = Contact;
