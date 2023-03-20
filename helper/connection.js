const { Client } = require("pg");
const { DB_USER, DB_HOST, DB_DATABASE, DB_PASSWORD, DB_PORT } = process.env;

const db = new Client({
  user: DB_USER,
  // host: "localhost",
  host: DB_HOST,
  // database: "coffee_shop",
  database: DB_DATABASE,
  // password: "admin",
  password: DB_PASSWORD,
  port: DB_PORT,
});

db.connect((err) => {
  if (err) {
    console.log("db connection error", err);
  }
});

module.exports = db;
