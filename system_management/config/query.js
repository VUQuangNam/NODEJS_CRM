const { Client } = require('pg');

const client = new Client({
    connectionString: process.env.DB_SQL,
})
client.connect();
module.exports = client;
