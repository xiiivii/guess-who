import cors from 'cors';
import express, { Express } from 'express';
import { pino } from 'pino';

import { answerRouter } from '@/api/answer/answerRouter';
import { pingRouter } from '@/api/ping/pingRouter';
import errorHandler from '@/common/middleware/errorHandler';
import requestLogger from '@/common/middleware/requestLogger';
import { env } from '@/common/utils/envConfig';

import { html } from './html';

const logger = pino({ name: 'server start' });
const app: Express = express();

// Set the application to trust the reverse proxy
app.set('trust proxy', true);

// Middlewares
app.use(cors({ origin: env.CORS_ORIGIN, credentials: true }));

// Request logging
app.use(requestLogger);

// Api Routes
app.use('/api/ping', pingRouter);
app.use('/api/answers', answerRouter);

// App Route
app.use('/', (_, res) => {
  res.send(html);
});

// Error handlers
app.use(errorHandler());

export { app, logger };
