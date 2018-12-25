const config = require('config');
const fs = require('fs');
const path = require('path');

const Promise = require('bluebird');
const Sequelize = require('sequelize');

const clsBluebird = require('cls-bluebird');
const clsHooked = require('cls-hooked');

const nsHooked = clsHooked.createNamespace('hooked-transaction-namespace');

clsBluebird(nsHooked, Promise);
Sequelize.useCLS(nsHooked);

const db = new Sequelize({
  host: config.db.host,
  port: config.db.port,
  username: config.db.username,
  password: config.db.password,
  database: config.db.database,
  dialect: config.db.dialect,

  logging: config.db.logging ? (log) => console.log('## Sqlz:', log) : false,

  define: {
    underscored: false,
    timestamps: false,
    paranoid: false,
    freezeTableName: false,
    charset: 'utf8',
    collate: 'utf8_general_ci'
  },

  omitNull: false,
  typeValidation: false
});

db.nsHooked = nsHooked;

// read models
const _db = [];
const models = [];
const dir = path.join(__dirname, 'models');

// read recursively
fs.readdirSync(dir)
  .forEach((file) => {
    const filePath = path.join(dir, file);
    if (fs.lstatSync(filePath).isDirectory()) {
      fs.readdirSync(filePath)
        .forEach((nestedFile) => models.push(path.join(filePath, nestedFile)));
    } else {
      models.push(filePath);
    }
  });

models.filter((file) => (file.includes('.')) && (file !== 'index.js'))
  .forEach((filePath) => {
    let model = require(filePath);

    if (model.prototype instanceof Sequelize.Model) {
      // init class
      const [fields, options] = model.definition();
      options.modelName = model.name;
      options.sequelize = db;

      model.init(fields, options);

      _db[model.name] = model;
    } else {
      // import file
      model = db.import(filePath);
      _db[model.name] = model;
    }
  });

// run associations
Object.keys(_db).forEach((modelName) => {
  if (_db[modelName].hasOwnProperty('associate')) {
    _db[modelName].associate(_db);
  }
});

db.models = _db;

module.exports = db;
