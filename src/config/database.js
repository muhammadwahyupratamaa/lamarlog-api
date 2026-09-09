import pg from 'pg';
import { Sequelize } from 'sequelize';
import { config } from './env.js';

export const sequelize = new Sequelize(config.databaseUrl, {
  dialect: 'postgres',
  dialectModule: pg,
  logging: process.env.NODE_ENV === 'development' ? console.log : false,
  ...(config.isProduction && { dialectOptions: { ssl: { require: true, rejectUnauthorized: true } } }),
});
