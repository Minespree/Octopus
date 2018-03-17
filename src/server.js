import fs from 'fs';
import http from 'http';
import https from 'https';

import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import { errors } from 'celebrate';

import { createMorganLogger } from './util/logger';
import { port, https, bodyLimit } from './config';
import router from './routes';

import authMiddleware from './middleware/auth';
import errorMiddleware from './middleware/error';
import headersMiddleware from './middleware/headers';

const app = express();
const server = createServer();

const createServer = () => {
  if (!https) {
    return http.createServer(app);
  }

  return https.createServer(
    {
      key: fs.readFileSync(https.privateKey),
      cert: fs.readFileSync(https.certificate)
    },
    app
  );
};

export const initialize = () => {
  app.use(
    bodyParser.json({
      limit: bodyLimit
    })
  );

  // Log requests
  const logger = createMorganLogger();
  app.use(logger);

  app.use(headersMiddleware);
  app.use(authMiddleware);
  app.use('/', router);

  // Handle validation errors
  app.use(errors());
  app.use(errorMiddleware);

  server.listen(port);
};

export default app;
