import 'dotenv/config';

const required = ['DATABASE_URL', 'JWT_SECRET'];

export function env(name) {
  const value = process.env[name];
  if (!value && required.includes(name)) throw new Error(`${name} is required`);
  return value;
}

const isProduction = process.env.NODE_ENV === 'production';

function corsOrigin(value) {
  if (!value) {
    if (isProduction) throw new Error('CORS_ORIGIN is required in production');
    return 'http://localhost:5173';
  }
  if (value === '*') throw new Error('CORS_ORIGIN must not be a wildcard');
  let url;
  try { url = new URL(value); } catch { throw new Error('CORS_ORIGIN must be a valid URL'); }
  if (isProduction && url.protocol !== 'https:') throw new Error('CORS_ORIGIN must use HTTPS in production');
  if (isProduction && url.hostname === 'localhost') throw new Error('CORS_ORIGIN must not use localhost in production');
  return url.origin;
}

export const config = {
  port: Number(process.env.PORT || 3000),
  databaseUrl: process.env.NODE_ENV === 'test' ? process.env.TEST_DATABASE_URL || process.env.DATABASE_URL : env('DATABASE_URL'),
  jwtSecret: env('JWT_SECRET'),
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '1d',
  corsOrigin: corsOrigin(process.env.CORS_ORIGIN),
  isProduction,
};
