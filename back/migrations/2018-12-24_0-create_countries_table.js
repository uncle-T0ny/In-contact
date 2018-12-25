const TABLE_NAME = 'countries';

module.exports = {
  up(queryInterface, DataTypes) {
    const { sequelize } = queryInterface;

    return sequelize.transaction(async () => queryInterface.createTable(TABLE_NAME,
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
        charset: 'utf8'
      }));
  },

  down(queryInterface, DataTypes) {
    return queryInterface.dropTable(TABLE_NAME);
  }
};
