const knex = require("knex");
require("dotenv").config();
const database = knex({
  client: "pg",
  connection: {
    user: process.env.DB_USER, // e.g. 'my-user'
    password: process.env.DB_PASS, // e.g. 'my-user-password'
    database: process.env.DB_NAME, // e.g. 'my-database'
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
  },
});
export default database;
