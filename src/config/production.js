export default {
  env: 'development',
  sessionSecret: 'SECRET_GOES_HERE',
  mongodb: 'mongodb://localhost:27017/dev',
  port: 8000,
  debug: false,
  https: {
    key: 'data/server.key',
    cert: 'data/server.crt'
  }
};
