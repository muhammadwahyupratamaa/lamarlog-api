import { execFileSync } from 'node:child_process';
import { sequelize } from '../src/config/database.js';

const testUrl = new URL(process.env.TEST_DATABASE_URL);
if (process.env.TEST_DATABASE_URL === process.env.DATABASE_URL || !testUrl.pathname.endsWith('_test')) throw new Error('TEST_DATABASE_URL must name a dedicated _test database');
const migrate = (command) => execFileSync('node', ['node_modules/sequelize-cli/lib/sequelize', command, '--config', 'sequelize.config.cjs', '--env', 'test', '--migrations-path', 'src/migrations'], { stdio: 'inherit', env: process.env });

beforeAll(() => { migrate('db:migrate:undo:all'); migrate('db:migrate'); });
beforeEach(() => sequelize.truncate({ cascade: true }));
afterAll(() => sequelize.close());
