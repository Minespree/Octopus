/*import mongoose from 'mongoose';
import util from 'util';
import { env, port, mongo, mongooseDebug } from './config/env';
import app from './config/express';

const debug = require('debug')('minespree:index');

// Replace plugin native promise in mongoose
mongoose.Promise = global.Promise;

// Connect to MongoDB
mongoose.connect(mongo, {
  server: {
    socketOptions: {
      keepAlive: 1
    }
  }
});

mongoose.connection.on('error', err => {
  throw new Error('Unable to connect to database:', err);
});

if (mongooseDebug) {
  mongoose.set('debug', (collectionName, method, query, doc) => {
    debug(`${collectionName}.${method}`, util.inspect(query, false, 20), doc);
  });
}

app.listen(port, () => {
  debug(`Server started on *:${port} (${env})`);
});

export default app;*/
