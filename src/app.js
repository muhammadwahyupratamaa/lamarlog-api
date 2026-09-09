import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import { config } from './config/env.js';
import { errorHandler, notFound } from './middlewares/error.js';
import routes from './routes/index.js';

export function createApp(appConfig = config) {
  const app = express();
  const allowedOrigins = Array.isArray(appConfig.corsOrigin) ? appConfig.corsOrigin : [appConfig.corsOrigin];
  app.use(helmet());
  app.use(cors({ origin: (origin, callback) => callback(null, !origin || allowedOrigins.includes(origin)) }));
  app.use(express.json());
  app.use('/api', routes);
  app.use(notFound);
  app.use(errorHandler);
  return app;
}

const app = createApp();

export default app;
