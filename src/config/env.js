import 'dotenv/config';

const required = ['DATABASE_URL', 'JWT_SECRET'];
const productionOrigin = 'https://applyflow-lemon.vercel.app';

export function env(name) {
  const value = process.env[name];
  if (!value && required.includes(name)) throw new Error(`${name} is required`);
  return value;
}

const corsOrigins = process.env.CORS_ORIGIN?.split(',').map((origin) => origin.trim()).filter(Boolean);
const isProduction = process.env.NODE_ENV === 'production';
if (isProduction && corsOrigins?.join(',') !== productionOrigin) throw new Error(`CORS_ORIGIN must be ${productionOrigin} in production`);

export const config = {
  port: Number(process.env.PORT || 3000),
  databaseUrl: process.env.NODE_ENV === 'test' ? process.env.TEST_DATABASE_URL || process.env.DATABASE_URL : env('DATABASE_URL'),
  jwtSecret: env('JWT_SECRET'),
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '1d',
  corsOrigin: isProduction ? productionOrigin : corsOrigins?.length ? corsOrigins : 'http://localhost:5173',
  isProduction,
};
