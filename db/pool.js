const { Pool } = require("pg");

const pool = new Pool({
    host: '127.0.0.1',
    port: 5432,
    user: 'postgres',
    password: 'appujan191998',
    database: 'postgres',
    connectionTimeoutMillis: 0,
    idleTimeoutMillis: 0,
    min: 10,
    max: 20,
  });

  module.exports = pool;
