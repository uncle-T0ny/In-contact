const _ = require('lodash');
const countries = require('../resources/countryCodes2Name');


const TABLE_NAME = 'countries';

module.exports = {
  up(queryInterface) {
    const countriesToInsert = [];
    for (const [code, name] of _.toPairs(countries)) {
      countriesToInsert.push({
        code,
        name
      });
    }
    return queryInterface.bulkInsert(TABLE_NAME, countriesToInsert);
  },

  down(queryInterface, DataTypes) {
    return queryInterface.bulkDelete(TABLE_NAME, null, {});
  }
};
