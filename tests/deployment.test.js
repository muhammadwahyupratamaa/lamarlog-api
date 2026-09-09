import request from 'supertest';
import { execFileSync, spawnSync } from 'node:child_process';
import { createApp } from '../src/app.js';

const productionOrigin = 'https://applyflow-lemon.vercel.app';
const productionEnv = {
  ...process.env,
  NODE_ENV: 'production',
  DATABASE_URL: 'postgres://user:password@db.example/applyflow',
  JWT_SECRET: 'test-secret',
  CORS_ORIGIN: productionOrigin,
};

const runProductionModule = (source, env = productionEnv) => execFileSync(process.execPath, ['--input-type=module', '--eval', source], { cwd: process.cwd(), env, encoding: 'utf8' });

test('production environment requires the frontend origin and uses DATABASE_URL', () => {
  expect(runProductionModule("import { config } from './src/config/env.js'; console.log(JSON.stringify({ databaseUrl: config.databaseUrl === process.env.DATABASE_URL, corsOrigin: config.corsOrigin }));")).toBe(`${JSON.stringify({ databaseUrl: true, corsOrigin: productionOrigin })}\n`);
  expect(spawnSync(process.execPath, ['--input-type=module', '--eval', "import './src/config/env.js'"], { cwd: process.cwd(), env: { ...productionEnv, CORS_ORIGIN: 'https://example.com' } }).status).not.toBe(0);
});

test('production database configuration uses pg and verified SSL', () => {
  expect(runProductionModule("import pg from 'pg'; import { sequelize } from './src/config/database.js'; console.log(JSON.stringify({ dialectModule: sequelize.options.dialectModule === pg, ssl: sequelize.options.dialectOptions.ssl }));")).toBe('{"dialectModule":true,"ssl":{"require":true,"rejectUnauthorized":true}}\n');
});

test('production CORS allows only the frontend origin', async () => {
  const app = createApp({ corsOrigin: productionOrigin });
  const allowed = await request(app).get('/api/health').set('Origin', productionOrigin);
  const denied = await request(app).get('/api/health').set('Origin', 'https://example.com');
  expect(allowed.headers['access-control-allow-origin']).toBe(productionOrigin);
  expect(denied.headers['access-control-allow-origin']).toBeUndefined();
});

test('Vercel entrypoint imports without opening a listener', async () => {
  const entrypoint = await import('../src/index.js');
  expect(entrypoint.default).toBeInstanceOf(Function);
  expect(process._getActiveHandles().filter((handle) => handle.constructor?.name === 'Server')).toHaveLength(0);
});

test('startup logging reports a missing production variable without exposing values', () => {
  const result = spawnSync(process.execPath, ['--input-type=module', '--eval', "import './src/index.js'"], {
    cwd: process.cwd(),
    env: { ...productionEnv, DATABASE_URL: '' },
    encoding: 'utf8',
  });
  expect(result.status).not.toBe(0);
  expect(result.stderr).toContain('ApplyFlow startup failed');
  expect(result.stderr).toContain('DATABASE_URL is required');
  expect(result.stderr).not.toContain(productionEnv.JWT_SECRET);
});
