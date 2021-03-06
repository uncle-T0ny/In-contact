const TABLE_NAME = 'contacts';

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
          allowNull: true,
          validate: {
            notEmpty: true
          }
        },
        postcode: {
          type: DataTypes.STRING(30),
          allowNull: true,
          validate: {
            notEmpty: true
          }
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
      })
    );
  },

  down(queryInterface, DataTypes) {
    return queryInterface.dropTable(TABLE_NAME);
  }
};
