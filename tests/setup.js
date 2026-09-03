import { sequelize } from '../src/config/database.js';

beforeAll(() => sequelize.sync({ force: true }));
beforeEach(() => sequelize.truncate({ cascade: true }));
afterAll(() => sequelize.close());
