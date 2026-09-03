import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import { config } from './config/env.js';
import { errorHandler, notFound } from './middlewares/error.js';
import routes from './routes/index.js';

const app = express();
app.use(helmet());
app.use(cors({ origin: config.corsOrigin }));
app.use(express.json());
app.use('/api', routes);
app.use(notFound);
app.use(errorHandler);

export default app;
