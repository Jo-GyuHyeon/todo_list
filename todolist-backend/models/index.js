import Sequelize from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

let env = process.env.NODE_ENV.trim();
if (!env) {
  console.error('NODE_ENV is null.');
  process.exit(1);
}

const config = require(__dirname + '/../config/config.json')[env];
const db = {};

const sequelize = new Sequelize(
  config.database,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: env === 'development' ? '127.0.0.1' : process.env.DB_HOST,
    port: process.env.DB_PORT,
    ...config
  }
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.TODO = require('./todo')(sequelize, Sequelize);

module.exports = db;
