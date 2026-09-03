import { Sequelize } from 'sequelize';
import { config } from './env.js';

export const sequelize = new Sequelize(config.databaseUrl, {
  dialect: 'postgres',
  logging: process.env.NODE_ENV === 'development' ? console.log : false,
});
