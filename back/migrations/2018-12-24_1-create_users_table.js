const TABLE_NAME = 'users';

module.exports = {
  up(queryInterface, DataTypes) {
    const { sequelize } = queryInterface;

    return sequelize.transaction(async () => queryInterface.createTable(TABLE_NAME, // eslint-disable-line no-unused-vars
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
      })
    );
  },

  down(queryInterface, DataTypes) {
    return queryInterface.dropTable(TABLE_NAME);
  }
};
