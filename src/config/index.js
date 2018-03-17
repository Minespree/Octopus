import path from 'path';

const environment = process.env.NODE_ENV || 'production';
const config = require(`./${environment}`);

export default config;
