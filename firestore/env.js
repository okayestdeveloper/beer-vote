const path = require('path');
const nodeEnv = process.env.NODE_ENV
  ? process.env.NODE_ENV.toLowerCase()
  : 'local';
const envPath = path.join('.', `.env.${nodeEnv}`);
require('dotenv').config({ path: envPath });
