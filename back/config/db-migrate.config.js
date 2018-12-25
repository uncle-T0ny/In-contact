const config = require('config');

module.exports = {
  default: {
    host: config.db.host,
    port: config.db.port,
    username: config.db.username,
    password: config.db.password,
    database: config.db.database,
    dialect: config.db.dialect,
    logging: (config.db.logging) ? log => console.log('## Sqlz:', log) : false
  }
};
