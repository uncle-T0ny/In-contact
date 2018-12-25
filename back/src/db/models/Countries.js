const sequelize = require('sequelize');
const countryCodes2Name = require('../../../resources/countryCodes2Name.js');

const { DataTypes, Model } = sequelize;


class Countries extends Model {
  static definition() {
    return [
      {
        code: {
          type: DataTypes.CHAR(3),
          primaryKey: true,
          allowNull: false,
          unique: true
        },
        name: {
          type: DataTypes.STRING(60),
          allowNull: false,
          unique: true
        }
      },
      {
        tableName: 'countries'
      }
    ];
  }
}

module.exports = Countries;
