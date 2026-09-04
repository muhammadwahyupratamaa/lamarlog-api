import 'dotenv/config';

const required = ['DATABASE_URL', 'JWT_SECRET'];

export function env(name) {
  const value = process.env[name];
  if (!value && required.includes(name)) throw new Error(`${name} is required`);
  return value;
}

const corsOrigin = process.env.CORS_ORIGIN?.split(',').map((origin) => origin.trim()).filter(Boolean);
if (process.env.NODE_ENV === 'production' && !corsOrigin?.length) throw new Error('CORS_ORIGIN is required in production');

export const config = {
  port: Number(process.env.PORT || 3000),
  databaseUrl: process.env.NODE_ENV === 'test' ? process.env.TEST_DATABASE_URL || process.env.DATABASE_URL : env('DATABASE_URL'),
  jwtSecret: env('JWT_SECRET'),
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
  corsOrigin: corsOrigin?.length ? corsOrigin : 'http://localhost:5173',
};
