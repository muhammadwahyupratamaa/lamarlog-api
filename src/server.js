import app from './app.js';
import { config } from './config/env.js';
import { sequelize } from './config/database.js';

sequelize.authenticate()
  .then(() => app.listen(config.port, () => console.log(`ApplyFlow API listening on ${config.port}`)))
  .catch((error) => { console.error('Database connection failed', error); process.exit(1); });
